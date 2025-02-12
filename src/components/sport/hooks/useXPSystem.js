// hooks/useXPSystem.js
import { useState, useEffect } from 'react';
import { modules } from '../constants/modules';
import { MUSCLE_GROUPS } from '../constants/muscleGroups';
import { calculateXPForNextLevel } from '../utils/xpCalculator';

export const useXPSystem = () => {
    const [muscleStats, setMuscleStats] = useState(() => {
        const savedStats = localStorage.getItem('muscleStats');
        if (savedStats) {
            const parsedStats = JSON.parse(savedStats);
            const defaultStats = modules.reduce((acc, module) => {
                acc[MUSCLE_GROUPS[module.id].name] = {
                    xp: 0,
                    level: 0,
                    totalXP: 0
                };
                return acc;
            }, {});
            return { ...defaultStats, ...parsedStats };
        }
        return modules.reduce((acc, module) => {
            acc[MUSCLE_GROUPS[module.id].name] = {
                xp: 0,
                level: 0,
                totalXP: 0
            };
            return acc;
        }, {});
    });

    useEffect(() => {
        localStorage.setItem('muscleStats', JSON.stringify(muscleStats));
    }, [muscleStats]);

    const gainXP = (groupe, baseXP, secondaryGroups = []) => {
        setMuscleStats((prevStats) => {
            const updatedStats = { ...prevStats };

            // Gain XP for primary group
            const currentStats = updatedStats[groupe];
            if (currentStats) {
                let newXP = currentStats.xp + baseXP * 0.6; // 60% of XP for primary group
                let newLevel = currentStats.level;
                let newTotalXP = currentStats.totalXP + baseXP * 0.6;

                while (newXP >= calculateXPForNextLevel(newLevel)) {
                    newXP -= calculateXPForNextLevel(newLevel);
                    newLevel += 1;
                }

                updatedStats[groupe] = {
                    xp: newXP,
                    level: newLevel,
                    totalXP: newTotalXP
                };
            }

            // Gain XP for secondary groups
            secondaryGroups.forEach((secondaryGroup) => {
                const secondaryStats = updatedStats[secondaryGroup];
                if (secondaryStats) {
                    let newXP = secondaryStats.xp + baseXP * 0.2; // 20% of XP for each secondary group
                    let newLevel = secondaryStats.level;
                    let newTotalXP = secondaryStats.totalXP + baseXP * 0.2;

                    while (newXP >= calculateXPForNextLevel(newLevel)) {
                        newXP -= calculateXPForNextLevel(newLevel);
                        newLevel += 1;
                    }

                    updatedStats[secondaryGroup] = {
                        xp: newXP,
                        level: newLevel,
                        totalXP: newTotalXP
                    };
                }
            });

            return updatedStats;
        });
    };

    const getProgressPercentage = (stats) => {
        if (!stats) return 0;
        const xpNeeded = calculateXPForNextLevel(stats.level);
        return (stats.xp / xpNeeded) * 100;
    };

    return { muscleStats, gainXP, getProgressPercentage };
};