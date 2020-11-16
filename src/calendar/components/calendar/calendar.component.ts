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
  CalendarWeekday
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

  public calendarValue$: BehaviorSubject<string> = new BehaviorSubject('');

  @Input() type: CalendarType = CalendarType.Basic;
  @Output() selectedDate: EventEmitter<string> = new EventEmitter<string>();

  state: CalendarState = CalendarState.Days;
  currentMonthCalendar: CalendarMonth[];

  // enums
  // tslint:disable-next-line:typedef
  calendarState = CalendarState;
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
        !this._element?.nativeElement?.parentElement?.contains(target)) {
      this.showCalendar = false;
    }
  }

  onInput(event: Event): void {
    this.calendarValue$.next((event.target as HTMLInputElement).value);
  }

  onOpenCalendarClick(showCalendar: boolean): void {
    if (!this._showCalendar) {
      this.state = CalendarState.Days;
      const selected = this.calendarValue$.getValue() && new Date(this.calendarValue$.getValue());
      if (selected) {
        this._selectedMonth = selected.getMonth() + 1;
        this._selectedYear = selected.getFullYear();
      } else {
        this._selectedMonth = new Date().getMonth() + 1;
        this._selectedYear = new Date().getFullYear();
      }
      this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth);
    }
    this._showCalendar = showCalendar;
    this._cdr.markForCheck();
  }

  onNextMonthClick(): void {
    const prevMonth = this._selectedMonth;
    this._selectedMonth = this._selectedMonth === 12 ? 1 : this._selectedMonth + 1;
    this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth, prevMonth);
    this._cdr.markForCheck();
  }

  onPrevMonthClick(): void {
    const prevMonth = this._selectedMonth;
    this._selectedMonth = this._selectedMonth === 1 ? 12 : this._selectedMonth - 1;
    this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth, prevMonth);
    this._cdr.markForCheck();
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

  selectDate(weekday: CalendarWeekday): void {
    const date = new Date(this._selectedYear, this._selectedMonth - 1, weekday.day);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.selectedDate.emit(`${year}-${month}-${day}T00:00:00.000Z`);
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

  highlightCurrentDay(day: number, month: CalendarMonth): boolean {
    const selected = new Date();
    return this.valueYear === selected?.getFullYear() &&
      month?.month === selected?.getMonth() + 1 &&
      day === selected?.getDate();
  }

  highlightSelectedDay(day: number, month: CalendarMonth): boolean {
    const selected = this.calendarValue$.getValue() && new Date(this.calendarValue$.getValue());
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
}
