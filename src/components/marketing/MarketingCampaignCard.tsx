import React from 'react';
import { Pencil, Trash, Calendar, DollarSign, Clock, Target, Users, Tag, Video, FileText } from 'lucide-react';

interface MarketingCampaignCardProps {
    campaign: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const platformConfig = {
    insta: {
        borderColor: 'border-white/10 hover:border-white/20',
        icon: '📸',
        name: 'Instagram'
    },
    tiktok: {
        borderColor: 'border-white/10 hover:border-white/20',
        icon: '🎵',
        name: 'TikTok'
    },
    facebook: {
        borderColor: 'border-white/10 hover:border-white/20',
        icon: '👥',
        name: 'Facebook'
    },
    youtube: {
        borderColor: 'border-white/10 hover:border-white/20',
        icon: '▶️',
        name: 'YouTube'
    },
    twitter: {
        borderColor: 'border-white/10 hover:border-white/20',
        icon: '🐦',
        name: 'Twitter'
    }
};

const campaignTypeConfig = {
    reel: {
        icon: <Video className="w-4 h-4" />,
        label: 'Reel'
    },
    post: {
        icon: <FileText className="w-4 h-4" />,
        label: 'Post'
    },
    campaign: {
        icon: <Target className="w-4 h-4" />,
        label: 'Campagne'
    }
};

export const MarketingCampaignCard: React.FC<MarketingCampaignCardProps> = ({ campaign, onEdit, onDelete }) => {
    const campaignId = campaign.id?.toString() || campaign._id?.toString();
    if (!campaignId) {
        console.error("Campaign ID is undefined", campaign);
        return null;
    }

    const platform = platformConfig[campaign.platform] || platformConfig.facebook;
    const campaignType = campaignTypeConfig[campaign.type] || campaignTypeConfig.post;

    const formatDate = (date: string) => {
        try {
            return new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
            });
        } catch {
            return date;
        }
    };

    return (
        <div className={`relative rounded-xl bg-black/50 backdrop-blur-sm border ${platform.borderColor} transition-all duration-300`}
            style={{ minHeight: '420px', maxHeight: '500px', width: '100%', maxWidth: '400px' }}>

            {/* Header */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm">
                                <span>{platform.icon}</span>
                                {platform.name}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white/60">
                                {campaignType.icon}
                                {campaignType.label}
                            </span>
                        </div>
                        <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={() => onEdit(campaignId)}
                            className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(campaignId)}
                            className="p-2 text-white/60 hover:text-red-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 space-y-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/80 line-clamp-3">
                        {campaign.type === 'reel' ? campaign.script : campaign.content}
                    </p>
                </div>

                {campaign.hashtags && (
                    <div className="flex gap-2 items-start p-4 bg-white/5 border border-white/10 rounded-lg">
                        <Tag className="w-4 h-4 text-white/40 mt-1" />
                        <p className="text-white/60 line-clamp-2 flex-1">{campaign.hashtags}</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    {campaign.isAd && (
                        <>
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <DollarSign className="w-4 h-4 text-white/40" />
                                <span className="text-white/80">{campaign.adBudget}€</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <Clock className="w-4 h-4 text-white/40" />
                                <span className="text-white/80">{campaign.adDuration}</span>
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span className="text-white/80">{formatDate(campaign.postDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                        <Clock className="w-4 h-4 text-white/40" />
                        <span className="text-white/80">{campaign.postTime}</span>
                    </div>
                    {campaign.type === 'campaign' && (
                        <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg col-span-2">
                            <Users className="w-4 h-4 text-white/40" />
                            <span className="text-white/80">{campaign.objective}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            {campaign.isAd && (
                <div className="px-6 pb-6">
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-lg transition-colors">
                            Terminer
                        </button>
                        <button className="flex-1 py-2 px-4 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg transition-colors">
                            Prolonger
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};