import React, { useState } from 'react';

type Subgoal = {
    id: string;
    title: string;
    completed: boolean;
};

type Goal = {
    id: string;
    title: string;
    category: string;
    deadline: string;
    progress: number;
    subgoals: Subgoal[];
};

interface AddGoalFormProps {
    onClose: () => void;
    onSave: (goal: Goal) => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [subgoals, setSubgoals] = useState<Subgoal[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newGoal: Goal = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            category,
            deadline,
            progress: 0,
            subgoals,
        };
        onSave(newGoal);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel objectif</h2>
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
                        <label className="block text-gray-700">Catégorie</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Échéance</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
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

export default AddGoalForm;