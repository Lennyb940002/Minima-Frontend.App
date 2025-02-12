import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../types';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    selectedPlan: Plan | null;
    setSelectedPlan: (plan: Plan | null) => void;
    userEmail: string;
    setUserEmail: (email: string) => void;
    hasPaid: boolean;
    setHasPaid: (value: boolean) => void;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [userEmail, setUserEmail] = useState('');
    const [hasPaid, setHasPaid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('AuthProvider useEffect triggered');
        // Vérifier l'authentification au chargement
        const token = localStorage.getItem('token');
        const storedHasPaid = localStorage.getItem('hasPaid');

        console.log('Initial token:', token);
        console.log('Initial hasPaid status:', storedHasPaid);

        setIsAuthenticated(!!token);
        setHasPaid(storedHasPaid === 'true');
        setIsLoading(false);
    }, []);

    const logout = () => {
        console.log('Logging out');
        localStorage.removeItem('token');
        localStorage.removeItem('hasPaid');
        setIsAuthenticated(false);
        setUserEmail('');
        setSelectedPlan(null);
        setHasPaid(false);
        navigate('/auth');
    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        selectedPlan,
        setSelectedPlan,
        userEmail,
        setUserEmail,
        hasPaid,
        setHasPaid,
        isLoading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
