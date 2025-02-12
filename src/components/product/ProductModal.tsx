import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product, ProductModalProps } from './types';
import { productApi } from '../../services/productApi';

export function ProductModal({ isOpen, onClose, onSubmit, initialData }: ProductModalProps) {
    const defaultProductData = {
        name: '',
        link: '',
        category: '',
        description: '',
        status: 'draft',
        tags: [],
        price: '',
        margin: '',
        effect: '',
        problem: '',
        images: '',
        videos: '',
        competition: '',
        season: '',
        costPrice: '',
        salePrice: ''
    };

    const [productData, setProductData] = useState<Partial<Product>>(initialData || defaultProductData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setProductData(initialData);
        } else {
            setProductData(defaultProductData);
        }
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!productData.name || !productData.category || !productData.description || productData.costPrice === undefined || productData.salePrice === undefined) {
            setError('Please fill in all required fields.');
            return;
        }

        const totalScore = (Number(productData.price) || 0) + (Number(productData.margin) || 0) + (Number(productData.effect) || 0) +
            (Number(productData.problem) || 0) + (Number(productData.images) || 0) + (Number(productData.videos) || 0) +
            (Number(productData.competition) || 0) + (Number(productData.season) || 0);

        const newProduct = { ...productData, totalScore, tags: productData.tags || [] };
        delete newProduct._id; // Remove _id if present

        console.log('Submitting product:', newProduct);

        try {
            if (initialData?._id) {
                const updatedProduct = await productApi.updateProduct(initialData._id.toString(), newProduct);
                onSubmit(updatedProduct);
            } else {
                const createdProduct = await productApi.createProduct(newProduct);
                onSubmit(createdProduct);
            }
            onClose();
        } catch (error) {
            console.error('Error submitting product:', error);
            setError('An error occurred while submitting the product.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-black rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-white">
                        {initialData ? 'Modifier le produit' : 'Créer un produit'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom du produit"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.name || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lien"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.link || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, link: e.target.value }))}
                        required
                    />
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.category || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, category: e.target.value }))}
                        required
                    >
                        <option className="text-black" value="">Toutes les catégories</option>
                        <option className="text-black" value="tech">Technologie</option>
                        <option className="text-black" value="fashion">Mode</option>
                        <option className="text-black" value="home">Maison</option>
                        <option className="text-black" value="beauty">Beauté et bien-être</option>
                        <option className="text-black" value="food">Nourriture et boissons</option>
                        <option className="text-black" value="sports">Sports et loisirs</option>
                        <option className="text-black" value="entertainment">Livres, musique et divertissement</option>
                        <option className="text-black" value="baby">Bébés et enfants</option>
                        <option className="text-black" value="auto">Automobiles et accessoires</option>
                        <option className="text-black" value="pets">Animaux</option>
                        <option className="text-black" value="industry">Industrie et commerce</option>
                    </select>

                    <textarea
                        placeholder="Description"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.description || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Prix 💰 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.price?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, price: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Marge 💸 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.margin?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, margin: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Effet Wow 😱 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.effect?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, effect: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Problème 🤔 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.problem?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, problem: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Visuels disponibles 📸 (/5)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.images?.toString() || ''}
                            max={5}
                            onChange={(e) => setProductData((prev) => ({ ...prev, images: Math.min(Number(e.target.value), 5) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Vidéos disponibles 🎥 (/5)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.videos?.toString() || ''}
                            max={5}
                            onChange={(e) => setProductData((prev) => ({ ...prev, videos: Math.min(Number(e.target.value), 5) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Concurrence 👥 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.competition?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, competition: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Saison 🍁 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.season?.toString() || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, season: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Prix de revient"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.costPrice?.toString() || ''}
                            onChange={(e) => setProductData((prev) => ({ ...prev, costPrice: Number(e.target.value) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Prix de vente"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.salePrice?.toString() || ''}
                            onChange={(e) => setProductData((prev) => ({ ...prev, salePrice: Number(e.target.value) }))}
                            required
                        />
                    </div>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.status || 'draft'}
                        onChange={(e) => setProductData((prev) => ({ ...prev, status: e.target.value as Product['status'] }))}
                        required
                    >
                        <option className='text-black' value="draft">Brouillon</option>
                        <option className='text-black' value="in-progress">En cours</option>
                        <option className='text-black' value="validated">Validé</option>
                        <option className='text-black' value="rejected">Rejeté</option>
                    </select>
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
    );
}