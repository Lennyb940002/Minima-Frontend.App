import React from 'react';
import { SalesView } from '../sales/SalesView';
import { StockView } from '../stock/StockView';
import { AccountingView } from '../accounting/AccountingView';
import { DeclarationView } from '../declaration/DeclarationView';
import { ProductView } from '../product/ProductView';
import MarketingCalendar from '../marketing/MarketingView';

// Importez vos images
import salesWhite from '../../image/Argent-Blanc.png';
import salesBlack from '../../image/Argent-Noir.png';
import stockWhite from '../../image/Box-Blanc.png';
import stockBlack from '../../image/Box-Noir.png';
import accountingWhite from '../../image/Calc-Blanc.png';
import accountingBlack from '../../image/Calc-Noir.png';
import declarationWhite from '../../image/Impots-Blanc.png';
import declarationBlack from '../../image/Impots-Noir.png';
import productWhite from '../../image/Produit-Blanc.png';
import productBlack from '../../image/Produit-Noir.png';
import marketingWhite from '../../image/Mark-Blanc.png';
import marketingBlack from '../../image/Mark-Noir.png';

const modules = [
  {
    id: 'sales',
    iconWhite: salesWhite,
    iconBlack: salesBlack,
    title: 'Vente',
  },
  {
    id: 'stock',
    iconWhite: stockWhite,
    iconBlack: stockBlack,
    title: 'Stock',
  },
  {
    id: 'accounting',
    iconWhite: accountingWhite,
    iconBlack: accountingBlack,
    title: 'Comptabilité',
  },
  {
    id: 'declaration',
    iconWhite: declarationWhite,
    iconBlack: declarationBlack,
    title: 'Déclaration',
  },
  {
    id: 'product',
    iconWhite: productWhite,
    iconBlack: productBlack,
    title: 'Création de produit',
  },
  {
    id: 'marketing',
    iconWhite: marketingWhite,
    iconBlack: marketingBlack,
    title: 'Marketing',
  }
];

export function EcommerceDashboard() {
  const [activeModule, setActiveModule] = React.useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = React.useState<string | null>(null);

  if (activeModule === 'sales') return <SalesView />;
  if (activeModule === 'stock') return <StockView />;
  if (activeModule === 'accounting') return <AccountingView />;
  if (activeModule === 'declaration') return <DeclarationView />;
  if (activeModule === 'product') return <ProductView />;
  if (activeModule === 'marketing') return <MarketingCalendar />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-14">
      {modules.map((module) => (
        <div
          key={module.id}
          onClick={() => setActiveModule(module.id)}
          onMouseEnter={() => setHoveredModule(module.id)}
          onMouseLeave={() => setHoveredModule(null)}
          className="w-full h-[260px] rounded-[25px] border border-white/90 p-6 transition-all hover:bg-white group cursor-pointer flex flex-col items-center"
        >
          <img
            src={hoveredModule === module.id ? module.iconBlack : module.iconWhite}
            alt={`${module.title} icon`}
            className="w-24 h-24 mb-4 mt-8 transition-all"
          />
          <h3 className="text-xl font text-white group-hover:text-black mb-2 text-center">
            {module.title}
          </h3>
        </div>
      ))}
    </div>
  );
}