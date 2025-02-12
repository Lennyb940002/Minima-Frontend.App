import axios from 'axios';
import { Product } from '../components/product/types';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/products';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const productApi = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        try {
            const response = await api.post('/', product);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            console.error('Product data:', product); // Log the product data
            throw error;
        }
    },

    updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
        try {
            const response = await api.put(`/${id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with id: ${id}`, error);
            console.error('Product data:', product); // Log the product data
            throw error;
        }
    },

    deleteProduct: async (id: string): Promise<void> => {
        try {
            console.log(`Sending delete request for product with id: ${id}`); // Log the ID
            await api.delete(`/${id}`);
        } catch (error) {
            console.error(`Error deleting product with id: ${id}`, error);
            throw error;
        }
    },
};
