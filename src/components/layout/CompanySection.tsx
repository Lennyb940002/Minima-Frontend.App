import React, { useState, useEffect } from 'react';

export default function CompanySection() {
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        email: '',
        confirmEmail: '',
    });

    const [saveStatus, setSaveStatus] = useState('');

    // Autosave effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (saveStatus === 'Sauvegarde...') {
                setSaveStatus('Modifications enregistrées');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [saveStatus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSaveStatus('Sauvegarde...');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Informations de l'entreprise</h2>
                {saveStatus && (
                    <span className="text-sm text-gray-500">{saveStatus}</span>
                )}
            </div>

            <form className="space-y-6">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Nom de l'entreprise *
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Adresse
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Code postal
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Ville
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Pays
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email professionnel
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                            Confirmer l'email professionnel
                        </label>
                        <input
                            type="email"
                            id="confirmEmail"
                            name="confirmEmail"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}