// components/stock/types.ts
export interface StockItem {
  id: string;
  product: string;
  reference: string;
  quantity: number;
  unitPrice: number;
  salePrice: number;
  category: string;
  description?: string;
  threshold: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockAnalytics {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
}

export interface StockFilter {
  searchTerm: string;
  category: string;
  showLowStock: boolean;
}