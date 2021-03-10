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
import { BehaviorSubject } from 'rxjs';
import {
  CALENDAR_WEEKDAYS_UK,
  CalendarMonth,
  CalendarState,
  CalendarType,
  CalendarWeekday,
  rangeFormatter,
  toISOString,
  buildMonthsList,
  buildYearsList,
  buildCalendar,
  buildQuarter,
  isDateInRange,
  swapDates, DateRange, YEARS_SHIFT
} from '../../calendar.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mill-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CalendarComponent {
  private _selectedMonth: number;
  private _selectedYear: number;
  private _chosenDate: DateRange;
  private _showCalendar: boolean = false;

  // enums
  // tslint:disable-next-line:typedef
  calendarState = CalendarState;
  // tslint:disable-next-line:typedef
  calendarType = CalendarType;

  public calendarValue$: BehaviorSubject<DateRange> = new BehaviorSubject({start: ''});

  currentMonthCalendar: CalendarMonth[];
  days: string[] = CALENDAR_WEEKDAYS_UK;
  months: string[];
  years: number[];

  scrollToYear: boolean = false;

  @Input() type: CalendarType = CalendarType.Basic;
  @Input() state: CalendarState = CalendarState.Days;
  @Input() filter: Function;
  @Output() selectedDate: EventEmitter<DateRange> = new EventEmitter<DateRange>();


  constructor(private _cdr: ChangeDetectorRef,
              private _element: ElementRef) {
    this.months = buildMonthsList();
    this.years = buildYearsList();
  }

  get showCalendar(): boolean {
    return this._showCalendar;
  }

  set showCalendar(value: boolean) {
    this._showCalendar = value;
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

  get chosenDate(): DateRange {
    return this._chosenDate;
  }

  set chosenDate(value: DateRange) {
    this._chosenDate = value;
  }

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (target?.classList?.contains('icon_calendar')) {
      return;
    }

    if (!this._element?.nativeElement?.contains(target) &&
      !this._element?.nativeElement?.parentElement?.contains(target) && target.isConnected) {
      this.showCalendar = false;
    }
  }

  public toggle(): void {
    this.showCalendar = !this.showCalendar;
    this.onOpenCalendarClick(this.showCalendar);
    if (!this.showCalendar) {
      this.destroy();
    }
  }

  onInput(event: Event): void {
    this.calendarValue$.next({start: (event.target as HTMLInputElement).value});
  }

  onOpenCalendarClick(showCalendar: boolean): void {
    if (showCalendar) {
      this.setChosenDate();
      this.currentMonthCalendar = this.getMonthCalendar(this.valueMonth);
      if (this.type === CalendarType.Range && this.chosenDate?.end) {
        this.highlightRange();
        this._cdr.markForCheck();
      }
    }
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
    this.scrollToYear = true;
    if (CalendarState.Years === this.state) {
      this.restoreDaysView();
      return;
    }
    if (Math.abs(new Date().getFullYear() - this.valueYear) > YEARS_SHIFT) {
      this.years = buildYearsList(this.valueYear - YEARS_SHIFT, this.valueYear + YEARS_SHIFT);
      this._cdr.markForCheck();
    }
    this.state = CalendarState.Years;
    this._cdr.markForCheck();
    setTimeout(() => {
      this.scrollToYear = false;
      this._cdr.markForCheck();
    }, 500);
  }

  selectDate(weekday: CalendarWeekday, month: CalendarMonth): void {
    const date = new Date(this._selectedYear || month.year, month.month - 1, weekday.day);
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
          const swappedDates = swapDates(this.chosenDate.start, toISOString(date));
          this.chosenDate = {start: swappedDates.start, end: swappedDates.end};
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

  clear(): void {
    this.chosenDate = {start: '', end: ''};
    this.currentMonthCalendar = Object.assign([], this.getMonthCalendar(this.valueMonth));
    this.selectedDate.emit(this.chosenDate);
  }

  getFilterDate(month: number, date: number): Date {
    return new Date(this._selectedYear, month, date);
  }

  private getMonthCalendar(month: number, prev?: number): any[] {
    if (prev === 12 && month === 1) {
      this._selectedYear++;
    }

    if (prev === 1 && month === 12) {
      this._selectedYear--;
    }

    const months = buildCalendar(this._selectedYear);
    const currentMonthIdx = month - 1;
    let prevMonth;
    let nextMonth;
    if (month === 12) {
      const nextYearMonths = buildCalendar(this._selectedYear + 1);
      nextMonth = nextYearMonths[0];
    } else {
      nextMonth = months[currentMonthIdx + 1];
    }

    if (month === 1) {
      const prevYearMonths = buildCalendar(this._selectedYear - 1);
      prevMonth = prevYearMonths[prevYearMonths.length - 1];
    } else {
      prevMonth = months[currentMonthIdx - 1];
    }

    return buildQuarter([
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
    this.currentMonthCalendar.forEach(month => {
      this.markCellsInRange(month);
      this.markEdgeCellsInRange(month, startDay, 'start');
      this.markEdgeCellsInRange(month, endDay, 'end');
    });
  }

  private markCellsInRange(month: CalendarMonth): void {
    month.days.forEach(weekday => {
      if (this.isChosenDateInRange(month, weekday)) {
        weekday.highlight = 'in-range';
      }
    });
  }

  private markEdgeCellsInRange(month: CalendarMonth, edgeDay: number, highlighter: 'start' | 'end'): void {
    let checkedMonth, checkedYear;
    switch(highlighter) {
      case 'start':
        const start = new Date(this._chosenDate.start);
        checkedMonth = start.getMonth() + 1;
        checkedYear = start.getFullYear();
        break;
      case 'end':
        const end = new Date(this._chosenDate.end);
        checkedMonth = end.getMonth() + 1;
        checkedYear = end.getFullYear();
        break;
    }

    const foundDay = month.days.find(w => {
      if (!this.isChosenDateInRange(month, w)) {
        return false;
      }
      return w.day === edgeDay && month.month === checkedMonth && month.year === checkedYear;
    });
    if (foundDay) {
      foundDay.highlight = highlighter;
    }
  }

  private isChosenDateInRange(month: CalendarMonth, week: CalendarWeekday): boolean {
    const date = new Date(month.year, month?.month - 1, week.day);
    return isDateInRange(new Date(this._chosenDate.start), new Date(this._chosenDate.end), date);
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

  private destroy(): void {
    this.currentMonthCalendar = null;
  }
}
