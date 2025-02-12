import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import AddActivityForm from './AddActivityForm';

type Activity = {
    id: string;
    title: string;
    start: string;
    end: string;
    category: string;
};

interface PlanningSectionProps {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
}

const getActivityColor = (category: string) => {
    const colors = {
        work: 'bg-gradient-to-r from-blue-600/30 to-blue-400/30 border-blue-400/50 text-blue-200',
        meeting: 'bg-gradient-to-r from-red-600/30 to-red-400/30 border-red-400/50 text-red-200',
        personal: 'bg-gradient-to-r from-yellow-600/30 to-yellow-400/30 border-yellow-400/50 text-yellow-200',
        travel: 'bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 border-emerald-400/50 text-emerald-200',
        family: 'bg-gradient-to-r from-orange-600/30 to-orange-400/30 border-orange-400/50 text-orange-200',
        other: 'bg-gradient-to-r from-purple-600/30 to-purple-400/30 border-purple-400/50 text-purple-200'
    };
    return colors[category] || colors.other;
};

const PlanningSection: React.FC<PlanningSectionProps> = ({ activities, addActivity }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState("January 2024");

    const timeSlots = [
        "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"
    ];

    return (
        <div className="bg-gradient-to-br from-black via-zinc-900 to-zinc-900 rounded-xl shadow-2xl border border-zinc-800/50 backdrop-blur-xl">
            {/* Header avec effet de glassmorphism */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-black/40 rounded-t-xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                        {currentMonth}
                    </h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800/80 rounded-full hover:bg-zinc-700/80 transition-all duration-200 border border-zinc-700/50">
                            Week
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
                            Today
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-zinc-800/80 rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-200">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-zinc-800/80 rounded-full text-zinc-400 hover:text-zinc-200 transition-all duration-200">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-9 pr-4 py-2 text-xs bg-zinc-900/80 border border-zinc-700/50 rounded-full text-zinc-200 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Calendar Grid avec effet de profondeur */}
            <div className="grid grid-cols-8 bg-black/20">
                {/* Time column */}
                <div className="border-r border-zinc-800/30">
                    <div className="h-8"></div>
                    {timeSlots.map((time) => (
                        <div key={time} className="h-20 px-3 py-1 text-right text-xs font-medium text-zinc-500">
                            {time}
                        </div>
                    ))}
                </div>

                {/* Days columns */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="relative border-r border-zinc-800/30">
                        <div className="h-8 px-3 py-2 text-xs font-medium text-zinc-300 border-b border-zinc-800/30 bg-black/20">
                            {day} {15 + i}
                        </div>
                        {timeSlots.map((time, index) => (
                            <div key={time} className="h-20 border-b border-zinc-800/30 relative group hover:bg-zinc-800/10 transition-colors duration-200">
                                {activities
                                    .filter(activity => {
                                        const activityHour = parseInt(activity.start);
                                        const slotStartHour = parseInt(time);
                                        return activityHour >= slotStartHour &&
                                            activityHour < (index < timeSlots.length - 1 ? parseInt(timeSlots[index + 1]) : 24) &&
                                            new Date(activity.start).getDay() === i;
                                    })
                                    .map(activity => (
                                        <div
                                            key={activity.id}
                                            className={`absolute inset-x-1 rounded-lg px-3 py-1.5 text-xs border backdrop-blur-sm ${getActivityColor(activity.category)} hover:ring-2 hover:ring-white/30 cursor-pointer transition-all duration-200 shadow-lg`}
                                            style={{
                                                top: '2px',
                                                minHeight: '24px'
                                            }}
                                        >
                                            <div className="truncate font-medium">
                                                {activity.title}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <AddActivityForm
                    onClose={() => setIsFormOpen(false)}
                    onSave={addActivity}
                />
            )}
        </div>
    );
};

export default PlanningSection;