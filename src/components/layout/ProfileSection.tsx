import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function ProfileSection() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        newPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement form submission logic
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            // Implement image upload logic
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Profil Personnel</h2>

            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Photo de profil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label
                        htmlFor="photo"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
                    >
                        <Camera size={16} className="text-gray-600" />
                        <input
                            type="file"
                            id="photo"
                            className="hidden"
                            accept="image/jpeg,image/png"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
                    <p className="text-sm text-gray-500">
                        JPG ou PNG. 5 MB maximum.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            maxLength={50}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            maxLength={50}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            Mot de passe actuel
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Minimum 8 caractères, incluant majuscules, chiffres et caractères spéciaux
                        </p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
}