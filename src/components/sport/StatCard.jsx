import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calculateXPForNextLevel } from './utils/xpCalculator';

export const StatCard = ({ 
    module, 
    stats = { xp: 0, level: 0, totalXP: 0 }, // Paramètre par défaut moderne
    progressPercentage, 
    animate = false  // Paramètre par défaut pour animate
}) => {
    const [displayedProgress, setDisplayedProgress] = useState(0);
    const xpForNextLevel = calculateXPForNextLevel(stats?.level || 0);

    useEffect(() => {
        if (animate) {
            setDisplayedProgress(0);
            const timer = setTimeout(() => {
                setDisplayedProgress(progressPercentage);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setDisplayedProgress(progressPercentage);
        }
    }, [progressPercentage, animate]);

    return (
        <div className="relative flex flex-col items-center justify-center p-6 shadow-md bg-white w-full max-w-[380px] h-[320px] rounded-[25px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
            <img 
                src={module.image} 
                alt={module.title} 
                className="w-[141px] h-[141px] object-contain mb-4"
                onError={(e) => {
                    console.error(`Erreur de chargement d'image pour ${module.title}`);
                    e.target.style.display = 'none';
                }}
            />
            <p className="text-black text-lg font-medium mb-1">{module.title}</p>
            <p className="text-black text-sm font-medium mb-2">
                Niveau {stats.level}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2 overflow-hidden">
                <div
                    className="bg-black h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${displayedProgress}%` }}
                />
            </div>
            <p className="text-xs text-gray-500">
                {stats.xp}/{xpForNextLevel} XP
            </p>
            <p className="text-xs text-gray-500 mt-1">
                Total XP: {stats.totalXP}
            </p>
        </div>
    );
};

StatCard.propTypes = {
    module: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    stats: PropTypes.shape({
        xp: PropTypes.number,
        level: PropTypes.number,
        totalXP: PropTypes.number,
    }),
    progressPercentage: PropTypes.number.isRequired,
    animate: PropTypes.bool,
};

export default StatCard;