import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { StockItem } from './types';

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (stock: Omit<StockItem, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    initialData?: Partial<StockItem>;
}

const initialFormState = {
    name: '',
    reference: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    unitPrice: 0,
    salePrice: 0,
    threshold: 0,
    price: 0,
    description: '',
    product: '',
    autoGenerateReference: true
};

export function StockModal({ isOpen, onClose, onSubmit, initialData }: StockModalProps) {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialFormState,
                ...initialData,
                autoGenerateReference: !initialData.reference
            });
        } else {
            setFormData(initialFormState);
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reference = formData.autoGenerateReference
            ? `REF-${Date.now().toString().slice(-6)}` // Génère une référence unique
            : formData.reference;

        try {
            // Vérifiez que tous les champs obligatoires sont remplis
            if (!formData.name || !reference || formData.quantity === undefined || formData.unitPrice === undefined || formData.salePrice === undefined || !formData.category || formData.threshold === undefined) {
                setError('Please fill in all required fields.');
                return;
            }

            const stockData = {
                name: formData.name,
                reference,
                category: formData.category,
                quantity: Number(formData.quantity),
                minQuantity: Number(formData.minQuantity),
                unitPrice: parseFloat(formData.unitPrice.toString()), // Assurez-vous que unitPrice est passé ici
                salePrice: parseFloat(formData.salePrice.toString()), // Assurez-vous que salePrice est passé ici
                threshold: Number(formData.threshold), // Assurez-vous que threshold est passé ici
                price: Number(formData.price),
                description: formData.description,
                product: formData.product,
            };

            await onSubmit(stockData);
            setFormData(initialFormState);
            setError(null);
            onClose(); // Fermeture de la modal après succès
        } catch (error) {
            console.error('handleSubmit - Error submitting stock:', error);
            setError('Erreur lors de la soumission du stock. Veuillez vérifier vos informations et réessayer.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-black rounded-2xl shadow-2xl p-8 border border-white/10 m-4">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {initialData ? 'Modifier un Produit' : 'Ajouter un Produit'}
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

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <p className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 pl-4 text-white text-lg"
                                placeholder="Nom du produit"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-white">Quantité</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-white">Prix Unitaire</label>
                                <input
                                    type="number"
                                    name="unitPrice"
                                    value={formData.unitPrice}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-white">Prix de Vente</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-white">Seuil d'Alerte</label>
                                <input
                                    type="number"
                                    name="threshold"
                                    value={formData.threshold}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Catégorie</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                placeholder="Catégorie"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Référence du Produit</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleChange}
                                    disabled={formData.autoGenerateReference}
                                    className={`w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white ${formData.autoGenerateReference ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Référence personnalisée"
                                />
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="autoGenerateReference"
                                        checked={formData.autoGenerateReference}
                                        onChange={handleChange}
                                        className="form-checkbox text-blue-600 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-white text-sm">Générer automatiquement</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                rows={4}
                                placeholder="Description du produit"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                        >
                            {initialData ? 'Sauvegarder les Modifications' : 'Ajouter au Stock'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}