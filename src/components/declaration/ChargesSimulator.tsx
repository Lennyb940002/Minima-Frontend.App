import React, { useState } from 'react';
import { Calculator, Settings, ArrowRight } from 'lucide-react';

interface ChargesSimulatorProps {
    onSimulate: (total: number) => void;
}

interface TaxRegime {
    name: string;
    rate: number;
    period: string;
}

const TAX_REGIMES = [
    {
        period: "Depuis le 1er octobre 2022",
        regimes: [
            { name: "Achat/revente de marchandises (BIC)", rate: 12.3 },
            { name: "Prestations de services commerciales et artisanales (BIC)", rate: 21.2 },
            { name: "Autres prestations de services (BNC)", rate: 21.1 },
            { name: "Professions libérales réglementées relevant de la Cipav (BIC ou BNC)", rate: 21.2 },
            { name: "Location de meublés de tourisme classés", rate: 6.0 }
        ]
    },
    {
        period: "Entre le 1er juillet 2024 et 31 décembre 2024",
        regimes: [
            { name: "Achat/revente de marchandises (BIC)", rate: 12.3 },
            { name: "Prestations de services commerciales et artisanales (BIC)", rate: 21.2 },
            { name: "Autres prestations de services (BNC)", rate: 23.1 },
            { name: "Professions libérales réglementées relevant de la Cipav (BIC ou BNC)", rate: 23.2 },
            { name: "Location de meublés de tourisme classés", rate: 6.0 }
        ]
    },
    {
        period: "Du 1er janvier 2025 au 31 décembre 2025",
        regimes: [
            { name: "Achat/revente de marchandises (BIC)", rate: 12.3 },
            { name: "Prestations de services commerciales et artisanales (BIC)", rate: 21.2 },
            { name: "Autres prestations de services (BNC)", rate: 24.6 },
            { name: "Professions libérales réglementées relevant de la Cipav (BIC ou BNC)", rate: 23.2 },
            { name: "Location de meublés de tourisme classés", rate: 6.0 }
        ]
    },
    {
        period: "A partir du 1er janvier 2026",
        regimes: [
            { name: "Achat/revente de marchandises (BIC)", rate: 12.3 },
            { name: "Prestations de services commerciales et artisanales (BIC)", rate: 21.2 },
            { name: "Autres prestations de services (BNC)", rate: 26.1 },
            { name: "Professions libérales réglementées relevant de la Cipav (BIC ou BNC)", rate: 23.2 },
            { name: "Location de meublés de tourisme classés", rate: 6.0 }
        ]
    }
];

export function ChargesSimulator({ onSimulate }: ChargesSimulatorProps) {
    const [revenue, setRevenue] = useState<number>(300);
    const [isSimulated, setIsSimulated] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [selectedPeriod, setSelectedPeriod] = useState<string>(TAX_REGIMES[0].period);
    const [selectedRegime, setSelectedRegime] = useState<TaxRegime | null>(null);

    const calculateCharges = (amount: number, rate: number): number => {
        return amount * (rate / 100);
    };

    const handleSimulate = () => {
        if (selectedRegime) {
            const total = calculateCharges(revenue, selectedRegime.rate);
            onSimulate(total);
            setIsSimulated(true);
            setShowSettings(false);
        }
    };

    const handleRegimeSelect = (regime: TaxRegime) => {
        setSelectedRegime(regime);
        setShowSettings(false);
    };

    return (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Calculator className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white">Simulateur de Charges</h3>
                </div>
                <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                    <Settings className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Selected Regime Display */}
                {selectedRegime && (
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <p className="text-sm text-gray-400">Régime sélectionné</p>
                        <p className="text-white font-medium mt-1">{selectedRegime.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            <p className="text-blue-400 font-bold">{selectedRegime.rate}%</p>
                        </div>
                    </div>
                )}

                {/* Revenue Input */}
                <div>
                    <label className="block text-sm text-gray-400 mb-2">
                        Chiffre d'affaires
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={revenue}
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            min="0"
                            step="100"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</div>
                    </div>
                </div>

                {/* Simulation Button */}
                <button
                    onClick={handleSimulate}
                    disabled={!selectedRegime}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    Simuler les charges
                    <ArrowRight className="w-4 h-4" />
                </button>

                {/* Results */}
                {isSimulated && selectedRegime && (
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Charges ({selectedRegime.rate}%)</span>
                            <span className="text-white font-medium text-lg">
                                {calculateCharges(revenue, selectedRegime.rate).toFixed(2)} €
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900 rounded-xl max-w-2xl w-full border border-white/10">
                        <div className="p-6">
                            <h4 className="text-xl font-semibold mb-6 text-white">
                                Sélectionnez votre régime fiscal
                            </h4>

                            {/* Period Selection */}
                            <div className="mb-6">
                                <label className="text-sm text-gray-400 mb-2 block">
                                    Période d'activité
                                </label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                                >
                                    {TAX_REGIMES.map(period => (
                                        <option key={period.period} value={period.period}>
                                            {period.period}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Regime Selection */}
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                {TAX_REGIMES.find(p => p.period === selectedPeriod)?.regimes.map((regime) => (
                                    <button
                                        key={regime.name}
                                        onClick={() => handleRegimeSelect({ ...regime, period: selectedPeriod })}
                                        className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-left text-white">{regime.name}</span>
                                            <span className="font-semibold text-blue-400 ml-4">
                                                {regime.rate}%
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-white/10 p-4 flex justify-end">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-6 py-2.5 text-sm font-medium bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}