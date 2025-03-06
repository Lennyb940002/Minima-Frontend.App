import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Period, Sale } from './types';
import { SalesOverviewCard } from './SalesOverviewCard';
import { SalesChart } from './SalesChart';
import { StatsCard } from './StatsCard';
import { ProductModal } from './ProductModal';
import { SalesTable } from './SalesTable';
import { salesApi } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

export function SalesView() {
  const [revenuePeriod, setRevenuePeriod] = useState<Period>('All');
  const [totalSalesPeriod, setTotalSalesPeriod] = useState<Period>('All');
  const [quantityPeriod, setQuantityPeriod] = useState<Period>('All');
  const [marginPeriod, setMarginPeriod] = useState<Period>('All');
  const [benefitPeriod, setBenefitPeriod] = useState<Period>('All');

  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      console.log('Fetching sales data...');
      const salesData = await salesApi.getAllSales();
      console.log('Sales data fetched:', salesData);
      setSales(salesData);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      console.log('Fetching analytics data...');
      const analyticsData = await salesApi.getSalesAnalytics();
      console.log('Analytics data fetched:', analyticsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchAnalytics();
  }, []);

  const handleAddSale = async (newSale: Omit<Sale, '_id'>) => {
    try {
      console.log('Adding new sale:', newSale);
      await salesApi.createSale(newSale);
      await fetchSalesData();
      await fetchAnalytics();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const handleEditSale = async (updatedSale: Partial<Sale>) => {
    try {
      if (selectedSale) {
        console.log('Editing sale:', updatedSale);
        await salesApi.updateSale(selectedSale._id, updatedSale);
        await fetchSalesData();
        await fetchAnalytics();
        setIsModalOpen(false);
        setSelectedSale(null);
      }
    } catch (error) {
      console.error('Error editing sale:', error);
    }
  };

  const handleDeleteSale = async (id: string) => {
    try {
      console.log(`Deleting sale with id ${id}`);
      await salesApi.deleteSale(id);
      await fetchSalesData();
      await fetchAnalytics();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const handleEditClick = (sale: Sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const filterSalesByPeriod = (sales: Sale[], period: Period) => {
    const now = new Date();
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      switch (period) {
        case 'Jour':
          return saleDate.toDateString() === now.toDateString();
        case 'Semaine':
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return saleDate >= oneWeekAgo && saleDate <= now;
        case 'Mois':
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return saleDate >= oneMonthAgo && saleDate <= now;
        case 'All':
        default:
          return true;
      }
    });
  };

  // Filter out cancelled sales
  const validSales = sales.filter(sale => sale.paymentStatus !== 'Annulé');

  const filteredRevenueSales = filterSalesByPeriod(validSales, revenuePeriod);
  const filteredTotalSales = filterSalesByPeriod(validSales, totalSalesPeriod);
  const filteredQuantitySales = filterSalesByPeriod(validSales, quantityPeriod);
  const filteredMarginSales = filterSalesByPeriod(validSales, marginPeriod);
  const filteredBenefitSales = filterSalesByPeriod(validSales, benefitPeriod);

  const totalRevenue = filteredRevenueSales.reduce((sum, sale) => sum + sale.salePrice * sale.quantity, 0);
  const totalSalesCount = filteredTotalSales.length;
  const totalQuantity = filteredQuantitySales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalMargin = filteredMarginSales.reduce((sum, sale) => sum + sale.margin, 0);
  const totalBenefit = filteredBenefitSales.reduce((sum, sale) => sum + sale.margin, 0);

  return (
    <div className=" relative space-y-6">
      <header className='border-b border-white/10 h-12'>
        <h2 className="text-2xl font-bold">Gestion de Vente</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <SalesOverviewCard
          title="Vue d'ensemble du CA"
          value={formatCurrency(totalRevenue)}
          period={revenuePeriod}
          onPeriodChange={setRevenuePeriod}
        />
        <SalesOverviewCard
          title="Ventes Totales"
          value={totalSalesCount.toString()}
          period={totalSalesPeriod}
          onPeriodChange={setTotalSalesPeriod}
        />
        <SalesOverviewCard
          title="Quantité Totale"
          value={totalQuantity.toString()}
          period={quantityPeriod}
          onPeriodChange={setQuantityPeriod}
        />
        <SalesOverviewCard
          title="Marge Totale"
          value={formatCurrency(totalMargin)}
          period={marginPeriod}
          onPeriodChange={setMarginPeriod}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[310px]">
        <div className="text-center h-full flex flex-col justify-center">
          <SalesOverviewCard
            title="Bénéfice"
            value={formatCurrency(totalBenefit)}
            period={benefitPeriod}
            onPeriodChange={setBenefitPeriod}
          />
        </div>
        <div className="md:col-span-2">
          <SalesChart
            data={filteredRevenueSales.map(sale => ({
              date: new Date(sale.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
              sales: sale.salePrice * sale.quantity
            }))}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-black border border-white/10 rounded-xl p-4 h-[310px]">
            <h3 className="text-sm mb-4 text-center text-zinc-400">Statistiques</h3>
            <div className="space-y-6">
              <StatsCard
                label="Panier Moyen (Quantité)"
                value={totalSalesCount ? (totalQuantity / totalSalesCount).toFixed(2) : '0'}
              />
              <StatsCard
                label="Valeur Moyenne des Transactions"
                value={totalSalesCount ? formatCurrency(totalRevenue / totalSalesCount) : '0 €'}
              />
              <StatsCard
                label="Revenu Journalier Moyen"
                value={analytics?.totalDays ? formatCurrency(totalRevenue / analytics.totalDays) : '0 €'}
              />
              <StatsCard
                label="Produit le Moins Vendu"
                value={filteredRevenueSales.length ? filteredRevenueSales.reduce((leastSold, sale) => sale.quantity < leastSold.quantity ? sale : leastSold).product : 'Aucun'}
              />
              <StatsCard
                label="Taux de Conversion"
                value={analytics?.conversionRate ? `${(analytics.conversionRate * 100).toFixed(2)}%` : '0%'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tableau des ventes</h2>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => {
              setSelectedSale(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter Vente
          </button>
        </div>
        <SalesTable sales={sales} onDelete={handleDeleteSale} onEdit={handleEditClick} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={selectedSale ? handleEditSale : handleAddSale}
        sale={selectedSale}
      />
    </div>
  );
}
