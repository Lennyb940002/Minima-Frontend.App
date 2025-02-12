import { calculateExerciseXP } from '../utils/trainingUtils';

export const trainingData = {
    debutant: [
        {
            jour: "Lundi (Full Body - Séance 1)",
            exercices: [
                { nom: "Squat avec haltères", groupe: "Quadriceps", secondaryGroups: ["Fessiers", "Abdos"], series: "3 x 12" },
                { nom: "Développé couché avec haltères", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "3 x 10" },
                { nom: "Rowing avec haltères (bent-over row)", groupe: "Dos", secondaryGroups: ["Biceps"], series: "3 x 10" },
                { nom: "Soulevé de terre jambes tendues", groupe: "Ischio-jambiers", secondaryGroups: ["Fessiers", "Bas du dos"], series: "3 x 10" },
                { nom: "Planche abdominale", groupe: "Abdos", secondaryGroups: ["Core"], series: "3 x 30 secondes" },
                { nom: "Mountain Climbers (escalade au sol)", groupe: "Abdos", secondaryGroups: ["Épaules", "Cardio"], series: "3 x 20 répétitions (10 par jambe)" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Mercredi (Full Body - Séance 2)",
            exercices: [
                { nom: "Deadlift classique (soulevé de terre)", groupe: "Dos", secondaryGroups: ["Ischio-jambiers", "Fessiers"], series: "3 x 10" },
                { nom: "Pompes classiques", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "3 x 12" },
                { nom: "Tirage horizontal à la machine (ou TRX si disponible)", groupe: "Dos", secondaryGroups: ["Biceps"], series: "3 x 12" },
                { nom: "Fentes avant avec haltères", groupe: "Quadriceps", secondaryGroups: ["Fessiers", "Core"], series: "3 x 10 par jambe" },
                { nom: "Élévations latérales avec haltères", groupe: "Épaules", series: "3 x 12" },
                { nom: "Crunchs classiques", groupe: "Abdos", series: "3 x 20" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Samedi (Cardio Matin)",
            exercices: [
                { nom: "Course à pied modérée", series: "30 minutes à 60-70% de la fréquence cardiaque maximale" },
                { nom: "Vélo ou Rameur", series: "30-45 minutes selon préférence" },
                { nom: "HIIT (facultatif)", series: "10 cycles : 30 secondes d’effort (course rapide ou burpees), 30 secondes de récupération" },
            ]
        }
    ],
    intermediaire: [
        {
            jour: "Lundi (Pecs, Épaules, Triceps)",
            exercices: [
                { nom: "Développé couché à la barre", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "4 x 10" },
                { nom: "Pompes", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "4 x 12" },
                { nom: "Développé militaire avec haltères", groupe: "Épaules", secondaryGroups: ["Triceps"], series: "4 x 10" },
                { nom: "Élévations latérales", groupe: "Épaules", series: "4 x 12" },
                { nom: "Dips assistés", groupe: "Triceps", secondaryGroups: ["Pectoraux"], series: "4 x 8-10" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Mardi (Dos, Biceps, Abdos)",
            exercices: [
                { nom: "Tractions assistées", groupe: "Dos", secondaryGroups: ["Biceps"], series: "4 x 8" },
                { nom: "Tirage horizontal à la machine", groupe: "Dos", secondaryGroups: ["Biceps"], series: "4 x 10" },
                { nom: "Curl avec haltères", groupe: "Biceps", series: "4 x 12" },
                { nom: "Planche abdominale", groupe: "Abdos", secondaryGroups: ["Core"], series: "4 x 30 secondes" },
                { nom: "Crunchs", groupe: "Abdos", series: "4 x 20" },
                { nom: "Russian Twists", groupe: "Abdos obliques", series: "4 x 15 de chaque côté" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Jeudi (Jambes et Fessiers)",
            exercices: [
                { nom: "Squats avec barre", groupe: "Quadriceps", secondaryGroups: ["Fessiers", "Ischio-jambiers"], series: "4 x 10" },
                { nom: "Presse à cuisses", groupe: "Quadriceps", secondaryGroups: ["Fessiers"], series: "4 x 12" },
                { nom: "Fentes avant avec haltères", groupe: "Quadriceps", secondaryGroups: ["Fessiers"], series: "3 x 12 par jambe" },
                { nom: "Leg Curl", groupe: "Ischio-jambiers", series: "4 x 12" },
                { nom: "Mollets debout à la machine", groupe: "Mollets", series: "4 x 15" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Samedi (Cardio Matin)",
            exercices: [
                { nom: "Course à pied modérée ou vélo", series: "30-45 minutes selon préférence" },
            ]
        }
    ],
    confirme: [
        {
            jour: "Lundi (Pectoraux / Épaules / Triceps)",
            exercices: [
                { nom: "Développé couché avec barre", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "4 x 8" },
                { nom: "Développé incliné avec haltères", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "3 x 10" },
                { nom: "Élévations latérales avec haltères", groupe: "Épaules", series: "3 x 12" },
                { nom: "Dips parallèles", groupe: "Triceps", secondaryGroups: ["Pectoraux"], series: "4 x 10" },
                { nom: "Push Press (développé épaules avec élan)", groupe: "Épaules", secondaryGroups: ["Triceps", "Core"], series: "3 x 8" },
                { nom: "Planche abdominale", groupe: "Abdos", secondaryGroups: ["Core"], series: "3 x 40 secondes" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Mardi (Dos / Biceps / Abdos)",
            exercices: [
                { nom: "Tractions (assistées si nécessaire)", groupe: "Dos", secondaryGroups: ["Biceps"], series: "4 x 8" },
                { nom: "Tirage horizontal à la machine", groupe: "Dos", secondaryGroups: ["Biceps"], series: "4 x 10" },
                { nom: "Soulevé de terre classique", groupe: "Bas du dos", secondaryGroups: ["Fessiers", "Ischio-jambiers"], series: "4 x 8" },
                { nom: "Curl biceps avec barre EZ", groupe: "Biceps", series: "3 x 12" },
                { nom: "Russian Twists avec médecine ball", groupe: "Abdos obliques", series: "3 x 15 par côté" },
                { nom: "Crunchs inversés", groupe: "Abdos inférieurs", series: "3 x 12" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Jeudi (Jambes / Fessiers)",
            exercices: [
                { nom: "Squat avec barre", groupe: "Quadriceps", secondaryGroups: ["Fessiers", "Bas du dos"], series: "4 x 8" },
                { nom: "Presse à cuisses inclinée", groupe: "Quadriceps", secondaryGroups: ["Fessiers"], series: "4 x 10" },
                { nom: "Fentes arrière avec haltères", groupe: "Quadriceps", secondaryGroups: ["Fessiers", "Core"], series: "3 x 12 par jambe" },
                { nom: "Leg Curl allongé (machine)", groupe: "Ischio-jambiers", series: "3 x 12" },
                { nom: "Mollets debout (machine ou barre)", groupe: "Mollets", series: "3 x 15" },
                { nom: "Pont fessier au sol avec charge (hip thrust)", groupe: "Fessiers", secondaryGroups: ["Ischio-jambiers"], series: "3 x 12" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Vendredi (Pectoraux / Épaules / Triceps - Variations)",
            exercices: [
                { nom: "Pompes lestées", groupe: "Pectoraux", secondaryGroups: ["Triceps", "Épaules"], series: "4 x 12" },
                { nom: "Développé incliné à la barre", groupe: "Pectoraux", secondaryGroups: ["Épaules", "Triceps"], series: "4 x 8" },
                { nom: "Rowing haltères unilatéral (chaque bras)", groupe: "Dos", secondaryGroups: ["Biceps"], series: "3 x 10" },
                { nom: "Élévations frontales avec haltères", groupe: "Épaules", series: "3 x 12" },
                { nom: "Push-up diamant (mains serrées)", groupe: "Triceps", secondaryGroups: ["Pectoraux"], series: "3 x 10" },
                { nom: "Planche avec bras alternés (taps)", groupe: "Core", secondaryGroups: ["Épaules"], series: "3 x 20 répétitions (10 par bras)" },
            ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
        },
        {
            jour: "Samedi (Cardio - Modéré)",
            exercices: [
                { nom: "Course à pied modérée (extérieur ou tapis)", series: "30 minutes à 60-70% de la fréquence cardiaque maximale" },
                { nom: "HIIT (Entraînement par Intervalles)", series: "5 cycles : 30 secondes d’effort intense (sprint, burpees, vélo), 1 minute de récupération active (marche rapide ou jogging léger)" },
                { nom: "Vélo ou Rameur", series: "30-45 minutes, en alternant 2 minutes rapides et 2 minutes lentes" },
            ]
        }
    ]
};