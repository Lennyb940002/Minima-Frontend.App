//utils/xpCalculator.js
export const calculateXPForNextLevel = (currentLevel) => {
    return Math.floor(150 * Math.pow(1.15, currentLevel));
  };