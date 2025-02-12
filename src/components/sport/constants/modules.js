// constants/modules.js
import epaule from "../../../image/epaule (1).png";
import salle from "../../../image/salle-de-sport (1).png";
import devant from "../../../image/devant.png";
import dos from "../../../image/dos.png";
import humain from "../../../image/humain.png";
import biceps from "../../../image/biceps (1).png";
import muscles from "../../../image/muscles.png";
import dos2 from "../../../image/dos (2).png";
import Isquio from "../../../image/dos (1).png";

export const modules = [
    { id: "SHOULDERS", image: epaule, title: "Épaules" },
    { id: "CHEST", image: salle, title: "Pectoraux" },
    { id: "BACK", image: dos, title: "Dos" },
    { id: "ABS", image: humain, title: "Abdos" },
    { id: "BICEPS", image: biceps, title: "Biceps" },
    { id: "TRICEPS", image: muscles, title: "Triceps" },
    { id: "QUADS", image: devant, title: "Quadriceps" },
    { id: "HAMS", image: Isquio, title: "Isquio" },
    { id: "FOREARMS", image: dos2, title: "Avant-Bras" }
];


// Ajouter un mappage des IDs vers les titres
export const MODULE_ID_TO_TITLE = modules.reduce((acc, module) => {
    acc[module.id] = module.title;
    return acc;
}, {});

export const MODULE_TITLE_TO_ID = modules.reduce((acc, module) => {
    acc[module.title] = module.id;
    return acc;
}, {});
