export const CALENDAR_WEEKDAYS_UK = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];

export enum CalendarType {
    Basic = 'basic',
    WithButton = 'with-button',
    Range = 'range'
}

export enum CalendarState {
    NotSelected = 'not-selected',
    Days = 'days',
    Months = 'months',
    Years = 'years'
}

export type CalendarWeekday = {
    day: number;
    weekday: number;
    weekdayLocalized: string
};

export type CalendarMonth = {
    month: number;
    monthLocalized: string;
    days: CalendarWeekday[];
};
