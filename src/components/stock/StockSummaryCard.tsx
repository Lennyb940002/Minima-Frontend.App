import React from 'react';

interface StockSummaryCardProps {
  title: string;
  value: string | number;
}

export function StockSummaryCard({ title, value }: StockSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-white/10">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-black">{title}</h3>
      </div>
      <p className="text-4xl font-bold text-black">{value}</p>
    </div>
  );
}