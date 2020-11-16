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
  weekdayLocalized: string;
  highlight?: 'start' | 'end' | 'in-range';
};

export type CalendarMonth = {
  year: number;
  month: number;
  monthLocalized: string;
  days: CalendarWeekday[];
};

export function rangeFormatter(a: Date, b: Date, locale: string = 'uk'): string {
  if (!a || a?.toString() === 'Invalid Date' || !b || b?.toString() === 'Invalid Date') {
    return '';
  }
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

export function extractDateFromRange(value: string, locale: string = 'uk'): {start: Date, end: Date} {
  if (!value) {
    return;
  }
  const ranges = value.split('—');
  const startRange = ranges[0].trim().split(' ');
  const endRange = ranges[1].trim().split(' ');
  const startRangeLength = startRange.length;
  const refYear = (new Date()).getFullYear();
  const refMonthStrings = [];
  for (let m = 0; m < 12; m++) {
    refMonthStrings.push(new Date(refYear, m).toLocaleString(locale, {month: 'short'}));
  }

  let startDate;
  const endDate = new Date(parseInt(endRange[2], 10),
    refMonthStrings.findIndex(f => f === endRange[1]),
    parseInt(endRange[0], 10)
  );
  if (startRangeLength === 3) {
    startDate = new Date(parseInt(startRange[2], 10),
      refMonthStrings.findIndex(f => f === startRange[1]),
      parseInt(startRange[0], 10)
    );
  }

  if (startRangeLength === 2) {
    startDate = new Date(endDate.getFullYear(),
      refMonthStrings.findIndex(f => f === startRange[1]),
      parseInt(startRange[0], 10)
    );
  }

  if (startRangeLength === 1) {
    startDate = new Date(endDate.getFullYear(), endDate.getMonth(), parseInt(startRange[0], 10));
  }

  return {start: startDate, end: endDate};
}

export function toISOString(date: Date): string {
  if (!date) {
    return;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
}
