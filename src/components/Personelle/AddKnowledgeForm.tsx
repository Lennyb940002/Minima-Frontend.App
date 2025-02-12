import React, { useState } from 'react';

type KnowledgeItem = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    createdAt: string;
};

interface AddKnowledgeFormProps {
    onClose: () => void;
    onSave: (item: KnowledgeItem) => void;
}

const AddKnowledgeForm: React.FC<AddKnowledgeFormProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newKnowledgeItem: KnowledgeItem = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            category,
            createdAt: new Date().toISOString(),
        };
        onSave(newKnowledgeItem);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contenu</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tags (séparés par des virgules)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Catégorie</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddKnowledgeForm;