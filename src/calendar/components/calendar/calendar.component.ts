import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  CALENDAR_WEEKDAYS_UK,
  CalendarMonth,
  CalendarState,
  CalendarType,
  CalendarWeekday,
  rangeFormatter,
  toISOString
} from '../../calendar.model';

const YEARS_SHIFT = 50;

@Component({
  selector: 'mill-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  private _selectedMonth: number;
  private _selectedYear: number;
  private _chosenDate: {start: string, end?: string};

  public calendarValue$: BehaviorSubject<{start: string, end?: string}> = new BehaviorSubject({start: ''});

  @Input() type: CalendarType = CalendarType.Basic;
  @Output() selectedDate: EventEmitter<{start: string, end?: string}>
    = new EventEmitter<{start: string, end?: string}>();

  state: CalendarState = CalendarState.Days;
  currentMonthCalendar: CalendarMonth[];

  // enums
  // tslint:disable-next-line:typedef
  calendarState = CalendarState;
  // tslint:disable-next-line:typedef
  calendarType = CalendarType;
  days: string[] = CALENDAR_WEEKDAYS_UK;
  months: string[];
  years: number[];


  constructor(private _cdr: ChangeDetectorRef,
              private _element: ElementRef,
              public parentForm: FormGroupDirective) {
    this.months = CalendarComponent.buildMonthsList();
    this.years = CalendarComponent.buildYearsList();
  }

  private _showCalendar: boolean = false;

  get showCalendar(): boolean {
    return this._showCalendar;
  }

  set showCalendar(value: boolean) {
    this.onOpenCalendarClick(value);
  }

  get valueMonth(): number {
    return this._selectedMonth ?? new Date().getMonth() + 1;
  }

  get valueYear(): number {
    return this._selectedYear ?? new Date().getFullYear();
  }

  get valueMonthLocalized(): string {
    const month = this._selectedMonth ? this._selectedMonth - 1 : new Date().getMonth();
    return new Date(this.valueYear, month).toLocaleString('uk', {month: 'long'});
  }

  get today(): string {
    return toISOString(new Date());
  }

  set chosenDate(value: {start: string, end?: string}) {
    this._chosenDate = value;
  }

  get chosenDate(): {start: string, end?: string} {
    return this._chosenDate;
  }

  private static buildYearsList(start?: number, end?: number): number[] {
    const year = new Date().getFullYear();
    start = start ?? year - YEARS_SHIFT;
    end = end ?? year + YEARS_SHIFT;
    return Array.from(Array(end - start - 1), (_, i) => (i + start));
  }

  private static buildMonthsList(locale: string = 'uk', format: 'short' | 'long' = 'long'): string[] {
    const result = [];
    const year = new Date().getFullYear();
    for (let month = 0; month < 12; month++) {
      result.push(new Date(year, month).toLocaleString(locale, {month: format}));
    }
    return result;
  }

  private static buildCalendar(year: number,
                               locale: string = 'uk',
                               format: 'short' | 'long' = 'short'): CalendarMonth[] {
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

  private static buildQuarter(months: CalendarMonth[]): CalendarMonth[] {
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

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (!this._element?.nativeElement?.contains(target) &&
        !this._element?.nativeElement?.parentElement?.contains(target) && target.isConnected) {
      this.showCalendar = false;
    }
  }

  onInput(event: Event): void {
    this.calendarValue$.next({start: (event.target as HTMLInputElement).value});
  }

  onOpenCalendarClick(showCalendar: boolean): void {
    if (!this._showCalendar) {
      this.state = CalendarState.Days;
      this.setChosenDate();
      this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth);
      if (this.type === CalendarType.Range && this.chosenDate?.end) {
        this.highlightRange();
        this._cdr.markForCheck();
      }
    }
    this._showCalendar = showCalendar;
    this._cdr.markForCheck();
  }

  onNextMonthClick(): void {
    this.goToMonth('next');
  }

  onPrevMonthClick(): void {
    this.goToMonth('prev');
  }

  getRangeFormatter(): string {
    if (!this.chosenDate || !this.chosenDate?.end) {
      return;
    }
    return rangeFormatter(new Date(this.chosenDate.start), new Date(this.chosenDate.end));
  }

  changeMonth(): void {
    if (CalendarState.Months === this.state) {
      this.restoreDaysView();
      return;
    }
    this.state = CalendarState.Months;
    this._cdr.markForCheck();
  }

  changeYear(): void {
    if (CalendarState.Years === this.state) {
      this.restoreDaysView();
      return;
    }
    if (Math.abs(new Date().getFullYear() - this.valueYear) > YEARS_SHIFT) {
      this.years = CalendarComponent.buildYearsList(this.valueYear - YEARS_SHIFT, this.valueYear + YEARS_SHIFT);
      this._cdr.markForCheck();
    }
    this.state = CalendarState.Years;
    this._cdr.markForCheck();
  }

  selectDate(weekday: CalendarWeekday, month: CalendarMonth): void {
    const date = new Date(month.year, month.month - 1, weekday.day);
    switch (this.type) {
      case CalendarType.Basic:
        this.chosenDate = {start: toISOString(date)};
        this.selectDateConfirm();
        break;
      case CalendarType.WithButton:
        this.chosenDate = {start: toISOString(date)};
        break;
      case CalendarType.Range:
        if (this.chosenDate.start && this.chosenDate.end) {
          return;
        }

        if (this.chosenDate?.start) {
          weekday.highlight = 'end';
          if (this.chosenDate.end) {
            this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth);
          }
          this.chosenDate = {start: this.chosenDate.start, end: toISOString(date)};
          this.highlightRange();
        } else {
          weekday.highlight = 'start';
          this.chosenDate = {start: toISOString(date)};
        }
        break;
    }
  }

  selectDateConfirm(): void {
    this.selectedDate.emit(this.chosenDate);
    this.showCalendar = false;
    this._cdr.markForCheck();
  }

  selectMonth(monthIdx: number): void {
    this._selectedMonth = monthIdx + 1;
    this.restoreDaysView();
  }

  selectYear(year: number): void {
    this._selectedYear = year;
    this.restoreDaysView();
  }

  highlightCurrentDay(weekday: CalendarWeekday, month: CalendarMonth): boolean {
    if (weekday.highlight) {
      return;
    }
    const day = weekday.day;
    const selected = new Date();
    return this.valueYear === selected?.getFullYear() &&
      month?.month === selected?.getMonth() + 1 &&
      day === selected?.getDate();
  }

  highlightSelectedDay(day: number, month: CalendarMonth): boolean {
    if (this.type === CalendarType.Range) {
      return false;
    }
    const selected = this.chosenDate?.start && new Date(this.chosenDate.start);
    if (!selected) {
      return;
    }
    return this.valueYear === selected?.getFullYear() &&
      month?.month === selected?.getMonth() + 1 &&
      day === selected?.getDate();
  }

  restoreDaysView(): void {
    this.state = CalendarState.Days;
    this._cdr.markForCheck();
  }

  public toggle(): void {
    this.onOpenCalendarClick(!this._showCalendar);
  }

  clear(): void {
    this.chosenDate = {start: '', end: ''};
    this.currentMonthCalendar = Object.assign([], this.getMonthCalendar(this.valueMonth));
    this.selectedDate.emit(this.chosenDate);
  }

  private getMonthCalendar(month: number, prev?: number): any[] {
    if (prev === 12 && month === 1) {
      this._selectedYear++;
    }

    if (prev === 1 && month === 12) {
      this._selectedYear--;
    }

    const months = CalendarComponent.buildCalendar(this._selectedYear);
    const currentMonthIdx = month - 1;
    let prevMonth;
    let nextMonth;
    if (month === 12) {
      const nextYearMonths = CalendarComponent.buildCalendar(this._selectedYear + 1);
      nextMonth = nextYearMonths[0];
    } else {
      nextMonth = months[currentMonthIdx + 1];
    }

    if (month === 1) {
      const prevYearMonths = CalendarComponent.buildCalendar(this._selectedYear - 1);
      prevMonth = prevYearMonths[prevYearMonths.length - 1];
    } else {
      prevMonth = months[currentMonthIdx - 1];
    }

    return CalendarComponent.buildQuarter([
      prevMonth,
      months[currentMonthIdx],
      nextMonth
    ]);
  }

  private highlightRange(): void {
    const dates = this.chosenDate;
    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;
    const months = this.currentMonthCalendar;
    const startIdx = months.findIndex(f => f.month === startMonth);
    const endIdx = months.findIndex(f => f.month === endMonth);

    if (startIdx === -1 && endIdx === -1) {
      months.forEach(m => m.days.forEach(w => w.highlight = 'in-range'));
      return;
    }
    if (startIdx !== endIdx) {
      const _startIdx = startIdx === -1 ? 0 : startIdx;
      const _endIdx = endIdx === -1 ? months.length - 1 : endIdx;
      if (startIdx === -1) {
        months.forEach((v: CalendarMonth, i: number) => {
          if (i === _endIdx) {
            if (v?.month === endMonth) {
              (v.days.find(w => w.day === endDay) || {highlight: ''}).highlight = 'end';
              v.days.filter(w => w.day < endDay).forEach(w => w.highlight = 'in-range');
            }
          }
          if (i < _endIdx) {
            v.days.forEach(w => w.highlight = 'in-range');
          }
        });
        return;
      }
      if (endIdx === -1) {
        months.forEach((v: CalendarMonth, i: number) => {
          if (i === _startIdx) {
            if (v?.month === startMonth) {
              (v.days.find(w => w.day === startDay) || {highlight: ''}).highlight = 'start';
              v.days.filter(w => w.day > startDay).forEach(w => w.highlight = 'in-range');
            }
          }
          if (i > _startIdx) {
            v.days.forEach(w => w.highlight = 'in-range');
          }
        });
        return;
      }

      for (let idx = _startIdx; idx <= _endIdx; idx++) {
        const current = months[idx];
        if (current?.month === startMonth) {
          (current.days.find(w => w.day === startDay) || {highlight: ''}).highlight = 'start';
          current.days.filter(w => w.day > startDay).forEach(w => w.highlight = 'in-range');
        }
        if (current?.month > startMonth || current?.month < endMonth) {
          current.days.forEach(w => w.highlight = 'in-range');
        }
        if (current?.month === endMonth) {
          (current.days.find(w => w.day === endDay) || {highlight: ''}).highlight = 'end';
          current.days.filter(w => w.day < endDay).forEach(w => w.highlight = 'in-range');
        }
      }
    } else {
      const monthIdx = startIdx > -1 ? startIdx : endIdx;
      months[monthIdx].days.forEach(weekday => {
        if (weekday.day < startDay || weekday.day > endDay) {
          return;
        }
        weekday.highlight = weekday.day === startDay ? 'start' : weekday.highlight;
        weekday.highlight = weekday.day === endDay ? 'end' : weekday.highlight;
        if (weekday.day > startDay && weekday.day < endDay) {
          weekday.highlight = 'in-range';
        }
      });
    }
  }

  private setChosenDate(): void {
    const selectedISO = this.calendarValue$.getValue();
    const selected = selectedISO && new Date(selectedISO.start);
    if (selectedISO?.start) {
      this.chosenDate = {start: selectedISO.start, end: selectedISO.end};
      this._selectedMonth = selected.getMonth() + 1;
      this._selectedYear = selected.getFullYear();
    } else {
      this.chosenDate = {start: '', end: ''};
      this._selectedMonth = new Date().getMonth() + 1;
      this._selectedYear = new Date().getFullYear();
    }
  }

  private goToMonth(direction: 'prev' | 'next'): void {
    const prevMonth = this._selectedMonth;
    switch (direction) {
      case 'next':
        this._selectedMonth = this._selectedMonth === 12 ? 1 : this._selectedMonth + 1;
        break;
      case 'prev':
        this._selectedMonth = this._selectedMonth === 1 ? 12 : this._selectedMonth - 1;
        break;
    }
    this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth, prevMonth);
    if (this.type === CalendarType.Range && this.chosenDate?.end) {
      this.highlightRange();
    }
    this._cdr.markForCheck();
  }
}
