import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchSymbols } from './api/yahooFinanceService';

interface SymbolSearchProps {
    onSelect: (symbol: string) => void;
}

export function SymbolSearch({ onSelect }: SymbolSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (searchTerm) {
                setIsLoading(true);
                try {
                    const searchResults = await searchSymbols(searchTerm);
                    setResults(searchResults);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                if (activeIndex >= 0 && activeIndex < results.length) {
                    handleSelect(results[activeIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const handleSelect = (result: SearchResult) => {
        onSelect(result.symbol);
        setSearchTerm('');
        setIsOpen(false);
        setActiveIndex(-1);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isLoading ? 'animate-spin text-blue-400' : 'text-white/60'
                    } w-5 h-5`} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Rechercher un symbole..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                        setActiveIndex(-1);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-white/20 focus:outline-none"
                />
            </div>

            {isOpen && searchTerm && (
                <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-3 text-white/60">
                            Recherche en cours...
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-3 text-white/60">
                            Aucun résultat trouvé
                        </div>
                    ) : (
                        results.map((result, index) => (
                            <div
                                key={result.symbol}
                                className={`p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 ${index === activeIndex ? 'bg-white/10' : ''
                                    }`}
                                onClick={() => handleSelect(result)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-white font-medium">{result.symbol}</span>
                                        <p className="text-sm text-white/60">
                                            {result.longname || result.shortname}
                                        </p>
                                    </div>
                                    {result.typeDisp && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                                            {result.typeDisp}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}