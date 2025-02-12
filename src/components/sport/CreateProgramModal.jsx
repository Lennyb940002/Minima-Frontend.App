import React, { useState } from 'react';
import { modules, MODULE_TITLE_TO_ID } from './constants/modules';
import { trainingData } from './data/trainingData';

export const CreateProgramModal = ({ onCreateProgram }) => {
    const [currentDay, setCurrentDay] = useState(0);
    const [program, setProgram] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const handleNext = () => {
        if (selectedOption === 'No Training') {
            setProgram([...program, { day: days[currentDay], exercises: [] }]);
        } else {
            const dayProgram = {
                day: days[currentDay],
                exercises: selectedExercises.map(ex => ({
                    ...ex,
                    xp: calculateExerciseXP(ex)
                }))
            };
            setProgram([...program, dayProgram]);
        }

        setCurrentDay(currentDay + 1);
        setSelectedOption('');
        setSelectedMuscleGroups([]);
        setSelectedExercises([]);
    };

    const handleFinish = () => {
        onCreateProgram(program);
    };

    const handleMuscleGroupChange = (group) => {
        setSelectedMuscleGroups(group);
        setSelectedExercises([]);
    };

    const handleExerciseChange = (exercise) => {
        setSelectedExercises(exercise);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Créer un programme personnalisé</h2>
                <div className="mb-4">
                    <p>Jour : {days[currentDay]}</p>
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Sélectionner une option</option>
                        <option value="Upper Body">Haut du corps</option>
                        <option value="Lower Body">Bas du corps</option>
                        <option value="No Training">Pas d'entraînement</option>
                    </select>
                </div>

                {selectedOption === 'Upper Body' && (
                    <div className="mb-4">
                        <p>Sélectionnez les groupes musculaires du haut du corps :</p>
                        {modules.filter(mod => ['Pectoraux', 'Épaules', 'Dos', 'Biceps', 'Triceps'].includes(mod.title)).map(mod => (
                            <label key={mod.id}>
                                <input
                                    type="checkbox"
                                    value={mod.title}
                                    onChange={(e) => handleMuscleGroupChange([...selectedMuscleGroups, e.target.value])}
                                />
                                {mod.title}
                            </label>
                        ))}
                    </div>
                )}

                {selectedOption === 'Lower Body' && (
                    <div className="mb-4">
                        <p>Sélectionnez les groupes musculaires du bas du corps :</p>
                        {modules.filter(mod => ['Quadriceps', 'Isquio', 'Fessiers', 'Mollets'].includes(mod.title)).map(mod => (
                            <label key={mod.id}>
                                <input
                                    type="checkbox"
                                    value={mod.title}
                                    onChange={(e) => handleMuscleGroupChange([...selectedMuscleGroups, e.target.value])}
                                />
                                {mod.title}
                            </label>
                        ))}
                    </div>
                )}

                {selectedMuscleGroups.length > 0 && (
                    <div className="mb-4">
                        <p>Sélectionnez les exercices :</p>
                        {selectedMuscleGroups.map(group => (
                            <div key={group}>
                                <h3>{group}</h3>
                                {trainingData.debutant[0].exercices.filter(ex => ex.groupe === MODULE_TITLE_TO_ID[group]).map(ex => (
                                    <label key={ex.nom}>
                                        <input
                                            type="checkbox"
                                            value={ex.nom}
                                            onChange={(e) => handleExerciseChange([...selectedExercises, ex])}
                                        />
                                        {ex.nom}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end">
                    {currentDay < 6 ? (
                        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Suivant</button>
                    ) : (
                        <button onClick={handleFinish} className="px-4 py-2 bg-green-500 text-white rounded-lg">Terminer</button>
                    )}
                </div>
            </div>
        </div>
    );
};