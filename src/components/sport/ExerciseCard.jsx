//sport/ExerciseCard
export const ExerciseCard = ({ exercice, style }) => (
<div
    className="bg-white p-4 rounded-lg shadow-lg w-[280px] h-[280px]"// Couleur douce pour le fond
>
    <p className="text-gray-800 text-lg font-bold mb-2">{exercice.nom}</p>
    <div
        style={{
            backgroundColor: style.backgroundColor,
            color: style.color,
        }}
        className="w-max px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
    >
        {style.label}
    </div>
    <p className="text-sm text-gray-600 mt-2">{exercice.series}</p>
</div>
);
