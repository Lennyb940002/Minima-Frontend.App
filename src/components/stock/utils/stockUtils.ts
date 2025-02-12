// utils/stockUtils.ts
import { StockItem, StockFilter } from '../types';

export function formatCurrency(amount: number): string {
    if (isNaN(amount)) return '0,00 €';
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function calculateTotalValue(items: StockItem[]): number {
    if (!items || !Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
}

export function getLowStockItems(items: StockItem[]): StockItem[] {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item.quantity <= item.threshold);
}

export function filterStockItems(items: StockItem[], filter: StockFilter): StockItem[] {
    return items.filter((item) => {
        const matchesSearch =
            item.product.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            item.reference.toLowerCase().includes(filter.searchTerm.toLowerCase());
        const matchesCategory = !filter.category || item.category === filter.category;
        const matchesLowStock = !filter.showLowStock || item.quantity <= item.threshold;

        return matchesSearch && matchesCategory && matchesLowStock;
    });
}
