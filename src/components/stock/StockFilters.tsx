// types.ts
export interface StockFilter {
    searchTerm: string;
    category: string;
    showLowStock: boolean;
}

// StockFilters.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { StockFilter } from './types';

interface StockFiltersProps {
    filters: StockFilter;
    onFilterChange: (filters: StockFilter) => void;
    categories: string[];
}

export function StockFilters({ filters, onFilterChange, categories }: StockFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                />
            </div>

            <div className="flex gap-4">
                <select
                    value={filters.category}
                    onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                    className="px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                >
                    <option value="">Toutes catégories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() =>
                        onFilterChange({ ...filters, showLowStock: !filters.showLowStock })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.showLowStock
                        ? 'bg-white text-black border-white'
                        : 'border-white/20 text-white hover:border-white'
                        }`}
                >
                    <Filter className="w-5 h-5" />
                    Stocks critiques
                </button>
            </div>
        </div>
    );
}