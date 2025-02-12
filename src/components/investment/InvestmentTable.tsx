import React from 'react';
import { Investment } from './investisement';
import { formatCurrency, formatPercentage, formatVolume } from './utils/calculations';
import { Trash2 } from 'lucide-react';

interface InvestmentTableProps {
    investments: Investment[];
    onDelete: (id: string) => void;
}

export function InvestmentTable({ investments, onDelete }: InvestmentTableProps) {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalGains = investments.reduce((sum, inv) => sum + (inv.gains || 0), 0);

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-2 text-left">Symbole</th>
                            <th className="py-2 text-right">Prix Initial</th>
                            <th className="py-2 text-right">Prix Actuel</th>
                            <th className="py-2 text-right">Variation 24h</th>
                            <th className="py-2 text-right">Volume</th>
                            <th className="py-2 text-right">Montant Investi</th>
                            <th className="py-2 text-right">Gains</th>
                            <th className="py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment) => (
                            <tr key={investment.id} className="border-b border-white/10">
                                <td className="py-2">
                                    <div>
                                        <div className="font-medium">{investment.symbol}</div>
                                        <div className="text-sm text-white/60">{investment.name}</div>
                                    </div>
                                </td>
                                <td className="py-2 text-right">{formatCurrency(investment.initialPrice)}</td>
                                <td className="py-2 text-right">
                                    {investment.currentPrice ? formatCurrency(investment.currentPrice) : '...'}
                                </td>
                                <td className="py-2 text-right">
                                    {investment.percentageChange ? (
                                        <span className={investment.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                                            {formatPercentage(investment.percentageChange)}
                                        </span>
                                    ) : '...'}
                                </td>
                                <td className="py-2 text-right">
                                    {investment.volume ? formatVolume(investment.volume) : '...'}
                                </td>
                                <td className="py-2 text-right">{formatCurrency(investment.amount)}</td>
                                <td className="py-2 text-right">
                                    {investment.gains ? (
                                        <span className={investment.gains >= 0 ? 'text-green-500' : 'text-red-500'}>
                                            {formatCurrency(investment.gains)}
                                        </span>
                                    ) : '...'}
                                </td>
                                <td className="py-2 text-right">
                                    <button
                                        onClick={() => onDelete(investment.id)}
                                        className="p-2 text-white/60 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-t-2 border-white/20">
                        <tr>
                            <td colSpan={5} className="py-2 font-medium">Total</td>
                            <td className="py-2 text-right font-medium">{formatCurrency(totalInvested)}</td>
                            <td className="py-2 text-right font-medium">
                                <span className={totalGains >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    {formatCurrency(totalGains)}
                                </span>
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}