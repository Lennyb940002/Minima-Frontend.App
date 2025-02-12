import React, { useState } from 'react';
import { Trash2, AlertCircle, PackageOpen } from 'lucide-react';
import { StockItem as LowStockItem } from './types';

interface LowStockPanelProps {
    items: LowStockItem[];
    onDelete: (reference: string) => Promise<void>;
}

export function LowStockPanel({ items, onDelete }: LowStockPanelProps) {
    const [deletingRefs, setDeletingRefs] = useState<string[]>([]);

    const handleDelete = async (reference: string) => {
        try {
            setDeletingRefs(prev => [...prev, reference]);
            await onDelete(reference);
        } catch (error) {
            console.error('Failed to delete item:', error);
        } finally {
            setDeletingRefs(prev => prev.filter(ref => ref !== reference));
        }
    };

    return (
        <div className="bg-red-600/15 border border-red-600 rounded-xl p-6">
            <div className="pb-3 border-b border-white/10">
                <div className="flex items-center text-xl font-bold text-white">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Stocks Critiques
                    <span className="ml-2 px-2 py-1 bg-red-600 rounded-full text-sm">
                        {items.length}
                    </span>
                </div>
            </div>
            <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {items.length === 0 ? (
                    <div className="flex items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                        <PackageOpen className="h-4 w-4" />
                        <p>Aucun stock critique à afficher</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.reference}
                            className="group flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <div>
                                <p className="text-white font-medium flex items-center">
                                    {item.product}
                                </p>
                                <div className="text-gray-400 text-sm space-x-2">
                                    <span>Ref: {item.reference}</span>
                                    <span className="inline-block px-2 py-0.5 bg-red-600/20 rounded">
                                        Stock: {item.quantity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}