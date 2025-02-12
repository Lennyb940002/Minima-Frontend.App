import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { validateEmail } from '../../utils/validation';

interface ForgotPasswordFormProps {
    onBack: () => void;
    onSubmit: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Veuillez entrer une adresse email valide');
            return;
        }

        setIsLoading(true);

        try {
            await onSubmit(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm mb-40 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Email envoyé !</h2>
                <p className="text-white/80 mb-6">
                    Si un compte existe avec cette adresse email, vous recevrez les instructions pour réinitialiser votre mot de passe.
                </p>
                <button
                    onClick={onBack}
                    className="w-full py-2 px-4 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                    Retour à la connexion
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm mb-40">
            <button
                onClick={onBack}
                className="flex items-center text-white/80 hover:text-white mb-6"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Mot de passe oublié ?
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 border border-white text-white transition-colors rounded-lg mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Envoi...' : 'Envoyer les instructions'}
                </button>
            </form>
        </div>
    );
}