import React from 'react';
import { FinancialSummary } from './types';
import { formatCurrency } from '../stock/utils/stockCalculations';

interface FinancialSummaryCardsProps {
  summary: FinancialSummary;
}

export function FinancialSummaryCards({ summary }: FinancialSummaryCardsProps) {
  const cards = [
    {
      title: 'Revenus',
      value: formatCurrency(summary.revenue),
      color: 'text-green-500',
    },
    {
      title: 'Dépenses',
      value: formatCurrency(summary.expenses),
      color: 'text-red-500',
    },
    {
      title: 'Bénéfices',
      value: formatCurrency(summary.profit),
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg p-6 border border-white/10"
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-black">{card.title}</h3>
          </div>
          <p className="text-4xl font-bold text-black">{card.value}</p>
        </div>
      ))}
    </div>
  );
}