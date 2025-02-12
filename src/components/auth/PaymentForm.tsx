import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import axios from 'axios';

const PaymentForm: React.FC = () => {
    const navigate = useNavigate();
    const { selectedPlan, userEmail } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('PaymentForm useEffect triggered');
        const initiatePayment = async () => {
            if (!selectedPlan || !userEmail) {
                console.log('No selected plan or user email, navigating to /subscription');
                navigate('/subscription');
                return;
            }

            try {
                console.log('Initiating payment with planId:', selectedPlan.id, 'and userEmail:', userEmail);
                const response = await axios.post('http://localhost:3001/api/create-checkout-session', {
                    planId: selectedPlan.id,
                    userEmail: userEmail,
                    successUrl: `${window.location.origin}/loading?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/subscription`,
                });

                console.log('Stripe checkout session response:', response);

                if (response.data.url) {
                    console.log('Redirecting to Stripe checkout URL:', response.data.url);
                    window.location.href = response.data.url;
                } else {
                    throw new Error('No checkout URL received');
                }
            } catch (err) {
                console.error('Payment initiation error:', err);
                setError('Une erreur est survenue lors de l\'initialisation du paiement.');
            } finally {
                setIsLoading(false);
            }
        };

        initiatePayment();
    }, [selectedPlan, userEmail, navigate]);

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-8 rounded-lg backdrop-blur-sm">
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
                <button
                    onClick={() => navigate('/subscription')}
                    className="w-full py-3 px-4 border border-white text-white font-medium transition-colors rounded-lg hover:bg-white hover:text-black"
                >
                    Retour à la sélection du plan
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Redirection vers le paiement...
            </h2>
            {isLoading && (
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-center text-white">
                        Veuillez patienter pendant que nous préparons votre paiement.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
