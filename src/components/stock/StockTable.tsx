import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { StockItem } from './types';
import { formatCurrency } from './utils/stockUtils';

interface StockTableProps {
  items: StockItem[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function StockTable({ items, onUpdate, onDelete }: StockTableProps) {
  const getColorScheme = (quantity: number, threshold: number) => {
    return quantity <= threshold ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400';
  };

  const getTextColor = (quantity: number, threshold: number) => {
    return quantity <= threshold ? 'text-red-500' : 'text-green-500';
  };

  // Function to sort items by product name
  const sortedItems = [...items].sort((a, b) => a.product.localeCompare(b.product));

  return (
    <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Produit</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Référence</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Quantité</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Prix unitaire</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Valeur totale</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Prix de vente</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-white/60">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className="border-b border-white/10">
              <td className="px-4 py-3 text-sm text-white">{item.product}</td>
              <td className="px-4 py-3 text-sm text-white">{item.reference}</td>
              <td className={`px-4 py-3 text-sm text-right ${getTextColor(item.quantity, item.threshold)}`}>{item.quantity}</td>
              <td className="px-4 py-3 text-sm text-right text-white">{formatCurrency(item.unitPrice)}</td>
              <td className="px-4 py-3 text-sm text-right text-white">{formatCurrency(item.quantity * item.unitPrice)}</td>
              <td className="px-4 py-3 text-sm text-right text-white">{formatCurrency(item.salePrice)}</td>
              <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                  onClick={() => onUpdate(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Modifier ce produit"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="Supprimer ce produit"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}