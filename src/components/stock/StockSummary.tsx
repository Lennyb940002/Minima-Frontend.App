import React from 'react';
import { StockAnalytics, StockItem } from './types';
import { formatCurrency } from './utils/stockUtils';
import { StockSummaryCard } from './StockSummaryCard';

interface StockSummaryProps {
    analytics: StockAnalytics;
    items: StockItem[];
}

export function StockSummary({ analytics, items }: StockSummaryProps) {
    // Calculer la quantité totale de tous les produits
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    // Calculer la valeur totale du stock
    const totalStockValue = items.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);

    // Compter combien de produits sont en seuil critique
    const lowStockCount = items.filter(item => item.quantity <= item.threshold).length;

    // Préparer les éléments de résumé
    const summaryItems = [
        {
            title: 'Produits totaux',
            value: totalQuantity.toString()
        },
        {
            title: 'Valeur du stock',
            value: formatCurrency(totalStockValue)
        },
        {
            title: 'Stock faible',
            value: lowStockCount.toString()
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {summaryItems.map((item, index) => (
                <StockSummaryCard
                    key={index}
                    title={item.title}
                    value={item.value}
                />
            ))}
        </div>
    );
}