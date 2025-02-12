import axios from 'axios';
import { log } from 'console';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

// Configuration de base d'axios
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Fonction utilitaire pour gérer les erreurs
const handleError = (error: any) => {
    console.error('API Error:', error);
    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
    }
    if (error.response?.status === 401) {
        console.log('Unauthorized access, redirecting to login');
        authApi.logout();
        window.location.href = '/login';
    }
    throw error;
};

export const authApi = {
    login: async (email: string, password: string) => {
        try {
            console.log('Attempting login for:', email);
            console.log('Password:', password);
            
            const response = await axios.post('/login', 
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            console.log('Login response:', response.data);
            
            // Token is stored in httpOnly cookie, no need to store it in localStorage
            
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },

    register: async (email: string, password: string) => {
        try {
            console.log('Attempting registration for:', email);
            const response = await axios.post('/register', 
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            
            console.log('Registration response:', response.data);
            
            // Token is stored in httpOnly cookie, no need to store it in localStorage
            
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },

    logout: () => {
        // Clear the cookies on logout
        document.cookie = 'token=; Max-Age=0';
    },

    isAuthenticated: () => {
        // Check for the presence of the token cookie
        return document.cookie.includes('token=');
    },

    getToken: () => {
        // Extract token from cookie if needed
        const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
        if (match) return match[2];
        return null;
    }
};

// Intercepteurs
axios.interceptors.request.use(
    (config) => {
        const token = authApi.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return handleError(error);
    }
);