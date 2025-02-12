import React, { useState } from 'react';
import { Trash2, ChevronUp, ChevronDown, Edit } from 'lucide-react';
import { Sale } from './types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface SalesTableProps {
    sales: Sale[];
    onDelete: (id: string) => void;
    onEdit: (sale: Sale) => void;
}

const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case 'effectué':
            return 'bg-green-500/20 text-green-400';
        case 'en attente':
            return 'bg-yellow-500/20 text-yellow-400';
        case 'annulé':
            return 'bg-red-500/20 text-red-400';
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
};

export function SalesTable({ sales, onDelete, onEdit }: SalesTableProps) {
    const [confirmationId, setConfirmationId] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof Sale | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (field: keyof Sale) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedSales = [...sales].sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return 0;
    });

    const handleDelete = (id: string) => {
        setConfirmationId(id);
    };

    const confirmDelete = () => {
        if (confirmationId) {
            onDelete(confirmationId);
            setConfirmationId(null);
        }
    };

    const cancelDelete = () => {
        setConfirmationId(null);
    };

    const renderSortIcon = (field: keyof Sale) => {
        const isActive = sortField === field;
        return (
            <button
                onClick={() => handleSort(field)}
                className={`
                    ml-1 inline-flex items-center rounded-full p-1
                    ${isActive ? 'text-white' : 'text-white/60'}
                    hover:text-white transition-colors
                `}
            >
                {isActive && sortDirection === 'asc' ? (
                    <ChevronUp className="w-3 h-3" />
                ) : (
                    <ChevronDown className="w-3 h-3" />
                )}
            </button>
        );
    };

    return (
        <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">

                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Produit {renderSortIcon('product')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Quantité {renderSortIcon('quantity')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Prix Unitaire {renderSortIcon('salePrice')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Total
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Marge {renderSortIcon('margin')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Date {renderSortIcon('date')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                État {renderSortIcon('paymentStatus')}
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSales.map((sale, index) => (
                            <tr key={sale._id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                                <td className="px-4 py-3 text-sm text-white/10">{index + 1}</td>
                                <td className="px-4 py-3 text-sm text-white">{sale.product}</td>
                                <td className="px-4 py-3 text-sm text-white text-right">{sale.quantity}</td>
                                <td className="px-4 py-3 text-sm text-white text-right">
                                    {formatCurrency(sale.salePrice)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white text-right font-medium">
                                    {formatCurrency(sale.salePrice * sale.quantity)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white text-right">
                                    {formatCurrency(sale.margin)}
                                </td>
                                <td className="px-4 py-3 text-sm text-white">{formatDate(sale.date)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(sale.paymentStatus)}`}>
                                        {sale.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <button
                                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-150"
                                        onClick={() => onEdit(sale)}
                                    >
                                        <Edit className="w-4 h-4 text-yellow-400" />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-150"
                                        onClick={() => handleDelete(sale._id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmationId && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-sm w-full mx-4 backdrop-blur-xl">
                        <p className="text-base text-zinc-200 mb-8">
                            Êtes-vous sûr de vouloir supprimer cet élément ?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-6 py-2.5 text-sm font-medium bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors duration-150"
                                onClick={cancelDelete}
                            >
                                Annuler
                            </button>
                            <button
                                className="px-6 py-2.5 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-150"
                                onClick={confirmDelete}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}