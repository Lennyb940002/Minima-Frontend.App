// Définissez vos types ici

export type Activity = {
    title: string;
    start: string;
    end: string;
    category: 'work' | 'personal' | 'health';
    // Ajoutez d'autres propriétés nécessaires
};

export type Goal = {
    title: string;
    category: 'professional' | 'personal' | 'health' | 'education';
    deadline: string;
    subgoals: { title: string; completed: boolean }[];
    // Ajoutez d'autres propriétés nécessaires
};

export type Habit = {
    title: string;
    frequency: 'daily' | 'weekly';
    // Ajoutez d'autres propriétés nécessaires
};

export type KnowledgeItem = {
    title: string;
    content: string;
    category: 'development' | 'design' | 'business' | 'other';
    tags: string[];
    // Ajoutez d'autres propriétés nécessaires
};