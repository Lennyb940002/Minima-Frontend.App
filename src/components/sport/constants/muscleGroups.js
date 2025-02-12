// constants/muscleGroups.js
export const MUSCLE_GROUPS = {
    SHOULDERS: { baseXP: 15, name: "Épaules" },
    CHEST: { baseXP: 20, name: "Pectoraux" },
    BACK: { baseXP: 20, name: "Dos" },
    ABS: { baseXP: 10, name: "Abdos" },
    QUADS: { baseXP: 25, name: "Quadriceps" },
    HAMS: { baseXP: 20, name: "Isquio" },
    BICEPS: { baseXP: 15, name: "Biceps" },
    TRICEPS: { baseXP: 15, name: "Triceps" },
    FOREARMS: { baseXP: 12, name: "Avant-Bras" }
};

export const getGroupKey = (groupName) => {
    const nameToKey = {
        "Épaules": "SHOULDERS",
        "Pectoraux": "CHEST",
        "Dos": "BACK",
        "Abdos": "ABS",
        "Quadriceps": "QUADS",
        "Isquio": "HAMS",
        "Fessiers": "GLUTES",
        "Biceps": "BICEPS",
        "Triceps": "TRICEPS",
        "Avant-Bras": "FOREARMS"
    };
    return nameToKey[groupName];
};