// src/types/investment.ts
export interface Investment {
    id: string;
    symbol: string;
    initialPrice: number;
    amount: number;
    currentPrice?: number;
    gains?: number;
    percentageChange?: number;
    dayChange?: number;
    marketCap?: string;
    volume?: number;
    name?: string;
}