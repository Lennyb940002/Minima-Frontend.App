import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function TechnicalSection() {
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [resetCode, setResetCode] = useState('');
    const appVersion = '1.0.0'; // Version de l'application

    const handleReset = () => {
        if (resetCode === 'RESET') {
            // Implement reset logic
            setShowResetConfirm(false);
            setResetCode('');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Paramètres techniques</h2>

            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900">Version de l'application</h3>
                <p className="mt-1 text-sm text-gray-500">v{appVersion}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Zone de danger
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-red-700">
                                    La réinitialisation effacera toutes vos données. Cette action est irréversible.
                                </p>
                            </div>
                            {!showResetConfirm ? (
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        onClick={() => setShowResetConfirm(true)}
                                    >
                                        Réinitialiser les paramètres
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-4 space-y-4">
                                    <p className="text-sm text-red-700">
                                        Pour confirmer, tapez "RESET" ci-dessous :
                                    </p>
                                    <input
                                        type="text"
                                        className="block w-full max-w-xs rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        value={resetCode}
                                        onChange={(e) => setResetCode(e.target.value)}
                                    />
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={handleReset}
                                        >
                                            Confirmer la réinitialisation
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            onClick={() => {
                                                setShowResetConfirm(false);
                                                setResetCode('');
                                            }}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}