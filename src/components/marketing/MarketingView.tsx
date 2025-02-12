import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { MarketingModal } from './MarketingModal';
import { MarketingCampaignCard } from './MarketingCampaignCard';
import { MarketingFilters } from './MarketingFilters';
import { marketingApi } from '../../services/marketingApi';

export function MarketingView() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [filters, setFilters] = useState({ category: '', status: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [campaignToEdit, setCampaignToEdit] = useState<any | null>(null);
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        setFilteredCampaigns(
            campaigns.filter((campaign) =>
                (!filters.category || campaign.category === filters.category) &&
                (!filters.status || campaign.status === filters.status)
            )
        );
    }, [campaigns, filters]);

    const fetchCampaigns = async () => {
        try {
            const campaignsData = await marketingApi.getAllCampaigns();
            setCampaigns(campaignsData);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    const handleCreateOrUpdate = async (campaign: any) => {
        try {
            if (campaignToEdit) {
                await marketingApi.updateCampaign(campaignToEdit.id, campaign);
            } else {
                await marketingApi.createCampaign(campaign);
            }
            fetchCampaigns();
            setIsModalOpen(false);
            setCampaignToEdit(null);
        } catch (error) {
            console.error('Error creating/updating campaign:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await marketingApi.deleteCampaign(id);
            fetchCampaigns();
        } catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };

    const resetFilters = () => {
        setFilters({ category: '', status: '' });
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Marketing Lab</h1>
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>Faire un Poste</span>
                    </button>
                </div>
            </header>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-4xl mx-auto mt-8">
                <div className="flex items-center gap-4 w-full">
                    <MarketingFilters
                        categories={['Digital', 'Print', 'Social Media']}
                        statuses={['Draft', 'In Progress', 'Validated', 'Rejected']}
                        selectedCategory={filters.category}
                        selectedStatus={filters.status}
                        onCategoryChange={(category) => setFilters((prev) => ({ ...prev, category }))}
                        onStatusChange={(status) => setFilters((prev) => ({ ...prev, status }))}
                    />
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-auto"
                        onClick={resetFilters}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
                {filteredCampaigns.map((campaign) => (
                    <MarketingCampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        onEdit={() => {
                            setCampaignToEdit(campaign);
                            setIsModalOpen(true);
                        }}
                        onDelete={() => handleDelete(campaign.id)}
                    />
                ))}
            </div>

            <MarketingModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCampaignToEdit(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialData={campaignToEdit || undefined}
            />
        </div>
    );
}

export default MarketingView;