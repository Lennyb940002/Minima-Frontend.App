import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import logo from '../../image/logo.png';


export function LoadingScreen() {
    const navigate = useNavigate();
    const { hasPaid } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (hasPaid) {
                navigate('/ecommerce'); // Navigate to the ecommerce dashboard after loading
            } else {
                navigate('/subscription'); // Navigate to the subscription page if not paid
            }
        }, 3000); // Fake loading duration

        return () => clearTimeout(timer);
    }, [navigate, hasPaid]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <img src={logo} alt="Logo" className="h-60 w-60" />
            <div className="mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-loading-bar"></div>
            </div>
        </div>
    );
}
