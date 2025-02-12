import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { ProductFormData } from './types';

interface MarketingFormProps {
    onSubmit: (data: ProductFormData) => void;
    onCancel: () => void;
}

export function MarketingForm({ onSubmit, onCancel }: MarketingFormProps) {
    const [formData, setFormData] = useState<ProductFormData>({
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
        objective: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Nom
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Type
                </label>
                <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                    required
                >
                    <option value="reel">Reel</option>
                    <option value="post">Post</option>
                    <option value="campaign">Campaign</option>
                </select>
            </div>

            {formData.type === 'reel' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Script
                        </label>
                        <textarea
                            value={formData.script}
                            onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Hashtags
                        </label>
                        <textarea
                            value={formData.hashtags}
                            onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            rows={2}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Publicité
                        </label>
                        <input
                            type="checkbox"
                            checked={formData.isAd}
                            onChange={(e) => setFormData({ ...formData, isAd: e.target.checked })}
                            className="ml-2"
                        />
                    </div>
                    {formData.isAd && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Budget de la publicité
                                </label>
                                <input
                                    type="number"
                                    value={formData.adBudget}
                                    onChange={(e) => setFormData({ ...formData, adBudget: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Durée de la publicité
                                </label>
                                <input
                                    type="text"
                                    value={formData.adDuration}
                                    onChange={(e) => setFormData({ ...formData, adDuration: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Date de publication
                        </label>
                        <input
                            type="date"
                            value={formData.postDate}
                            onChange={(e) => setFormData({ ...formData, postDate: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Heure de publication
                        </label>
                        <input
                            type="time"
                            value={formData.postTime}
                            onChange={(e) => setFormData({ ...formData, postTime: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            required
                        />
                    </div>
                </>
            )}

            {formData.type === 'post' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Contenu du post
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">
                            Hashtags
                        </label>
                        <textarea
                            value={formData.hashtags}
                            onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                            rows={2}
                            required
                        />
                    </div>
                </>
            )}

            {formData.type === 'campaign' && (
                <div>
                    <label className="block text-sm font-medium text-white mb-1">
                        Objectif de la campagne
                    </label>
                    <select
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                        required
                    >
                        <option value="sell">Vendre</option>
                        <option value="subscribe">Abonné</option>
                        <option value="conversion">Conversion</option>
                    </select>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Plateforme
                </label>
                <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                    required
                >
                    <option value="insta">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                </select>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10"
                >
                    <X className="w-4 h-4" />
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90"
                >
                    <Save className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}