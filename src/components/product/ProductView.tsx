import React, { useState, useEffect } from 'react';
import { Plus, Info } from 'lucide-react';
import { Product } from './types';
import { productApi } from '../../services/productApi';
import { ProductModal } from './ProductModal';
import { ProductCard } from './ProductCard';
import { CriteriaModal } from './CriteriaModal';

export function ProductView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({ category: '', status: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await productApi.getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        (!filters.category || product.category === filters.category) &&
        (!filters.status || product.status === filters.status)
      )
    );
  }, [products, filters]);

  const handleCreateOrUpdate = async (product: Product) => {
    try {
      const productId = product.id ? product.id.toString() : product._id?.toString();
      if (productToEdit) {
        await productApi.updateProduct(productId, product);
      } else {
        await productApi.createProduct(product);
      }
      await fetchProducts();
      setProductToEdit(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting product:', error);
      await fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log(`Deleting product with id: ${id}`); // Log the ID
      await productApi.deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.error(`Error deleting product with id: ${id}`, error);
    }
  };

  const resetFilters = () => {
    setFilters({ category: '', status: '' });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Lab</h1>
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>Créer Produit</span>
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center"
            onClick={() => setIsCriteriaModalOpen(true)}
          >
            <Info size={16} />
          </button>
        </div>
      </header>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-4xl mx-auto mt-8">
        <div className="flex space-x-4">
          <select
            className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option className="text-black" value="">Toutes les catégories</option>
            <option className="text-black" value="tech">Technologie</option>
            <option className="text-black" value="fashion">Mode</option>
            <option className="text-black" value="home">Maison</option>
            <option className="text-black" value="beauty">Beauté et bien-être</option>
            <option className="text-black" value="food">Nourriture et boissons</option>
            <option className="text-black" value="sports">Sports et loisirs</option>
            <option className="text-black" value="entertainment">Livres, musique et divertissement</option>
            <option className="text-black" value="baby">Bébé et enfant</option>
            <option className="text-black" value="auto">Automobiles et accessoires</option>
            <option className="text-black" value="pets">Animaux</option>
            <option className="text-black" value="industry">Industrie et commerce</option>
          </select>

          <select
            className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option className="text-black" value="">Tous les statuts</option>
            <option className="text-black" value="draft">Brouillon</option>
            <option className="text-black" value="in-progress">En cours</option>
            <option className="text-black" value="validated">Validé</option>
            <option className="text-black" value="rejected">Rejeté</option>
          </select>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
        {filteredProducts.map((product) => {
          const productId = product.id ? product.id.toString() : product._id?.toString();
          if (!productId) {
            console.error("Product ID is undefined", product);
            return null;
          }
          return (
            <ProductCard
              key={productId} // Ensure a unique key for each component
              product={product}
              onEdit={() => {
                setProductToEdit(product);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(productId)} // Convert ID to string
            />
          );
        })}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={productToEdit || undefined}
      />

      <CriteriaModal
        isOpen={isCriteriaModalOpen}
        onClose={() => setIsCriteriaModalOpen(false)}
      />
    </div>
  );
}