import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Sale } from './types';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (sale: Omit<Sale, '_id'> | Partial<Omit<Sale, '_id'>>) => void;
    sale?: Sale; // Ajoutez ce champ pour l'édition
}

const initialFormState = {
    product: '',
    quantity: '',
    salePrice: '',
    unitCost: '',
    paymentStatus: 'En attente' as 'En attente' | 'Effectué' | 'Annulé',
};

export function ProductModal({ isOpen, onClose, onSubmit, sale }: ProductModalProps) {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sale) {
            setFormData({
                product: sale.product,
                quantity: sale.quantity.toString(),
                salePrice: sale.salePrice.toString(),
                unitCost: sale.unitCost.toString(),
                paymentStatus: sale.paymentStatus,
            });
        } else {
            setFormData(initialFormState);
        }
    }, [sale]);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'quantity' || name === 'salePrice' || name === 'unitCost') {
            if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const quantity = Number(formData.quantity);
            const salePrice = Number(formData.salePrice);
            const unitCost = Number(formData.unitCost);

            if (!quantity || !salePrice || !unitCost) {
                setError('Veuillez remplir tous les champs numériques');
                return;
            }

            const margin = (salePrice - unitCost) * quantity;

            const newSale = {
                product: formData.product,
                quantity,
                salePrice,
                unitCost,
                paymentStatus: formData.paymentStatus,
                date: sale ? sale.date : new Date().toISOString(),
                margin
            };

            console.log('Submitting sale:', newSale);
            await onSubmit(newSale);
            setFormData(initialFormState);
            onClose();
        } catch (error) {
            console.error('Error submitting sale:', error);
            setError('Erreur lors de la création de la vente');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-black bg-opacity-50 rounded-2xl shadow-2xl p-8 border border-white/10 m-4">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {sale ? 'Modifier Vente' : 'Nouvelle Vente'}
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
                                name="product"
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 pl-4 text-white text-lg"
                                value={formData.product}
                                onChange={handleChange}
                                placeholder="Nom du produit"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-white">Quantité</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    required
                                    min="1"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="1"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-white">Prix de vente</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Coût unitaire</label>
                            <input
                                type="number"
                                name="unitCost"
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                value={formData.unitCost}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Statut du paiement</label>
                            <select
                                name="paymentStatus"
                                className="w-full bg-white/10 border border-white/10 rounded-xl p-4 text-white"
                                value={formData.paymentStatus}
                                onChange={handleChange}
                            >
                                <option className="text-black" value="En attente">En attente</option>
                                <option className="text-black" value="Effectué">Effectué</option>
                                <option className="text-black" value="Annulé">Annulé</option>
                            </select>
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
                            {sale ? 'Modifier la vente' : 'Ajouter la vente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}