import React from 'react';

interface StatsCardProps {
    label: string;
    value: string;
}

export function StatsCard({ label, value }: StatsCardProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-zinc-400">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );
}