import axios from 'axios';
import { Sale } from '../components/sales/types';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/sales';

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

export const salesApi = {
    getAllSales: async (): Promise<Sale[]> => {
        try {
            console.log('Fetching all sales from API...');
            const response = await api.get<Sale[]>('/');
            console.log('Sales fetched successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des ventes :', error);
            throw error;
        }
    },

    createSale: async (sale: Omit<Sale, '_id'>): Promise<Sale> => {
        try {
            console.log('Creating new sale:', sale);
            const response = await api.post<Sale>('/', sale);
            console.log('Sale created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la vente :', error);
            throw error;
        }
    },

    updateSale: async (id: string, sale: Partial<Omit<Sale, '_id'>>): Promise<Sale> => {
        try {
            console.log(`Updating sale with id ${id}:`, sale);
            const response = await api.put<Sale>(`/${id}`, sale);
            console.log('Sale updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la vente :', error);
            throw error;
        }
    },

    updateDecStatus: async (id: string): Promise<Sale> => {
        try {
            console.log(`Updating decStatus for sale with id ${id}`);
            const response = await api.patch<Sale>(`/${id}/decstatus`, {
                decStatus: 2
            });
            console.log('DecStatus updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du decStatus:', error);
            throw error;
        }
    },

    deleteSale: async (id: string): Promise<void> => {
        try {
            console.log(`Deleting sale with id ${id}`);
            await api.delete(`/${id}`);
            console.log('Sale deleted successfully');
        } catch (error) {
            console.error('Erreur lors de la suppression de la vente :', error);
            throw error;
        }
    },
};
