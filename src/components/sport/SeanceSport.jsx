import React, { useState } from 'react';
import { modules } from './constants/modules';
import { useXPSystem } from './hooks/useXPSystem';
import { StatCard } from './StatCard';
import { Planning } from './Planning';
import { GlobalLevel } from './GlobalLevel';

const SeanceSport = () => {
    const { muscleStats, gainXP, getProgressPercentage } = useXPSystem();
    const [animateStats, setAnimateStats] = useState(false);
    const [difficulty, setDifficulty] = useState('debutant'); // Par défaut à débutant

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <GlobalLevel muscleStats={muscleStats} animate={animateStats} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-6">
                {modules.map((module) => (
                    <StatCard
                        key={module.id}
                        module={module}
                        stats={muscleStats[module.title]}
                        progressPercentage={getProgressPercentage(muscleStats[module.title])}
                        animate={animateStats}
                    />
                ))}
            </div>

            <div className="flex justify-center mb-6 pt-24">
                <button
                    className={`mx-2 px-4 py-2 rounded-lg ${difficulty === 'debutant' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleDifficultyChange('debutant')}
                >
                    Débutant
                </button>
                <button
                    className={`mx-2 px-4 py-2 rounded-lg ${difficulty === 'intermediaire' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleDifficultyChange('intermediaire')}
                >
                    Intermédiaire
                </button>
                <button
                    className={`mx-2 px-4 py-2 rounded-lg ${difficulty === 'confirme' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleDifficultyChange('confirme')}
                >
                    Confirmé
                </button>
                <button
                    className="mx-2 px-4 py-2 rounded-lg bg-gray-200"
                >
                    Planning Personnel
                </button>
            </div>

            <Planning difficulty={difficulty} gainXP={gainXP} setAnimateStats={setAnimateStats} />
        </div>
    );
};

// Ajout de l'export par défaut
export default SeanceSport;