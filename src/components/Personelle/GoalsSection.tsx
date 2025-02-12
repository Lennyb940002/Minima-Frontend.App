import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import AddGoalForm from './AddGoalForm';

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

interface GoalsSectionProps {
    goals: Goal[];
    addGoal: (goal: Goal) => void;
    handleSubgoalChange: (goalId: string, subgoalId: string, completed: boolean) => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, addGoal, handleSubgoalChange }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="w-6 h-6 text-indigo-600" />
                    Objectifs
                </h2>
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setIsFormOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel objectif
                </button>
            </div>

            <div className="grid gap-6">
                {goals.map(goal => (
                    <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-black">{goal.title}</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                                    {goal.category}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                Échéance: {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                            <div
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${goal.progress}%` }}
                            ></div>
                        </div>

                        <div className="space-y-3">
                            {goal.subgoals.map(subgoal => (
                                <div key={subgoal.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={subgoal.completed}
                                        onChange={(e) => handleSubgoalChange(goal.id, subgoal.id, e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-gray-700">
                                        {subgoal.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && <AddGoalForm onClose={() => setIsFormOpen(false)} onSave={addGoal} />}
        </section>
    );
};

export default GoalsSection;