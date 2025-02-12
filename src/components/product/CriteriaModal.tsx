import React from 'react';
import { X } from 'lucide-react';

interface Criterion {
    title: string;
    emoji: string;
    maxScore: number;
    description: string;
    points?: string[];
}

interface CriteriaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CriteriaModal: React.FC<CriteriaModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const criteria: Criterion[] = [
        {
            title: "Prix",
            emoji: "💰",
            maxScore: 10,
            description: "Le prix est un facteur clé dans le cadre de campagnes publicitaires, en particulier sur des plateformes comme Facebook Ads. Voici un barème d'évaluation :",
            points: [
                "Si le produit peut être vendu dans la tranche idéale (25 € – 60 €), attribuez une note de 10.",
                "Si le produit se situe entre 60 € et 90 €, la note est réduite à 5.",
                "Si le prix excède 90 € et que vous débutez, attribuez une note de 0, car ce type de produit peut être plus complexe à vendre."
            ]
        },
        {
            title: "Marge",
            emoji: "💸",
            maxScore: 10,
            description: "La marge brute par produit est un élément décisif :",
            points: [
                "Si la marge excède 20 €, notez 10.",
                "Pour une marge située entre 15 € et 20 €, attribuez 7.",
                "Si la marge est comprise entre 10 € et 15 €, notez 5.",
                "En dessous de 10 €, la note est de 0."
            ]
        },
        {
            title: "Effet Waouh",
            emoji: "😱",
            maxScore: 10,
            description: "Ce critère évalue l'attractivité et l'originalité du produit :",
            points: [
                "Le produit répond-il à un véritable besoin ou résout-il un problème important ?",
                "Est-il innovant et rare sur le marché ?",
                "Les consommateurs ressentiront-ils une urgence à l'achat en raison de ses bénéfices uniques ? Attribuez une note de 0 (produit banal, commun) à 10 (produit innovant, à fort impact)."
            ]
        },
        {
            title: "Problème",
            emoji: "🤔",
            maxScore: 10,
            description: "Ce critère examine dans quelle mesure le produit répond à un problème spécifique. Une solution à un problème clair et impactant augmentera la note."
        },
        {
            title: "Saison",
            emoji: "🍁",
            maxScore: 10,
            description: "Ce critère évalue la pertinence du produit en fonction de la saisonnalité.",
            points: [
                "Si le produit est parfaitement adapté à la saison actuelle ou à venir, attribuez une note de 10.",
                "Si le produit est hors saison ou ne présente qu'un faible lien avec la saisonnalité, notez entre 0 et 5.",
                "Un produit intemporel ou avec une demande constante tout au long de l'année pourrait également mériter une note élevée."
            ]
        },
        {
            title: "Visuels disponibles",
            emoji: "📸",
            maxScore: 5,
            description: "La qualité et la disponibilité des visuels jouent un rôle clé pour des campagnes publicitaires réussies :",
            points: [
                "Si des visuels de haute qualité existent ou peuvent être facilement produits, attribuez une note élevée.",
                "Dans le cas contraire, réduisez la note en conséquence."
            ]
        },
        {
            title: "Vidéos disponibles",
            emoji: "🎥",
            maxScore: 5,
            description: "Les vidéos, qu'elles soient professionnelles ou amateurs, sont souvent nécessaires pour des campagnes publicitaires.",
            points: [
                "Pour des produits simples, les images suffisent, rendant les vidéos moins critiques.",
                "Pour des produits complexes, des vidéos explicatives de qualité sont indispensables. L'absence de telles vidéos réduit la note."
            ]
        },
        {
            title: "Concurrence",
            emoji: "👥",
            maxScore: 10,
            description: "Ce critère examine le niveau de saturation du marché :",
            points: [
                "Un produit déjà très visible sur le marché (forte concurrence) se voit attribuer une note basse.",
                "Un produit rare ou inédit obtient une note élevée."
            ]
        }
    ];

    const totalMaxScore = criteria.reduce((acc, curr) => acc + curr.maxScore, 0);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
            <div className="bg-zinc-900 rounded-xl shadow-2xl w-[90%] max-w-6xl max-h-screen border border-zinc-800 relative p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                            Les critères d'évaluation des produits
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

                {/* Grid Layout */}
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

                    {/* Note finale */}
                    <div className="col-span-4 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                        <div className="space-y-2 text-sm text-zinc-300">
                            <p>
                                Ce tableau constitue un outil d'évaluation initiale des produits avant leur lancement. Il est essentiel de noter qu'aucun produit ne satisfait parfaitement tous les critères. Toutefois, un produit obtenant une note de 0 dans l'un des critères pourrait être considéré comme peu pertinent pour un lancement.
                            </p>
                            <p>
                                De même, un produit qui obtient une note moyenne sur l'ensemble des critères mérite une attention particulière. Dans ce cas, il serait judicieux de consacrer davantage de temps à la recherche de nouveaux produits afin d'identifier des opportunités plus prometteuses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriteriaModal;