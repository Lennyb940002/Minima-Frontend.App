import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { Investment } from './investisement';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentTable } from './InvestmentTable';
import { fetchStockDetails } from './api/yahooFinanceService';
import { calculateGains } from './utils/calculations';
import { Alert, AlertDescription } from './ui/alert';

export function InvestmentView() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [newSymbol, setNewSymbol] = useState('');
    const [newInitialPrice, setNewInitialPrice] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const updatePrices = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedInvestments = await Promise.all(
                investments.map(async (investment) => {
                    const stockDetails = await fetchStockDetails(investment.symbol);
                    const gains = stockDetails.currentPrice
                        ? calculateGains(stockDetails.currentPrice, investment.initialPrice, investment.amount)
                        : undefined;

                    return {
                        ...investment,
                        ...stockDetails,
                        gains
                    };
                })
            );
            setInvestments(updatedInvestments);
        } catch (error) {
            setError("Erreur lors de la mise à jour des prix. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const addInvestment = () => {
        if (!newSymbol || !newInitialPrice || !newAmount) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        const newInvestment: Investment = {
            id: Date.now().toString(),
            symbol: newSymbol.toUpperCase(),
            initialPrice: parseFloat(newInitialPrice),
            amount: parseFloat(newAmount),
        };

        setInvestments([...investments, newInvestment]);
        setNewSymbol('');
        setNewInitialPrice('');
        setNewAmount('');
        setError(null);
    };

    const deleteInvestment = (id: string) => {
        setInvestments(investments.filter(inv => inv.id !== id));
    };

    useEffect(() => {
        if (investments.length > 0) {
            updatePrices();
            const interval = setInterval(updatePrices, 60000);
            return () => clearInterval(interval);
        }
    }, [investments.length]);

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Suivi des Investissements</h2>
                    <button
                        className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 flex items-center gap-2 disabled:opacity-50"
                        onClick={updatePrices}
                        disabled={isLoading || investments.length === 0}
                    >
                        <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Mise à jour...' : 'Actualiser les prix'}
                    </button>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <InvestmentForm
                    symbol={newSymbol}
                    initialPrice={newInitialPrice}
                    amount={newAmount}
                    onSymbolChange={setNewSymbol}
                    onInitialPriceChange={setNewInitialPrice}
                    onAmountChange={setNewAmount}
                    onSubmit={addInvestment}
                />

                <InvestmentTable
                    investments={investments}
                    onDelete={deleteInvestment}
                />
            </div>
        </div>
    );
}