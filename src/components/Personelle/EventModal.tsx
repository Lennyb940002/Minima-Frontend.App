import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CalendarEvent, EventCategory, RecurrenceType } from './types/calendar';
import { X } from 'lucide-react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Omit<CalendarEvent, 'id'>) => void;
    event?: CalendarEvent;
}

const categoryColors = {
    professional: '#4F46E5',
    personal: '#10B981',
    leisure: '#F59E0B',
    other: '#6B7280',
};

export default function EventModal({ isOpen, onClose, onSave, event }: EventModalProps) {
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [startDate, setStartDate] = useState(
        event?.startDate.toISOString().slice(0, 16) || new Date().toISOString().slice(0, 16)
    );
    const [endDate, setEndDate] = useState(
        event?.endDate.toISOString().slice(0, 16) || new Date().toISOString().slice(0, 16)
    );
    const [category, setCategory] = useState<EventCategory>(event?.category || 'personal');
    const [recurrence, setRecurrence] = useState<RecurrenceType>(event?.recurrence || 'none');
    const [reminder, setReminder] = useState(event?.reminder || false);
    const [reminderTime, setReminderTime] = useState(event?.reminderTime || 30);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            category,
            recurrence,
            color: categoryColors[category],
            reminder,
            reminderTime,
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            {event ? 'Modifier l\'événement' : 'Nouvel événement'}
                        </Dialog.Title>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Début</label>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fin</label>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as EventCategory)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="professional">Professionnel</option>
                                <option value="personal">Personnel</option>
                                <option value="leisure">Loisir</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Récurrence</label>
                            <select
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="none">Aucune</option>
                                <option value="daily">Quotidien</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="monthly">Mensuel</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={reminder}
                                    onChange={(e) => setReminder(e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">Rappel</label>
                            </div>

                            {reminder && (
                                <div className="flex items-center space-x-2 text-black">
                                    <input
                                        type="number"
                                        value={reminderTime}
                                        onChange={(e) => setReminderTime(parseInt(e.target.value))}
                                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        min="1"
                                    />
                                    <span className="text-sm text-gray-700">minutes avant</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}