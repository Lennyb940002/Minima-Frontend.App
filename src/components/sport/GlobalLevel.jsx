// components/sport/GlobalLevel.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const GlobalLevel = ({ muscleStats }) => {
    // Calculer le niveau global et l'XP total
    const calculateGlobalStats = () => {
        const stats = Object.values(muscleStats);
        if (stats.length === 0) return { level: 0, totalXP: 0, progress: 0 };

        const totalXP = stats.reduce((sum, stat) => sum + (stat.totalXP || 0), 0);
        const avgLevel = stats.reduce((sum, stat) => sum + (stat.level || 0), 0) / stats.length;
        const globalLevel = Math.floor(avgLevel);
        
        // Calculer la progression vers le prochain niveau
        const progressToNext = (avgLevel - globalLevel) * 100;

        return {
            level: globalLevel,
            totalXP,
            progress: progressToNext
        };
    };

    const globalStats = calculateGlobalStats();

    return (
        <div className="bg-white text-white p-6 rounded-lg mb-24">
            <div className="max-w-4xl mx-auto text-center">
            <p className="text-8xl font-bold text-black mb-4">
                            {globalStats.level}
                        </p>
                        <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2 text-center text-black mb-8">Niveau Global</h2>
                    </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 ml-24">
                    
                    
                    <div className="flex-grow mx-4 max-w-2xl w-full ">
                        <div className="mb-2 flex justify-between text-sm text-black ">
                            <span>Progression</span>
                            <span>{Math.round(globalStats.progress)}%</span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-4 ">
                            <div
                                className="bg-black h-4 rounded-full transition-all duration-300"
                                style={{ width: `${globalStats.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm mb-1 text-black">XP Total</p>
                        <p className="text-2xl font-bold text-black">
                            {globalStats.totalXP.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

GlobalLevel.propTypes = {
    muscleStats: PropTypes.object.isRequired
};