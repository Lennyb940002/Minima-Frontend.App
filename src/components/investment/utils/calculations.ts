export function calculateGains(currentPrice: number, initialPrice: number, amount: number): number {
    const shares = amount / initialPrice;
    return (currentPrice - initialPrice) * shares;
}

export function calculatePercentageGain(currentPrice: number, initialPrice: number): number {
    return ((currentPrice - initialPrice) / initialPrice) * 100;
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatPercentage(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value / 100);
}

export function formatVolume(volume: number): string {
    return new Intl.NumberFormat('fr-FR', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(volume);
}
