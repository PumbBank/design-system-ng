import {
  Directive,
  forwardRef,
  Renderer2,
  ElementRef,
  OnInit,
  ComponentRef,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createTextMaskInputElement } from 'text-mask-core';

import { MillInput, CleanFunction } from '..';
import { CalendarComponent, CalendarType } from '../../calendar';
import { DomService } from '../../autocomplete/services/dom.service';

type ISOString = string;

@Directive({
  selector: '[millInput="date"][type="text"], [millInput="date"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateDirective),
      multi: true
    }
  ]
})
export class InputDateDirective
  extends MillInput
  implements ControlValueAccessor, OnInit, OnChanges, Validator, OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();
  private _textMaskInput: any;
  private _mask: Array<string | RegExp> = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  private _calendarComponentRef: ComponentRef<CalendarComponent>;

  @Input() calendarType: CalendarType;

  private static dateToISO(date: string): string {
    if (!date) { return ''; }

    const [day, month, year]: string[] = date.split('.');
    if (/\d{2}/.test(day) && /\d{2}/.test(month) && /\d{4}/.test(year)) {
      return `${year}-${month}-${day}T00:00:00.000Z`;
    } else {
      return '';
    }
  }
  private static ISOToDate(iso: string): string {
    if (iso) {
      const [year, month, day]: string[] = iso.split('T')[0].split('-');
      return `${day}.${month}.${year}`;
    } else {
      return '';
    }
  }

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _parentForm: FormGroupDirective,
    private _domService: DomService
  ) {
    super(_elementRef.nativeElement, _renderer, _parentForm);
    _renderer.setStyle(this.wrapperElement, 'minWidth', '124px');
    this.registerOnUpdateIcon();
  }

  ngOnInit(): void {
    this._textMaskInput = createTextMaskInputElement({
      inputElement: this._elementRef.nativeElement,
      mask: this._mask,
      keepCharPositions: true,
      guide: false
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.calendarType?.previousValue && changes.calendarType?.currentValue) {
      this._calendarComponentRef.instance.type = changes.calendarType?.currentValue;
    }
    super.ngOnChanges(changes);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    super.ngOnDestroy();
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }

    const message = 'Невірний фортмат дати';

    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(control.value.split('T')[0])) {
      return { errorMessage: message };
    }


    // Parse the date parts to integers
    const parts = control.value.split('T')[0].split('-');
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
      return { errorMessage: message };
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1] ? null : { errorMessage: message };
  }

  registerOnChange(fn: (s: string) => void): void {
    super.registerOnChange((value: string) => fn(InputDateDirective.dateToISO(value)));
  }

  registerOnUpdateIcon(): void {
    super.onUpdateIconCallback = () => {
      this.addCalendar(this.wrapperElement);
      this.iconClick.pipe(takeUntil(this._destroyed$)).subscribe(() => this.iconClickListener());
    };
  }

  writeValue(value: ISOString): void {
    super.writeValue(InputDateDirective.ISOToDate(value));
  }

  protected cleanFunction: CleanFunction = function(inputValue: ISOString): string {
    this.input.value = inputValue;
    this._textMaskInput?.update();
    this._calendarComponentRef?.instance?.calendarValue$.next(InputDateDirective.dateToISO(this.input.value));
    return this.input.value;
  };

  private addCalendar(wrapperElement: HTMLElement): void {
    this._calendarComponentRef = this._domService
      .createComponent<CalendarComponent>(CalendarComponent, {type: this.calendarType});
    if (this._calendarComponentRef) {
      this._domService.attachComponent(this._calendarComponentRef, wrapperElement);
      this._calendarComponentRef?.instance?.selectedDate
        .pipe(takeUntil(this._destroyed$))
        .subscribe((value: string) => this.writeValue(value));
    }
  }

  private iconClickListener(): void {
    this._calendarComponentRef.instance.toggle();
  }

}
