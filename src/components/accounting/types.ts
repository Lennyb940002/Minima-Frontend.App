export type TransactionCategory = 'Sales' | 'Stock' | 'Marketing' | 'Declarations';

export interface Transaction {
  id: string;
  date: string; // Use `Date` if you prefer working with Date objects.
  category: TransactionCategory;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface FinancialSummary {
  revenue: number;
  expenses: number;
  profit: number;
}