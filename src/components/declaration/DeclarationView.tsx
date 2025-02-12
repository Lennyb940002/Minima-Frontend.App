import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import { ChargesSimulator } from './ChargesSimulator';
import DeclarationTabs from './DeclarationTabs';
import DeclarationSection from './DeclarationSection';
import { declarationApi } from '../../services/declarationApi';
import { salesApi } from '../../services/api';
import { Sale } from './types';

// Fonction pour regrouper les déclarations par statut
const groupDeclarationsByStatus = (sales: Sale[], taxRate: number) => {
  const salesByMonth = sales.reduce((acc, sale) => {
    const date = new Date(sale.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${year}-${month < 10 ? '0' + month : month}`;

    if (!acc[key]) {
      acc[key] = {
        id: key,
        status: 'pending',
        date: key,
        amount: 0,
        payment: 0,
        isPaid: false,
        lastModified: new Date().toISOString(),
        type: 'sale',
        dueDate: new Date().toISOString(),
        toPay: 0,
        decStatus: sale.decStatus, // Add decStatus to the grouped data
      };
    }

    acc[key].amount += sale.salePrice * sale.quantity;
    acc[key].payment += sale.salePrice * sale.quantity;
    acc[key].toPay += sale.salePrice * sale.quantity * taxRate;
    return acc;
  }, {});

  const toDeclare = Object.values(salesByMonth).filter((declaration: any) => declaration.decStatus === 1);
  const toPay = Object.values(salesByMonth).filter((declaration: any) => declaration.decStatus === 2);
  const history = Object.values(salesByMonth).filter((declaration: any) => declaration.isPaid);

  return { toDeclare, toPay, history };
};

export function DeclarationView() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
  const [nextDeclaration] = useState(52);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedDeclaration, setSelectedDeclaration] = useState<any | null>(null); // Use any type for selectedDeclaration
  const [taxRate, setTaxRate] = useState(0.123);
  const [error, setError] = useState<string | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const salesData = await salesApi.getAllSales();
      setSales(salesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = (declaration: any) => { // Use any type for declaration
    console.log('Total charges:', declaration.amount * taxRate);
  };

  const handleDeclare = (declaration: any) => { // Use any type for declaration
    if (declaration && declaration.date) {
      setSelectedDeclaration(declaration);
      setConfirmationPopup(true);
      setShowDisclaimer(true);
    } else {
      setError('Déclaration invalide');
    }
  };

  const confirmDeclare = async () => {
    if (selectedDeclaration?.date) {
      try {
        console.log('Declaring with data:', {
          date: selectedDeclaration.date,
          declaration: selectedDeclaration
        });

        // Mettre à jour le statut de la déclaration
        await declarationApi.updateDeclarationStatus(selectedDeclaration.date, true);

        // Mettre à jour l'état local
        setSales(prevSales =>
          prevSales.map(sale => {
            const saleDate = new Date(sale.date);
            const saleYearMonth = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}`;

            return saleYearMonth === selectedDeclaration.date ?
              { ...sale, decStatus: 2 } :
              sale;
          })
        );

        // Rafraîchir les données
        await fetchData();

        // Réinitialiser la popup
        setSelectedDeclaration(null);
        setConfirmationPopup(false);

        // Masquer le texte de non-responsabilité
        setShowDisclaimer(false);
      } catch (error) {
        console.error('Error declaring:', error);
        setError('Erreur lors de la déclaration');
      }
    }
  };

  const cancelDeclare = () => {
    setSelectedDeclaration(null);
    setConfirmationPopup(false);
    setShowDisclaimer(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  const { toDeclare, toPay, history } = groupDeclarationsByStatus(sales, taxRate);

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center border-b border-white/10 h-20">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes Déclarations</h1>
          <p className="text-white/60 mt-1">
            Prochaine déclaration dans {nextDeclaration} jours
          </p>
        </div>
        <Link2 className="text-blue-400 w-6 h-6" />
      </div>

      <ChargesSimulator onSimulate={handleSimulate} />

      <div className="flex gap-4 ">
        <label className="flex items-center gap-2 text-white ">
          <input
            type="radio"
            name="taxRate"
            value="0.123"
            checked={taxRate === 0.123}
            onChange={() => setTaxRate(0.123)}
            className="text-blue-500"
          />
          12.3%
        </label>
        <label className="flex items-center gap-2 text-white">
          <input
            type="radio"
            name="taxRate"
            value="0.21"
            checked={taxRate === 0.21}
            onChange={() => setTaxRate(0.21)}
            className="text-blue-500"
          />
          21%
        </label>
      </div>

      <DeclarationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-3 gap-6 ">
        <div className="relative pr-6">
          <DeclarationSection
            title="À Déclarer"
            items={toDeclare}
            onDeclare={handleDeclare}
            onSimulate={handleSimulate}
            period={activeTab}
            taxRate={taxRate}
            showToPay={true}
          />
          <div className="absolute right-0 top-0 h-full border-r border-white/20" />
        </div>
        <div className="relative pr-6">
          <DeclarationSection
            title="Payer"
            items={toPay}
            onDeclare={handleDeclare}
            onSimulate={handleSimulate}
            period={activeTab}
            taxRate={taxRate}
            showToPay={true}
          />
          <div className="absolute right-0 top-0 h-full border-r border-white/20" />
        </div>
        <div className="relative pr-6">
          <DeclarationSection
            title="Historique"
            items={history}
            onDeclare={handleDeclare}
            onSimulate={handleSimulate}
            period={activeTab}
            taxRate={taxRate}
            showToPay={true}
          />
        </div>
      </div>

      {confirmationPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-sm w-full mx-4 backdrop-blur-xl">
            {showDisclaimer && (
              <div className="mt-6 p-4 rounded-lg text-white">
                <p className="mb-2">
                  En utilisant cette application, vous acceptez que Minima ne soit pas responsable des erreurs de calcul. Cette application est fictive et est destinée uniquement à guider. Elle doit être considérée comme un outil non officiel.
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                  />
                  J'accepte les termes et conditions
                </label>
              </div>
            )}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-6 py-2.5 text-sm font-medium bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors duration-150"
                onClick={cancelDeclare}
              >
                Annuler
              </button>
              <button
                className="px-6 py-2.5 text-sm font-medium bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-150"
                onClick={confirmDeclare}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeclarationView;