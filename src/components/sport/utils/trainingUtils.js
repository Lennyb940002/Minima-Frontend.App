// utils/trainingUtils.js
import { DIFFICULTY_MULTIPLIERS } from '../constants/difficultyMultipliers';
import { MUSCLE_GROUPS, getGroupKey } from '../constants/muscleGroups';

export const calculateExerciseXP = (exercise) => {
    const groupKey = getGroupKey(exercise.groupe);
    if (!groupKey || !MUSCLE_GROUPS[groupKey]) {
        console.warn(`Groupe musculaire non trouvé: ${exercise.groupe}`);
        return 0;
    }

    const seriesCount = parseInt(exercise.series.split('x')[0]);
    const repsOrDuration = exercise.series.includes('min') 
        ? parseFloat(exercise.series.split('min')[0]) * 60
        : parseInt(exercise.series.split('x')[1]);

    let difficultyMultiplier = DIFFICULTY_MULTIPLIERS.MEDIUM;
    if (exercise.series.includes('min')) {
        difficultyMultiplier = repsOrDuration > 90 ? DIFFICULTY_MULTIPLIERS.HARD : DIFFICULTY_MULTIPLIERS.MEDIUM;
    } else {
        if (repsOrDuration <= 8) difficultyMultiplier = DIFFICULTY_MULTIPLIERS.VERY_HARD;
        else if (repsOrDuration <= 12) difficultyMultiplier = DIFFICULTY_MULTIPLIERS.HARD;
        else if (repsOrDuration <= 15) difficultyMultiplier = DIFFICULTY_MULTIPLIERS.MEDIUM;
        else difficultyMultiplier = DIFFICULTY_MULTIPLIERS.EASY;
    }

    const baseXP = MUSCLE_GROUPS[groupKey].baseXP;
    return Math.round(baseXP * seriesCount * difficultyMultiplier);
};
