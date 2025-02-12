import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DeclarationTabsProps {
    activeTab: 'monthly' | 'quarterly';
    onTabChange: (tab: 'monthly' | 'quarterly') => void;
}

export function DeclarationTabs({ activeTab, onTabChange }: DeclarationTabsProps) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => onTabChange('monthly')}
                className={`
                    px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
                    ${activeTab === 'monthly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }
                `}
            >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Mensuel</span>
            </button>
            <button
                onClick={() => onTabChange('quarterly')}
                className={`
                    px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
                    ${activeTab === 'quarterly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }
                `}
            >
                <Clock className="w-4 h-4" />
                <span className="font-medium">Trimestriel</span>
            </button>
        </div>
    );
}

export default DeclarationTabs;