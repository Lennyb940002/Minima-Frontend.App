import { create } from 'zustand';
import { CalendarEvent, ViewType } from '../types/calendar';
import { addDays, addMonths, addWeeks, isSameDay } from 'date-fns';

interface CalendarState {
    events: CalendarEvent[];
    currentDate: Date;
    view: ViewType;
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (event: CalendarEvent) => void;
    deleteEvent: (id: string) => void;
    setView: (view: ViewType) => void;
    setCurrentDate: (date: Date) => void;
    getEventsForDate: (date: Date) => CalendarEvent[];
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
    events: [],
    currentDate: new Date(),
    view: 'month',

    addEvent: (event) => {
        const newEvent = {
            ...event,
            id: crypto.randomUUID(),
        };
        set((state) => ({
            events: [...state.events, newEvent],
        }));

        if (event.recurrence !== 'none') {
            const recurrentEvents: CalendarEvent[] = [];
            let nextDate = new Date(event.startDate);
            const duration = event.endDate.getTime() - event.startDate.getTime();

            for (let i = 0; i < 10; i++) {
                switch (event.recurrence) {
                    case 'daily':
                        nextDate = addDays(nextDate, 1);
                        break;
                    case 'weekly':
                        nextDate = addWeeks(nextDate, 1);
                        break;
                    case 'monthly':
                        nextDate = addMonths(nextDate, 1);
                        break;
                }

                recurrentEvents.push({
                    ...event,
                    id: crypto.randomUUID(),
                    startDate: new Date(nextDate),
                    endDate: new Date(nextDate.getTime() + duration),
                });
            }

            set((state) => ({
                events: [...state.events, ...recurrentEvents],
            }));
        }
    },

    updateEvent: (updatedEvent) => {
        set((state) => ({
            events: state.events.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            ),
        }));
    },

    deleteEvent: (id) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },

    setView: (view) => {
        set({ view });
    },

    setCurrentDate: (date) => {
        set({ currentDate: date });
    },

    getEventsForDate: (date) => {
        const { events } = get();
        return events.filter((event) => isSameDay(event.startDate, date));
    },
}));