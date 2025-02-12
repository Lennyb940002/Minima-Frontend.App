import React, { useState } from 'react';
import { Brain, Plus, Search, Tag, Share2, Link as LinkIcon } from 'lucide-react';
import AddKnowledgeForm from './AddKnowledgeForm'; // Assurez-vous que le chemin est correct

type KnowledgeItem = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    createdAt: string;
};

interface KnowledgeBaseSectionProps {
    knowledgeBase: KnowledgeItem[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addKnowledgeItem: (item: KnowledgeItem) => void;
}

const KnowledgeBaseSection: React.FC<KnowledgeBaseSectionProps> = ({ knowledgeBase, searchQuery, setSearchQuery, addKnowledgeItem }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-indigo-600" />
                    Base de Connaissances
                </h2>
                <div className="flex space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle note
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {knowledgeBase.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        {item.category}
                                    </span>
                                    {item.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 rounded hover:bg-gray-100">
                                    <LinkIcon className="w-5 h-5 text-gray-400" />
                                </button>
                                <button className="p-2 rounded hover:bg-gray-100">
                                    <Share2 className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600">{item.content}</p>
                    </div>
                ))}
            </div>

            {isFormOpen && <AddKnowledgeForm onClose={() => setIsFormOpen(false)} onSave={addKnowledgeItem} />}
        </section>
    );
};

export default KnowledgeBaseSection;