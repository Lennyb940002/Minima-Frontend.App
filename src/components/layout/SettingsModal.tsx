import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/auth';
import { useAuth } from '../../App';
import ProfileSection from './ProfileSection';
import CompanySection from './CompanySection';
import TechnicalSection from './TechnicalSection';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = React.useState('profile');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    if (!isOpen) return null;

    const handleLogout = () => {
        try {
            authApi.logout();
            setIsAuthenticated(false);
            navigate('/auth', { replace: true });
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-black">Paramètres</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
                <div className="flex h-[calc(90vh-80px)]">
                    <nav className="w-64 border-r p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-black text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100'}`}
                        >
                            Profil Personnel
                        </button>
                        <button
                            onClick={() => setActiveTab('company')}
                            className={`w-full text-black text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'company' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100'}`}
                        >
                            Entreprise
                        </button>
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={`w-full text-black text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'technical' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100'}`}
                        >
                            Technique
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 py-2 px-4 border border-red-500 text-red-500 transition-colors rounded-lg hover:bg-red-500 hover:text-white"
                        >
                            Déconnexion
                        </button>
                    </nav>

                    <div className="flex-1 p-6 overflow-y-auto">
                        {activeTab === 'profile' && <ProfileSection />}
                        {activeTab === 'company' && <CompanySection />}
                        {activeTab === 'technical' && <TechnicalSection />}
                    </div>
                </div>
            </div>
        </div>
    );
}