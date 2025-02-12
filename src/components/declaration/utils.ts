// Fonction pour formater les montants en monnaie locale (EUR dans ce cas)
export function formatCurrency(amount: number): string {
    // Utilise l'API Intl pour formater le montant en euros
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Fonction pour formater les étiquettes de période (mensuelle ou trimestrielle)
export function formatPeriodLabel(dateString: string, periodType: 'monthly' | 'quarterly'): string {
    // Vérifie si la chaîne de date est valide
    if (!dateString) {
        return '';
    }

    // Convertit la chaîne de date en objet Date
    const date = new Date(dateString);

    // Vérifie si la date est valide
    if (isNaN(date.getTime())) {
        return '';
    }

    // Obtient le mois et l'année de la date
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Formate l'étiquette en fonction du type de période
    if (periodType === 'monthly') {
        return `${month} ${year}`; // Format mensuel
    } else if (periodType === 'quarterly') {
        const quarter = Math.floor((date.getMonth() + 3) / 3); // Calcule le trimestre
        return `T${quarter} ${year}`; // Format trimestriel
    }

    return '';
}