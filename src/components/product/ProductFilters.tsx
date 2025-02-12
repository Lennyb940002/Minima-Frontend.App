import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductFiltersProps {
    categories: string[];
    statuses: string[];
    selectedCategory: string;
    selectedStatus: string;
    onCategoryChange: (category: string) => void;
    onStatusChange: (status: string) => void;
}

export function ProductFilters({
    categories,
    statuses,
    selectedCategory,
    selectedStatus,
    onCategoryChange,
    onStatusChange,
}: ProductFiltersProps) {
    return (
        <div className="flex gap-4">
            <div className="relative">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-8 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                >
                    <option value="">Toutes Catégories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="relative">
                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-8 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                >
                    <option value="">Tous Statuts</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>
        </div>
    );
}