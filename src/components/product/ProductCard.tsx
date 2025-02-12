import React from 'react';
import { Pencil, Trash, Link as LinkIcon } from 'lucide-react';
import { Product } from './types';

const getLogoUrl = (category: string): string => {
    switch (category) {
        case 'tech': return 'https://img.icons8.com/?size=100&id=1581&format=png&color=000000';
        case 'fashion': return 'https://img.icons8.com/?size=100&id=24272&format=png&color=000000';
        case 'home': return 'https://img.icons8.com/?size=100&id=bzlpaAK9FMS2&format=png&color=000000';
        case 'beauty': return 'https://img.icons8.com/?size=100&id=8242&format=png&color=000000';
        case 'food': return 'https://img.icons8.com/?size=100&id=37380&format=png&color=000000';
        case 'sports': return 'https://img.icons8.com/?size=100&id=oRBt2rHxvhPg&format=png&color=000000';
        case 'entertainment': return 'https://img.icons8.com/?size=100&id=48366&format=png&color=000000';
        case 'baby': return 'https://img.icons8.com/?size=100&id=6632&format=png&color=000000';
        case 'auto': return 'https://img.icons8.com/?size=100&id=Atb5mR0Y5hAu&format=png&color=000000';
        case 'pets': return 'https://img.icons8.com/?size=100&id=LzmGON4NYpW4&format=png&color=000000';
        case 'industry': return 'https://img.icons8.com/?size=100&id=EhK5kQGo9qdp&format=png&color=000000';
        default: return '';
    }
};

interface ProductCardProps {
    product: Product;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const productId = product.id ? product.id.toString() : product._id?.toString();

    if (!productId) {
        console.error("Product ID is undefined", product);
        return null;
    }

    const logoUrl = getLogoUrl(product.category);

    const getStatusStyle = (status: string) => {
        const baseStyle = "text-xs font-medium";
        switch (status) {
            case 'validated':
                return `${baseStyle} text-green-600`;
            case 'in-progress':
                return `${baseStyle} text-amber-600`;
            case 'rejected':
                return `${baseStyle} text-red-600`;
            default:
                return `${baseStyle} text-gray-600`;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'validated': return 'Validé';
            case 'in-progress': return 'En cours';
            case 'rejected': return 'Rejeté';
            default: return 'Inconnu';
        }
    };

    return (
        <div className="group bg-white hover:shadow-md transition-shadow duration-200 rounded-lg p-6 relative">
            {/* Logo et Catégorie */}
            <div className="flex items-center gap-3 mb-4">
                {logoUrl && (
                    <img src={logoUrl} alt={product.category} className="h-8 w-8" />
                )}
                <span className="text-sm text-gray-600">{product.category}</span>
            </div>

            {/* Actions (visibles au hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(productId)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(productId)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>

            {/* Contenu principal */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <span className={getStatusStyle(product.status)}>
                    {getStatusText(product.status)}
                </span>
                <a
                    href={product.link}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkIcon className="w-4 h-4" />
                    Voir
                </a>
            </div>
        </div>
    );
};