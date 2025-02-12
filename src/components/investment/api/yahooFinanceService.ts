// src/api/yahooFinanceService.ts
interface SearchResult {
    symbol: string;
    shortname?: string;
    longname?: string;
    typeDisp?: string;
    exchDisp?: string;
}

interface YahooSearchResponse {
    quotes: SearchResult[];
}

interface YahooQuoteResponse {
    chart: {
        result: [{
            meta: {
                regularMarketPrice: number;
                regularMarketChangePercent: number;
                regularMarketChange: number;
            };
            indicators: {
                quote: [{
                    volume: number[];
                }];
            };
        }];
    };
}

export async function searchSymbols(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 1) return [];

    try {
        const response = await fetch(
            `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10&lang=fr`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: YahooSearchResponse = await response.json();
        return data.quotes;
    } catch (error) {
        console.error('Error searching symbols:', error);
        return [];
    }
}

export async function fetchStockDetails(symbol: string): Promise<Partial<Investment>> {
    try {
        const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: YahooQuoteResponse = await response.json();
        const quote = data.chart.result[0];

        return {
            currentPrice: quote.meta.regularMarketPrice,
            dayChange: quote.meta.regularMarketChange,
            percentageChange: quote.meta.regularMarketChangePercent,
            volume: quote.indicators.quote[0].volume[quote.indicators.quote[0].volume.length - 1]
        };
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        throw error;
    }
}