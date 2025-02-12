import React from 'react';
import { CalendarEvent } from './types/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface EventListProps {
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
}

export default function EventList({ events, onEventClick }: EventListProps) {
    return (
        <div className="space-y-2">
            {events.map((event) => (
                <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderLeft: `4px solid ${event.color}` }}
                >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {format(event.startDate, 'HH:mm', { locale: fr })} -
                            {format(event.endDate, 'HH:mm', { locale: fr })}
                        </div>
                        {event.recurrence !== 'none' && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                <span className="capitalize">
                                    {event.recurrence === 'daily' && 'Quotidien'}
                                    {event.recurrence === 'weekly' && 'Hebdomadaire'}
                                    {event.recurrence === 'monthly' && 'Mensuel'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}