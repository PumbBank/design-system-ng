import { Directive, forwardRef, Renderer2, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core';

import { MillInput, CleanFunction } from '../component/input';

type ISOString = string;

@Directive({
  selector: '[millInput="phone"][type="text"], [millInput="phone"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPhoneDirective),
      multi: true
    }
  ]
})
export class InputPhoneDirective extends MillInput implements ControlValueAccessor, OnInit {

  private textMaskInput: any;
  private mask: Array<string | RegExp> = ['+38', /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
  }

  ngOnInit() {
    this.textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: this.mask,
      keepCharPositions: true
    });
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => fn(this.ddmmyyyToISO(value)));
  }

  writeValue(value: ISOString) {
    super.writeValue(this.iSOToDdmmyy(value));
  }

  protected cleanFunction: CleanFunction = function(inputValue: ISOString) {
    this.input.value = inputValue;
    this.textMaskInput.update();
    return this.input.value;
  };


  private ddmmyyyToISO(ddmmyyyy: string): string {
    if (!ddmmyyyy) { return ''; }

    const [day, month, year] = ddmmyyyy.split('.');
    if (/\d{2}/.test(day) && /\d{2}/.test(month) && /\d{4}/.test(year)) {
      return `${year}-${month}-${day}T00:00:00.000Z`;
    } else {
      return '';
    }
  }

  private iSOToDdmmyy(iso: string): string {
    if (iso) {
      const [year, month, day] = iso.split('T')[0].split('-');
      return `${day}.${month}.${year}`;
    } else {
      return '';
    }
  }

}
