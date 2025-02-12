import React from 'react';
import { Period } from './types';

interface SalesOverviewCardProps {
  title: string;
  value: string;
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export function SalesOverviewCard({
  title,
  value,
  period,
  onPeriodChange
}: SalesOverviewCardProps) {
  return (
    <div className="bg-black h-full border border-white/10 rounded-xl p-6">
      <div className="flex flex-col h-full">
        {/* Titre collé en haut */}
        <h3 className="text-sm text-zinc-400 mb-2 align-text-top">{title}</h3>

        {/* Valeur centrée verticalement */}
        <div className="flex-grow flex items-center justify-center">
          <p className="text-4xl font-bold">{value}</p>
        </div>

        {/* Boutons alignés en bas */}
        <div className="flex justify-center gap-2 mt-auto">
          {(['All', 'Jour', 'Semaine', 'Mois'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={`px-3 py-1 rounded-full text-sm ${period === p
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-800 text-zinc-400'
                }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}