import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { formatCurrency, formatPeriodLabel } from './utils';
import { Declaration } from './types';

interface DeclarationCardProps {
    declaration: Declaration;
    onDeclare?: (d: Declaration) => void;
    onSimulate?: (d: Declaration) => void;
    taxRate: number;
    fiscalRegime: string; // Ajout du régime fiscal en prop
}

const DeclarationCard = ({
    declaration,
    onDeclare,
    onSimulate,
    taxRate,
    fiscalRegime
}: DeclarationCardProps) => {
    const isDeclared = declaration.decStatus === 2 || declaration.isPaid;
    const formatTitle = (date: string) => {
        const period = formatPeriodLabel(date, 'monthly');
        return period.charAt(0).toUpperCase() + period.slice(1);
    };

    return (
        <div
            className={`
                w-94 h-[510px] 
                rounded-2xl 
                p-8 
                flex flex-col 
                transition-all duration-300 ease-in-out
                ${isDeclared
                    ? 'bg-white shadow-lg text-black'
                    : 'bg-black border border-white/50 text-white'
                }
            `}
        >
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight">
                    {formatTitle(declaration.date)}
                </h2>
            </div>

            {isDeclared ? (
                <>
                    <div className="flex-grow flex flex-col items-center justify-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-emerald-400 flex items-center justify-center">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <div className="mt-auto space-y-2 text-center">
                        <p className="text-sm text-gray-400">Montant payé</p>
                        <p className="text-lg font-bold">{formatCurrency(declaration.amount * taxRate)}</p>
                        <p className="text-sm text-gray-400">Chiffre d'affaires</p>
                        <p className="text-lg font-medium">{formatCurrency(declaration.payment)}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-grow flex flex-col items-center justify-center text-center">
                        <div className="space-y-2 mb-6">
                            <p className="text-sm text-gray-400">Chiffre d'affaires</p>
                            <p className="text-3xl font-bold text-white">
                                {formatCurrency(declaration.payment)}
                            </p>

                        </div>
                        <div className="space-y-2 mb-6">
                            <p className="text-sm text-gray-400">À payer</p>
                            <p className="text-xl font-semibold text-emerald-400">
                                {formatCurrency(declaration.amount * taxRate)}
                            </p>

                        </div>
                        <p className="text-sm text-gray-300 mb-2">{fiscalRegime}</p>
                        <p className="text-xs text-gray-500 italic">Vous avez 90J pour déclarer</p>
                    </div>

                    <button
                        onClick={() => onDeclare?.(declaration)}
                        className="
                            w-full py-4 mt-auto
                            bg-white text-black
                            rounded-xl 
                            font-medium
                            flex items-center justify-center gap-2
                            transition-all duration-200
                            hover:bg-gray-100
                            active:scale-98
                        "
                    >
                        Déclarer
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </>
            )}
        </div>
    );
};

export default DeclarationCard;
