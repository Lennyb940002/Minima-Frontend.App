import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { ProductFormData } from './types';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    description: '',
    costPrice: 0,
    salePrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Nom du Produit
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
          Catégorie
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="electronics">Électronique</option>
          <option value="clothing">Vêtements</option>
          <option value="accessories">Accessoires</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Prix de Revient
          </label>
          <input
            type="number"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Prix de Vente
          </label>
          <input
            type="number"
            value={formData.salePrice}
            onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
            required
          />
        </div>
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