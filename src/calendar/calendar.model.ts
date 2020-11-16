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

export function rangeFormatter(a: Date, b: Date, locale = 'uk') {
  const fromYear = a.getFullYear();
  const fromMonth = a.getMonth();
  const fromMonthLocalized = new Date(fromYear, fromMonth).toLocaleDateString(locale, { month: 'short' });
  const fromDay = a.getDate();
  const toYear = b.getFullYear();
  const toMonth = b.getMonth();
  const toMonthLocalized = new Date(toYear, toMonth).toLocaleDateString(locale, { month: 'short' });
  const toDay = b.getDate();

  const isSameYear = fromYear === toYear;
  const isSameMonth = fromMonth === toMonth;

  if (isSameMonth && isSameYear) {
    return `${fromDay} — ${toDay} ${toMonthLocalized} ${toYear}`;
  }

  if (isSameYear) {
    return `${fromDay} ${fromMonthLocalized} — ${toDay} ${toMonthLocalized} ${toYear}`;
  }

  return `${fromDay} ${fromMonthLocalized} ${fromYear} — ${toDay} ${toMonthLocalized} ${toYear}`;
}
