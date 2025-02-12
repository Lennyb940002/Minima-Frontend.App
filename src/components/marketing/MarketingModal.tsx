import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Clock, Hash, FileText, Target, DollarSign, Timer } from 'lucide-react';
import { MarketingModalProps } from './types';

export function MarketingModal({ isOpen, onClose, onSubmit, initialData }: MarketingModalProps) {
    const defaultCampaignData = {
        name: '',
        type: 'reel',
        script: '',
        hashtags: '',
        isAd: false,
        adBudget: 0,
        adDuration: '',
        postDate: '',
        postTime: '',
        platform: 'insta',
        content: '',
        objective: 'sell'
    };

    const [campaignData, setCampaignData] = useState<Partial<typeof defaultCampaignData>>(initialData || defaultCampaignData);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (initialData) {
            setCampaignData(initialData);
        } else {
            setCampaignData(defaultCampaignData);
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!campaignData.name) {
            setError('Veuillez remplir tous les champs requis.');
            return;
        }

        const newCampaign = { ...campaignData };
        if (newCampaign._id) {
            delete newCampaign._id;
        }

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            onSubmit(newCampaign);
            onClose();
        }, 0);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay avec effet de flou */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-black bg-opacity-50 rounded-2xl shadow-2xl p-8 border border-white/10 m-4">
                {/* En-tête */}
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {initialData ? 'Modifier la campagne' : 'Nouvelle campagne'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="group p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5 text-white/60 group-hover:text-white" />
                    </button>
                </div>

                {/* Messages d'état */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <p className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                            {error}
                        </p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">

                    </div>
                )}

                {/* Contenu principal */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Donnez un nom à votre campagne"
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 pl-4 text-white text-lg"
                                value={campaignData.name || ''}
                                onChange={(e) => setCampaignData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Type de contenu</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['reel', 'post', 'campaign'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setCampaignData((prev) => ({ ...prev, type }))}
                                        className={`p-3 rounded-xl border ${campaignData.type === type
                                            ? 'border-white bg-white/20'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                                            } text-white capitalize`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Plateforme</label>
                            <select
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                value={campaignData.platform}
                                onChange={(e) => setCampaignData((prev) => ({ ...prev, platform: e.target.value }))}
                            >
                                <option value="insta">Instagram</option>
                                <option value="tiktok">TikTok</option>
                                <option value="facebook">Facebook</option>
                                <option value="youtube">YouTube</option>
                                <option value="twitter">Twitter</option>
                            </select>
                        </div>
                    </div>

                    {campaignData.type === 'reel' && (
                        <>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <FileText className="w-4 h-4" />
                                    <label className="text-sm font-medium">Script du Reel</label>
                                </div>
                                <textarea
                                    value={campaignData.script}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, script: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    rows={4}
                                    placeholder="Décrivez votre script..."
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <Hash className="w-4 h-4" />
                                    <label className="text-sm font-medium">Hashtags</label>
                                </div>
                                <textarea
                                    value={campaignData.hashtags}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, hashtags: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    rows={2}
                                    placeholder="#votrehashtag"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <Calendar className="w-4 h-4" />
                                        <label className="text-sm font-medium">Date de publication</label>
                                    </div>
                                    <input
                                        type="date"
                                        value={campaignData.postDate}
                                        onChange={(e) => setCampaignData((prev) => ({ ...prev, postDate: e.target.value }))}
                                        className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <Clock className="w-4 h-4" />
                                        <label className="text-sm font-medium">Heure</label>
                                    </div>
                                    <input
                                        type="time"
                                        value={campaignData.postTime}
                                        onChange={(e) => setCampaignData((prev) => ({ ...prev, postTime: e.target.value }))}
                                        className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={campaignData.isAd}
                                        onChange={(e) => setCampaignData((prev) => ({ ...prev, isAd: e.target.checked }))}
                                        className="w-5 h-5 rounded border-white/10"
                                    />
                                    <span className="text-sm font-medium">Promouvoir ce Reel</span>
                                </label>

                                {campaignData.isAd && (
                                    <div className="grid grid-cols-2 gap-4 pl-7">
                                        <div>
                                            <div className="flex items-center gap-2 text-white mb-2">
                                                <DollarSign className="w-4 h-4" />
                                                <label className="text-sm font-medium">Budget</label>
                                            </div>
                                            <input
                                                type="number"
                                                value={campaignData.adBudget}
                                                onChange={(e) => setCampaignData((prev) => ({ ...prev, adBudget: parseInt(e.target.value) }))}
                                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                                placeholder="€"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-white mb-2">
                                                <Timer className="w-4 h-4" />
                                                <label className="text-sm font-medium">Durée</label>
                                            </div>
                                            <select
                                                value={campaignData.adDuration}
                                                onChange={(e) => setCampaignData((prev) => ({ ...prev, adDuration: e.target.value }))}
                                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                            >
                                                <option value="1">1 jour</option>
                                                <option value="3">3 jours</option>
                                                <option value="7">7 jours</option>
                                                <option value="14">14 jours</option>
                                                <option value="30">30 jours</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {campaignData.type === 'post' && (
                        <>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <FileText className="w-4 h-4" />
                                    <label className="text-sm font-medium">Contenu du post</label>
                                </div>
                                <textarea
                                    value={campaignData.content}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, content: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    rows={4}
                                    placeholder="Rédigez votre post..."
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <Hash className="w-4 h-4" />
                                    <label className="text-sm font-medium">Hashtags</label>
                                </div>
                                <textarea
                                    value={campaignData.hashtags}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, hashtags: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    rows={2}
                                    placeholder="#votrehashtag"
                                />
                            </div>
                        </>
                    )}

                    {campaignData.type === 'campaign' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-white mb-2">
                                <Target className="w-4 h-4" />
                                <label className="text-sm font-medium">Objectif de la campagne</label>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'sell', label: 'Vendre' },
                                    { value: 'subscribe', label: 'Abonnés' },
                                    { value: 'conversion', label: 'Conversion' }
                                ].map((obj) => (
                                    <button
                                        key={obj.value}
                                        onClick={() => setCampaignData((prev) => ({ ...prev, objective: obj.value }))}
                                        className={`p-4 rounded-xl border ${campaignData.objective === obj.value
                                            ? 'border-white bg-white/20'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                                            } text-white`}
                                    >
                                        {obj.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <div className="flex space-x-4">
                            <button
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                            <button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                                onClick={handleSubmit}
                            >
                                {initialData ? 'Sauvegarder' : 'Créer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketingModal;