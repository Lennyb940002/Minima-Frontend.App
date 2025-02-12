import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { format, addMonths, subMonths, isSameDay, startOfToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCalendarStore } from './store/calendarStore';
import EventModal from './EventModal';
import EventList from './EventList';
import { CalendarDay } from './types/calendar';

function PersoView() {
    // Calendar store states and actions
    const {
        currentDate,
        setCurrentDate,
        view,
        setView,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventsForDate
    } = useCalendarStore();

    // Local states for modal and selected data
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Handlers for navigation and actions
    const changeMonth = (direction) => setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));

    const openEventModal = (event = null, date = null) => {
        setSelectedEvent(event);
        setSelectedDate(date);
        setIsEventModalOpen(true);
    };

    const saveEvent = (eventData) => {
        selectedEvent ? updateEvent({ ...eventData, id: selectedEvent.id }) : addEvent(eventData);
        setIsEventModalOpen(false);
    };

    const daysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const days = [];
        const firstDayIndex = new Date(year, month, 1).getDay() || 7;
        const totalDays = new Date(year, month + 1, 0).getDate();

        // Add previous month days
        for (let i = firstDayIndex - 1; i > 0; i--) {
            days.push({
                date: new Date(year, month, -i + 1),
                isCurrentMonth: false
            });
        }

        // Add current month days
        for (let day = 1; day <= totalDays; day++) {
            days.push({
                date: new Date(year, month, day),
                isCurrentMonth: true
            });
        }

        // Add next month days to complete the grid
        while (days.length < 42) {
            const nextMonthDay = days.length - totalDays - firstDayIndex + 1;
            days.push({
                date: new Date(year, month + 1, nextMonthDay),
                isCurrentMonth: false
            });
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-black py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/5 rounded-lg shadow-lg border border-white/10">

                    {/* Header Section */}
                    <header className="p-6 border-b border-white/10">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-200">
                                {format(currentDate, 'MMMM yyyy', { locale: fr })}
                            </h1>
                            <div className="flex space-x-4">
                                <button onClick={() => changeMonth('prev')} className="p-2 rounded-full hover:bg-white/10">
                                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                                </button>
                                <button onClick={() => changeMonth('next')} className="p-2 rounded-full hover:bg-white/10">
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <button onClick={() => openEventModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Plus className="w-5 h-5 mr-2" />
                                Nouvel événement
                            </button>
                        </div>
                        <div className="flex mt-4 space-x-2">
                            {['day', 'week', 'month'].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`px-4 py-2 rounded-lg ${view === v ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}
                                >
                                    {v[0].toUpperCase() + v.slice(1)}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-px bg-gray-700">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                            <div key={day} className="bg-gray-800 p-4 text-sm font-semibold text-gray-200">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-gray-700">
                        {daysInMonth().map(({ date, isCurrentMonth }, idx) => {
                            const dayEvents = getEventsForDate(date);
                            const isToday = isSameDay(date, startOfToday());
                            const isSelected = selectedDate && isSameDay(date, selectedDate);

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedDate(date)}
                                    className={`relative bg-gray-800 p-2 min-h-[120px] cursor-pointer
                                        ${!isCurrentMonth ? 'bg-gray-700' : ''}
                                        ${isSelected ? 'ring-2 ring-blue-500' : ''}
                                        ${isToday ? 'bg-blue-600 text-white' : ''}`}
                                >
                                    <span className="font-bold text-sm">{format(date, 'd')}</span>
                                    {dayEvents.slice(0, 2).map((event) => (
                                        <div
                                            key={event.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEventModal(event, date);
                                            }}
                                            className="mt-2 text-xs p-1 rounded truncate"
                                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                        <div className="text-xs text-gray-400">+{dayEvents.length - 2} autres</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Selected Date Events */}
                    {selectedDate && (
                        <section className="mt-6 bg-white/5 rounded-lg shadow-lg p-6">
                            <header className="flex justify-between">
                                <h2 className="text-lg font-semibold text-gray-200">
                                    {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
                                </h2>
                                <button onClick={() => openEventModal(null, selectedDate)} className="text-blue-600 hover:text-blue-700">
                                    Ajouter un événement
                                </button>
                            </header>
                            <EventList events={getEventsForDate(selectedDate)} onEventClick={(event) => openEventModal(event)} />
                        </section>
                    )}

                    {/* Event Modal */}
                    <EventModal
                        isOpen={isEventModalOpen}
                        onClose={() => setIsEventModalOpen(false)}
                        onSave={saveEvent}
                        onDelete={(id) => {
                            deleteEvent(id);
                            setIsEventModalOpen(false);
                        }}
                        event={selectedEvent}
                        initialDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}

export default PersoView;
