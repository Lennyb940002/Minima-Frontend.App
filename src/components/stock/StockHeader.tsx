// components/stock/StockHeader.tsx
import React from 'react';
import { Plus } from 'lucide-react';

interface StockHeaderProps {
    onAddStock: () => void;
}

export function StockHeader({ onAddStock }: StockHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8 border-b border-white/10 h-20">
            <h1 className="text-2xl font-bold text-white">Gestion des Stocks</h1>
            <button
                onClick={onAddStock}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Ajouter du stock
            </button>
        </div>
    );
}
