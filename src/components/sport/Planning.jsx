import { useState, useEffect } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { getPastilleStyle } from './utils/styles';
import { trainingData } from './data/trainingData';

export const Planning = ({ gainXP, setAnimateStats, difficulty }) => {
    const [validationCount, setValidationCount] = useState(() => {
        const saved = localStorage.getItem('validationCount');
        return saved ? JSON.parse(saved) : {};
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleValidation = async (jour, exercices) => {
        scrollToTop();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimateStats(true);
        exercices.forEach((exercice) => gainXP(exercice.groupe, exercice.xp, exercice.secondaryGroups));
        setTimeout(() => {
            setAnimateStats(false);
        }, 2000);

        const today = new Date().toISOString().split('T')[0];
        setValidationCount(prev => ({
            ...prev,
            [today]: {
                ...prev[today],
                [jour]: (prev[today]?.[jour] || 0) + 1
            }
        }));
    };

    useEffect(() => {
        localStorage.setItem('validationCount', JSON.stringify(validationCount));
    }, [validationCount]);

    const planning = trainingData[difficulty];

    if (!planning) {
        return <div>Erreur: Niveau de difficulté invalide.</div>;
    }

    const getButtonStyle = (jour) => {
        const today = new Date().toISOString().split('T')[0];
        if (validationCount[today]?.[jour]) {
            return 'bg-green-500';
        }
        return 'bg-black hover:bg-black';
    };

    const getButtonText = (jour) => {
        const today = new Date().toISOString().split('T')[0];
        if (validationCount[today]?.[jour]) {
            return 'Validé';
        }
        return 'Valider la séance';
    };

    return (
        <div className="bg-white p-6 rounded-lg mt-10">
            <h2 className="text-black text-xl font-bold mb-6">Planning d'entraînement ({difficulty})</h2>
            {planning.map((jour, index) => {
                const today = new Date().toISOString().split('T')[0];
                const validations = validationCount[today]?.[jour.jour] || 0;

                return (
                    <div key={index} className="mb-8 p-4 bg-white rounded-xl shadow-xl">
                        <h3 className="bg-white pt-1 pb-1 rounded-xl font-bold text-lg text-black pl-4 mb-4">
                            {jour.jour}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {jour.exercices.map((exercice, idx) => (
                                <ExerciseCard
                                    key={idx}
                                    exercice={exercice}
                                    style={getPastilleStyle(exercice.groupe)}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                onClick={() => handleValidation(jour.jour, jour.exercices)}
                                className={`px-4 py-2 rounded-lg text-white ${getButtonStyle(jour.jour)} transition-all duration-300 hover:scale-105 active:scale-95`}
                            >
                                {getButtonText(jour.jour)}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};