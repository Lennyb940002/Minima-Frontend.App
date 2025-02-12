import React from 'react';
import { X } from 'lucide-react';
import { Criterion, MarketingModalProps } from './types';

// MarketingCriteriaModal Component
export const MarketingCriteriaModal: React.FC<MarketingModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const criteria: Criterion[] = [
        {
            title: "Audience",
            emoji: "👥",
            maxScore: 10,
            description: "Évaluez la pertinence de l'audience cible pour la campagne.",
            points: [
                "Audience bien définie et ciblée : 10 points",
                "Audience générale : 5 points",
                "Audience peu claire : 0 points"
            ]
        },
        {
            title: "Message",
            emoji: "💬",
            maxScore: 10,
            description: "Qualité et clarté du message marketing.",
            points: [
                "Message clair et convaincant : 10 points",
                "Message acceptable : 5 points",
                "Message confus : 0 points"
            ]
        },
        {
            title: "Canaux",
            emoji: "📢",
            maxScore: 10,
            description: "Pertinence et efficacité des canaux de communication choisis.",
            points: [
                "Canaux bien choisis : 10 points",
                "Canaux moyens : 5 points",
                "Canaux inappropriés : 0 points"
            ]
        },
        {
            title: "Budget",
            emoji: "💰",
            maxScore: 10,
            description: "Adéquation du budget alloué à la campagne.",
            points: [
                "Budget bien utilisé : 10 points",
                "Budget moyen : 5 points",
                "Budget mal utilisé : 0 points"
            ]
        },
        {
            title: "Retour sur Investissement",
            emoji: "📈",
            maxScore: 10,
            description: "Évaluation du retour sur investissement (ROI) attendu.",
            points: [
                "ROI élevé : 10 points",
                "ROI moyen : 5 points",
                "ROI faible : 0 points"
            ]
        },
    ];

    const totalMaxScore = criteria.reduce((acc, curr) => acc + curr.maxScore, 0);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
            <div className="bg-zinc-900 rounded-xl shadow-2xl w-[90%] max-w-6xl max-h-screen border border-zinc-800 relative p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                            Les critères d'évaluation des campagnes marketing
                        </h2>
                        <p className="text-zinc-400 text-sm">Score total maximum: {totalMaxScore} points</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4 auto-rows-min">
                    {criteria.map((criterion, index) => (
                        <div
                            key={index}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 backdrop-blur-sm hover:bg-zinc-800/70"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{criterion.emoji}</span>
                                <h3 className="text-lg font-semibold text-white">
                                    {criterion.title}
                                    <span className="text-zinc-400 text-xs ml-1">/{criterion.maxScore}</span>
                                </h3>
                            </div>
                            <p className="text-zinc-400 text-sm mb-2 line-clamp-2">{criterion.description}</p>
                            {criterion.points && (
                                <ul className="text-xs text-zinc-300 space-y-1">
                                    {criterion.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-1">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    <div className="col-span-4 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                        <div className="space-y-2 text-sm text-zinc-300">
                            <p>
                                Ce tableau constitue un outil d'évaluation initiale des campagnes marketing avant leur lancement. Il est essentiel de noter qu'aucune campagne ne satisfait parfaitement tous les critères. Toutefois, une campagne obtenant une note de 0 dans l'un des critères pourrait être considérée comme peu pertinente pour un lancement.
                            </p>
                            <p>
                                De même, une campagne qui obtient une note moyenne sur l'ensemble des critères mérite une attention particulière. Dans ce cas, il serait judicieux de consacrer davantage de temps à l'optimisation afin d'améliorer les chances de succès.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};