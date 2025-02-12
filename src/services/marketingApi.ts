import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/marketing';

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

export const marketingApi = {
    getAllCampaigns: async (): Promise<any> => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des campagnes :', error);
            throw error;
        }
    },

    createCampaign: async (campaign: any): Promise<any> => {
        try {
            const response = await api.post('/', campaign);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de la campagne :', error);
            throw error;
        }
    },

    updateCampaign: async (id: string, campaign: Partial<any>): Promise<any> => {
        try {
            const response = await api.put(`/${id}`, campaign);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la campagne :', error);
            throw error;
        }
    },

    deleteCampaign: async (id: string): Promise<void> => {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression de la campagne :', error);
            throw error;
        }
    },
};
