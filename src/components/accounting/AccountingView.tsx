import React, { useEffect, useState } from 'react';
import { FinancialSummaryCards } from './FinancialSummary';
import { TransactionsTable } from './TransactionsTable';
import FinancialChart from './FinancialChart';
import { Transaction, FinancialSummary } from './types';
import { salesApi } from '../../services/api';
import { stockApi } from '../../services/stockApi';
import { declarationApi } from '../../services/declarationApi';
import { marketingApi } from '../../services/marketingApi';

export function AccountingView() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({ revenue: 0, expenses: 0, profit: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch sales data
  const fetchSalesData = async () => {
    try {
      const salesData = await salesApi.getAllSales();
      const salesTransactions: Transaction[] = salesData.map((sale: any) => ({
        id: sale._id,
        date: sale.date,
        category: 'Sales',
        description: sale.product || 'No Description',
        amount: sale.salePrice * sale.quantity || 0,
        type: 'income' as const,
      }));
      return salesTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des ventes:', error);
      return [];
    }
  };

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      const stockData = await stockApi.getAllStock();
      const stockTransactions: Transaction[] = stockData.map((item: any) => ({
        id: item.id || item._id,
        date: item.createdAt.toISOString().split('T')[0],
        category: 'Stock',
        description: `Achat de stock: ${item.name}`,
        amount: item.unitPrice * item.quantity, // Use unitPrice instead of price
        type: 'expense' as const,
      }));
      return stockTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des stocks:', error);
      return [];
    }
  };

  // Fetch declarations data
  const fetchDeclarationsData = async () => {
    try {
      const declarationsData = await declarationApi.getAllDeclarations();
      const paidDeclarations = declarationsData.filter((declaration: any) => declaration.isPaid);
      const declarationTransactions: Transaction[] = paidDeclarations.map((declaration: any) => {
        const reducedAmount = declaration.amount * 0.123; // Apply 12.3% to the amount
        return {
          id: declaration._id,
          date: declaration.date,
          category: 'Declarations',
          description: 'Charges payées',
          amount: reducedAmount,
          type: 'expense' as const,
        };
      });
      return declarationTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des déclarations:', error);
      return [];
    }
  };

  // Fetch marketing data
  const fetchMarketingData = async () => {
    try {
      const marketingData = await marketingApi.getAllCampaigns();
      const marketingTransactions: Transaction[] = marketingData
        .filter((campaign: any) => campaign.adBudget > 0) // Ensure the adBudget is greater than 0
        .map((campaign: any) => {
          const createdAt = new Date(campaign.createdAt);
          const postDate = campaign.postDate ? new Date(campaign.postDate) : null;
          const date = !isNaN(createdAt.getTime()) ? createdAt.toISOString().split('T')[0] : (postDate ? postDate.toISOString().split('T')[0] : '2025-02-21'); // Use postDate or default date if invalid

          // Capitalize the first letter of the description (platform)
          const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
          const description = campaign.platform ? capitalize(campaign.platform) : 'No Description';

          return {
            id: campaign._id,
            date,
            category: 'Marketing',
            description, // Use capitalized description
            amount: campaign.adBudget || 0,
            type: 'expense' as const,
          };
        });
      return marketingTransactions;
    } catch (error) {
      console.error('Erreur lors de la récupération des campagnes marketing:', error);
      return [];
    }
  };

  // Fetch all data and combine transactions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const salesTransactions = await fetchSalesData();
      const stockTransactions = await fetchStockData();
      const declarationTransactions = await fetchDeclarationsData();
      const marketingTransactions = await fetchMarketingData();

      const allTransactions = [...salesTransactions, ...stockTransactions, ...declarationTransactions, ...marketingTransactions];
      setTransactions(allTransactions);

      const revenue = salesTransactions.reduce((acc, trans) => acc + trans.amount, 0);
      const expenses = [...stockTransactions, ...declarationTransactions, ...marketingTransactions].reduce((acc, trans) => acc + trans.amount, 0);
      const profit = revenue - expenses;

      setSummary({ revenue, expenses, profit });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const chartData = transactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
  }));

  return (
    <div className="p-6 space-y-6">
      <header className='border-b border-white/10'>
        <h1 className="text-2xl font-bold text-white mb-6">Comptabilité</h1>
      </header>
      <FinancialSummaryCards summary={summary} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Transactions</h2>
        <TransactionsTable transactions={transactions} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Évolution du Compte</h2>
        <FinancialChart transactions={chartData} />
      </div>
    </div>
  );
}