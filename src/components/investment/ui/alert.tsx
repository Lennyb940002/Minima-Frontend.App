// src/components/ui/alert.tsx
import React from 'react';

interface AlertProps {
    variant?: 'default' | 'destructive';
    className?: string;
    children: React.ReactNode;
}

export function Alert({ variant = 'default', className = '', children }: AlertProps) {
    const baseStyles = 'p-4 rounded-lg border';
    const variantStyles = variant === 'destructive'
        ? 'bg-red-500/10 border-red-500/20 text-red-500'
        : 'bg-white/5 border-white/10 text-white';

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`}>
            {children}
        </div>
    );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
    return <div className="text-sm">{children}</div>;
}
