import React from 'react';
import { PlusCircle } from 'lucide-react';
import { SymbolSearch } from './SymbolSearch';

interface InvestmentFormProps {
    symbol: string;
    initialPrice: string;
    amount: string;
    onSymbolChange: (value: string) => void;
    onInitialPriceChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onSubmit: () => void;
}

export function InvestmentForm({
    symbol,
    initialPrice,
    amount,
    onSymbolChange,
    onInitialPriceChange,
    onAmountChange,
    onSubmit,
}: InvestmentFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
                <SymbolSearch onSelect={onSymbolChange} />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="initialPrice" className="block text-sm text-white/60 mb-1">
                        Prix initial
                    </label>
                    <input
                        id="initialPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={initialPrice}
                        onChange={(e) => onInitialPriceChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        placeholder="0.00"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="amount" className="block text-sm text-white/60 mb-1">
                        Montant investi
                    </label>
                    <input
                        id="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        placeholder="0.00"
                        required
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Ajouter
                    </button>
                </div>
            </div>
        </form>
    );
}