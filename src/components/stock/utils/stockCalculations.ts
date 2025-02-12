//utils/stockCalculation.Ts
import { StockItem } from '../types';

export function calculateTotalValue(items: StockItem[]): number {
  if (!Array.isArray(items) || items.length === 0) return 0;

  return items.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return total + (quantity * unitPrice);
  }, 0);
}

export function getLowStockItems(items: StockItem[]): StockItem[] {
  if (!Array.isArray(items)) return [];

  return items.filter(item => {
    const quantity = Number(item.quantity) || 0;
    const threshold = Number(item.threshold) || 0;
    return quantity <= threshold;
  });
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '0,00 €';

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function calculateProfitMargin(unitPrice: number, salePrice: number): number {
  if (unitPrice <= 0 || salePrice <= 0) return 0;
  return ((salePrice - unitPrice) / unitPrice) * 100;
}

export function calculateStockValue(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}