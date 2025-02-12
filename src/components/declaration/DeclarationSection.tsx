import React from 'react';
import DeclarationCard from './DeclarationCard';
import { Declaration } from './types';

interface DeclarationSectionProps {
    title: string;
    items: Declaration[];
    onDeclare: (declaration: Declaration) => void;
    onSimulate: (declaration: Declaration) => void;
    period: 'monthly' | 'quarterly';
    taxRate: number;
    showToPay: boolean;
}

export function DeclarationSection({
    title,
    items,
    onDeclare,
    onSimulate,
    period,
    taxRate,
    showToPay
}: DeclarationSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <div className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400">
                    {items.length}
                </div>
            </div>

            <div className="grid gap-6">
                {items.length > 0 ? (
                    items.map((declaration) => (
                        <DeclarationCard
                            key={declaration.id}
                            declaration={declaration}
                            onDeclare={onDeclare}
                            onSimulate={onSimulate}
                            taxRate={taxRate}
                            showToPay={showToPay}
                        />
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-400">Aucune déclaration</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DeclarationSection;