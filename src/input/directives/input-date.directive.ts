import { Directive, forwardRef, Renderer2, ElementRef, OnInit } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormGroupDirective
} from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core';

import { MillInput, CleanFunction } from '..';

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
export class InputDateDirective extends MillInput implements ControlValueAccessor, OnInit, Validator {

  private textMaskInput: any;
  private mask: Array<string | RegExp> = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef,
    public parentForm: FormGroupDirective
  ) {
    super(inputElementRef.nativeElement, renderer, parentForm);
    renderer.setStyle(this.wrapperElement, 'minWidth', '124px');
  }

  ngOnInit(): void {
    this.textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: this.mask,
      keepCharPositions: true,
      guide: false
    });
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
    super.registerOnChange((value: string) => fn(this.ddmmyyyToISO(value)));
  }

  writeValue(value: ISOString): void {
    super.writeValue(this.iSOToDdmmyy(value));
  }

  protected cleanFunction: CleanFunction = function(inputValue: ISOString): string {
    this.input.value = inputValue;
    this.textMaskInput.update();
    return this.input.value;
  };


  private ddmmyyyToISO(ddmmyyyy: string): string {
    if (!ddmmyyyy) { return ''; }

    const [day, month, year]: string[] = ddmmyyyy.split('.');
    if (/\d{2}/.test(day) && /\d{2}/.test(month) && /\d{4}/.test(year)) {
      return `${year}-${month}-${day}T00:00:00.000Z`;
    } else {
      return '';
    }
  }

  private iSOToDdmmyy(iso: string): string {
    if (iso) {
      const [year, month, day]: string[] = iso.split('T')[0].split('-');
      return `${day}.${month}.${year}`;
    } else {
      return '';
    }
  }

}
