import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import { StockSummary } from './StockSummary';
import { StockModal } from './StockModal';
import { LowStockPanel } from './LowStockPanel';
import { StockHeader } from './StockHeader';
import StockChart from './StockChart';
import { StockFilters } from './StockFilters';
import type { StockItem, StockAnalytics, StockFilter } from './types';
import { stockApi } from '../../services/stockApi';

export function StockView() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [analytics, setAnalytics] = useState<StockAnalytics>({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0
  });
  const [filters, setFilters] = useState<StockFilter>({
    searchTerm: '',
    category: '',
    showLowStock: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockToEdit, setStockToEdit] = useState<StockItem | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [stockData, analyticsData] = await Promise.all([
        stockApi.getAllStock(),
        stockApi.getAnalytics()
      ]);
      setItems(stockData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Erreur dans StockView:', err);
      setError('Une erreur est survenue lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white text-center">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  const filteredItems = items.filter(item =>
    (filters.searchTerm === '' || item.product.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
    (filters.category === '' || item.category === filters.category) &&
    (!filters.showLowStock || item.quantity <= item.threshold)
  );

  // Prepare data for chart
  const chartData = items.map(item => ({
    date: item.createdAt.toISOString().split('T')[0],
    quantity: item.quantity,
  }));

  const handleCreateOrUpdateStock = async (stock: Omit<StockItem, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (stockToEdit) {
        await stockApi.updateStock(stockToEdit.id, {
          ...stock,
          updatedAt: new Date(),
          lastUpdated: new Date(),
        });
      } else {
        await stockApi.createStock({
          ...stock,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdated: new Date(),
        });
      }
      await loadData();
      setStockToEdit(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création ou de la mise à jour du stock :', error);
      setError('Erreur lors de la création ou de la mise à jour du stock.');
    }
  };

  const handleDeleteStock = async (id: string) => {
    try {
      await stockApi.deleteStock(id);
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression du stock :', error);
      setError('Erreur lors de la suppression du stock.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <StockHeader onAddStock={() => { setStockToEdit(null); setIsModalOpen(true); }} />
      <StockSummary analytics={analytics} items={items} />

      <StockFilters filters={filters} onFilterChange={setFilters} categories={Array.from(new Set(items.map(item => item.category)))} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <StockTable
            items={filteredItems}
            onUpdate={(id) => {
              const stockToEdit = items.find(item => item.id === id);
              if (stockToEdit) {
                setStockToEdit(stockToEdit);
                setIsModalOpen(true);
              }
            }}
            onDelete={handleDeleteStock}
          />
        </div>
        <div>
          <LowStockPanel
            items={items.filter((item) => item.quantity <= item.threshold)}
            onDelete={handleDeleteStock}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Évolution du Stock</h2>
        <StockChart items={chartData} />
      </div>

      <StockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateStock}
        initialData={stockToEdit || undefined}
      />
    </div>
  );
}