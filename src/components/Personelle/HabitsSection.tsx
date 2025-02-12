import React, { useState } from 'react';
import { CheckSquare, Plus, BarChart2, Bell } from 'lucide-react';
import AddHabitForm from './AddHabitForm'; // Assurez-vous que le chemin est correct

type Habit = {
    id: string;
    title: string;
    frequency: 'daily' | 'weekly';
    streak: number;
    completedDates: string[];
};

interface HabitsSectionProps {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    handleHabitCompletion: (habitId: string, completed: boolean) => void;
}

const HabitsSection: React.FC<HabitsSectionProps> = ({ habits, addHabit, handleHabitCompletion }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <CheckSquare className="w-6 h-6 text-indigo-600" />
                    Habitudes
                </h2>
                <div className="flex gap-2">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <BarChart2 className="w-4 h-4 mr-2" />
                        Statistiques
                    </button>
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle habitude
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {habits.map(habit => (
                    <div key={habit.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={habit.completedDates.includes(new Date().toISOString().split('T')[0])}
                                    onChange={(e) => handleHabitCompletion(habit.id, e.target.checked)}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">{habit.title}</h3>
                                    <span className="text-sm text-gray-500">
                                        Série actuelle: {habit.streak} jours
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {habit.frequency}
                                </span>
                                <button className="p-2 rounded hover:bg-gray-100">
                                    <Bell className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && <AddHabitForm onClose={() => setIsFormOpen(false)} onSave={addHabit} />}
        </section>
    );
};

export default HabitsSection;