import { StockItem } from '../components/stock/types';

export function calculateTotalValue(items: StockItem[]): number {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
}

export function getLowStockItems(items: StockItem[]): StockItem[] {
    return items.filter(item => item.quantity <= item.threshold);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(amount);
}