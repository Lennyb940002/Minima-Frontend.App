import React, { useState } from 'react';

type Habit = {
    id: string;
    title: string;
    frequency: 'daily' | 'weekly';
    streak: number;
    completedDates: string[];
};

interface AddHabitFormProps {
    onClose: () => void;
    onSave: (habit: Habit) => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newHabit: Habit = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            frequency,
            streak: 0,
            completedDates: [],
        };
        onSave(newHabit);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle habitude</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fréquence</label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="daily">Quotidienne</option>
                            <option value="weekly">Hebdomadaire</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHabitForm;