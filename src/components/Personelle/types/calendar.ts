export type EventCategory = 'professional' | 'personal' | 'leisure' | 'other';

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: EventCategory;
    recurrence: RecurrenceType;
    color: string;
    reminder: boolean;
    reminderTime: number;
}

export type ViewType = 'day' | 'week' | 'month';

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
}