import React from 'react';
import { Transaction } from './types';
import { formatCurrency } from '../stock/utils/stockCalculations';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const getColorScheme = (type: 'income' | 'expense', category: string) => {
  switch (category) {
    case 'Sales': return 'bg-green-500/20 text-green-400';
    case 'Stock': return 'bg-blue-500/20 text-blue-400';
    case 'Marketing': return 'bg-purple-500/20 text-purple-400';
    case 'Declarations': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const getTextColor = (type: 'income' | 'expense', category: string) => {
  if (type === 'income') return 'text-green-500';
  switch (category) {
    case 'Stock': return 'text-blue-500';
    case 'Declarations': return 'text-red-500';
    case 'Marketing': return 'text-purple-500';
    default: return 'text-gray-500';
  }
};

const groupByMonth = (transactions: Transaction[]): Transaction[] => {
  const grouped = transactions.reduce((acc, transaction) => {
    if (transaction.category === 'Sales') {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(transaction);
    } else {
      acc[transaction.id] = [transaction];
    }
    return acc;
  }, {} as Record<string, Transaction[]>);

  const result: Transaction[] = [];

  for (const [key, value] of Object.entries(grouped)) {
    if (value[0].category === 'Sales') {
      const totalAmount = value.reduce((sum, transaction) => sum + transaction.amount, 0);
      result.push({
        id: key,
        date: value[0].date,
        category: 'Sales',
        description: `Vente de ${key}`,
        amount: totalAmount,
        type: 'income',
      });
    } else {
      result.push(...value);
    }
  }

  return result;
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const groupedTransactions = groupByMonth(transactions);
  const sortedTransactions = groupedTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.log('Transactions:', transactions);
  console.log('Grouped Transactions:', groupedTransactions);

  return (
    <div className="bg-black rounded-lg border border-white/10 overflow-hidden mx-auto my-4">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Catégorie</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Description</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">Type</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-white/60">Montant</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-white/10">
              <td className="px-4 py-3 text-sm text-white">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-sm text-white">
                <span className={`px-2 py-1 rounded-full text-sm ${getColorScheme(transaction.type, transaction.category)}`}>
                  {transaction.category}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-white">
                <span className={`px-2 py-1 rounded-full text-xs ${(transaction.type, transaction.category)}`}>
                  {transaction.description || 'No Description'}
                </span>
              </td>
              <td
                className={`px-2 py-1 rounded-full text-xs text-white`}
              >
                {transaction.type === 'income' ? 'Rentrée d\'argent' : 'Dépense'}
              </td>
              <td
                className={`px-2 py-1 rounded-full text-xs text-right ${transaction.type === 'income' ? 'text-rgb(28, 230, 28)' : 'text-rgb(241, 18, 2)'}`}
              >
                {transaction.type === 'expense' ? '- ' : '+ '}
                {formatCurrency(transaction.amount || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}