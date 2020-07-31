import { Directive, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroupDirective } from '@angular/forms';

import { MillInput, CleanFunction } from '../component/input';

@Directive({
  selector: '[millInput="digit"][type="text"], [millInput="digit"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDigitDirective),
      multi: true
    }
  ]
})
export class InputDigitDirective extends MillInput implements ControlValueAccessor {

  constructor(
    renderer: Renderer2,
    inputElementRef: ElementRef,
    public parentForm: FormGroupDirective
  ) {
    super(inputElementRef.nativeElement, renderer, parentForm);
  }

  registerOnChange(fn: (v: string | number) => void): void {
    super.registerOnChange((value: string) => !!value ? fn(parseInt(value, 10)) : fn(value));
  }

  protected cleanFunction: CleanFunction = (inputValue: any): string =>  {

    inputValue = inputValue || inputValue === 0 ? String(inputValue) : '';

    return inputValue
      .replace(/(?!^)-/g, '')
      .replace(/^0+(\d+)/g, '$1')
      .replace(/[^0-9\-]/g, '');
  }
}
