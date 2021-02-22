export const CALENDAR_WEEKDAYS_UK = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];
export const YEARS_SHIFT = 50;

export enum CalendarType {
  Basic = 'basic',
  WithButton = 'with-button',
  Range = 'range'
}
export enum CalendarState {
  Days = 'days',
  Months = 'months',
  Years = 'years'
}
export enum CalendarFormat {
  Long = 'long',
  Short = 'short'
}

export type DateRange = {start: string, end?: string};
export type CalendarWeekday = {
  day: number;
  weekday: number;
  weekdayLocalized: string;
  highlight?: 'start' | 'end' | 'in-range';
  inactive?: boolean
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

export function toISOString(date: Date | string): string {
  if (!date) {
    return;
  }
  if (!(date instanceof Date)) {
    return date;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
}

export function buildYearsList(start?: number, end?: number): number[] {
  const year = new Date().getFullYear();
  start = start ?? year - YEARS_SHIFT;
  end = end ?? year + YEARS_SHIFT;
  return Array.from(Array(end - start - 1), (_, i) => (i + start));
}

export function buildMonthsList(locale: string = 'uk',
                                format: CalendarFormat = CalendarFormat.Long): string[] {
  const result = [];
  const year = new Date().getFullYear();
  for (let month = 0; month < 12; month++) {
    result.push(new Date(year, month).toLocaleString(locale, {month: format}));
  }
  return result;
}

export function buildCalendar(year: number,
                              locale: string = 'uk',
                              format: CalendarFormat = CalendarFormat.Short): CalendarMonth[] {
  const result = [];
  for (let month = 0; month < 12; month++) {
    const last = new Date(year, month + 1, 0).getDate();
    const monthCaption = new Date(year, month).toLocaleString(locale, {month: format});
    result.push({
      year,
      month: month + 1,
      monthLocalized: monthCaption,
      days: (() => {
        const resultDays = [];
        for (let j = 1; j <= last; j++) {
          const weekday = new Date(year, month, j).getDay();
          resultDays.push({
            day: j,
            weekday: weekday === 0 ? 7 : weekday,
            weekdayLocalized: new Date(year, month, j).toLocaleDateString(locale, {weekday: format})
          });
        }
        return resultDays;
      })()
    });
  }
  return result;
}

export function buildQuarter(months: CalendarMonth[]): CalendarMonth[] {
  const current = months[1];
  const firstDay = current.days[0];
  const lastDay = current.days[current.days.length - 1];
  const diffDaysPrevMonth = 1 - firstDay.weekday;
  const diffDaysLastMonth = 7 - lastDay.weekday;
  if (diffDaysPrevMonth === 0) {
    months[0].days = [];
  } else {
    months[0].days = months[0].days.slice(diffDaysPrevMonth);
  }
  if (diffDaysLastMonth === 7) {
    months[2].days = [];
  } else {
    months[2].days = months[2].days.slice(0, diffDaysLastMonth);
  }
  return [
    months[0],
    current,
    months[2],
  ];
}

export function isDateInRange(start: Date, end: Date, check: Date): boolean {
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  check.setHours(0, 0, 0, 0);
  return check >= start && check <= end;
}

export function swapDates(start: string | Date, end: string | Date): {start: string, end: string} {
  const startDate = start instanceof Date ? start : new Date(start);
  const endDate = end instanceof Date ? end : new Date(end);
  const from = {day: startDate.getDate(), month: startDate.getMonth(), year: startDate.getFullYear()};
  const to = {day: endDate.getDate(), month: endDate.getMonth(), year: endDate.getFullYear()};
  if (from.year > to.year || from.month > to.month || from.day > to.day) {
    return {start: toISOString(endDate), end: toISOString(startDate)};
  }
  return {start: toISOString(startDate), end: toISOString(endDate)};
}
