// types.ts
export interface Declaration {
  id: string;
  status: 'pending' | 'paid' | 'processing';
  date: string;
  amount: number;
  payment: number;
  isPaid: boolean;
  lastModified: string;
  type: string;
  dueDate: string;
  submissionDate?: string;
}