export const getPastilleStyle = (groupe) => {
    const styles = {
        "Dos": { backgroundColor: "#A8D5BA", color: "#34623F", label: "Dos" },
        "Épaules": { backgroundColor: "#FAD6A5", color: "#C57B57", label: "Épaules" },
        "Pectoraux": { backgroundColor: "#F8B4C7", color: "#D43D6D", label: "Pectoraux" },
        "Abdos": { backgroundColor: "#B3D7F9", color: "#00509E", label: "Abdos" },
        "Biceps": { backgroundColor: "#FCD5CE", color: "#D1495B", label: "Biceps" },
        "Fessiers": { backgroundColor: "#FBE4A9", color: "#E38D00", label: "Fessiers" },
        "Quadriceps": { backgroundColor: "#C5CAE9", color: "#3F51B5", label: "Quadriceps" },
        "Isquio": { backgroundColor: "#E6B8F5", color: "#7B1FA2", label: "Isquio" },
        "Avant-Bras": { backgroundColor: "#FFDAC1", color: "#D47F00", label: "Avant-Bras" },
    };
    return styles[groupe] || { backgroundColor: "#E0E0E0", color: "#757575", label: "Autre" };
};