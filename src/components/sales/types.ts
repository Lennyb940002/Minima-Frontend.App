// types.ts
export interface Sale {
  _id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  margin: number;
  date: string;
  paymentStatus: 'En attente' | 'Effectué' | 'Annulé';
  decStatus: number;
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalSalesCount: number;
  totalQuantity: number;
  totalMargin: number;
  totalBenefit: number;
  conversionRate: number;
  totalDays: number;
}
