import { Directive, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { MillInput, CleanFunction } from '../component/input';

@Directive({
  selector: '[millInput="number"][type="text"], [millInput="number"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberDirective),
      multi: true
    }
  ]
})
export class InputNumberDirective extends MillInput implements ControlValueAccessor {

  constructor(
    renderer: Renderer2,
    inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => !!value ? fn(parseFloat(value)) : fn(value));
  }

  protected cleanFunction: CleanFunction = function(inputValue: any) {

    inputValue = inputValue || inputValue === 0 ? String(inputValue) : '';

    return inputValue.replace(/^(-{0,1})[\.\,]/g, '$1')
      .replace(/(?!^)-/g, '')
      .replace(/[\,]/g, '.')
      .replace(/(\.+\d{0,})(?:\.)/g, '$1')
      .replace(/[^0-9\.-]/g, '');

  };
}
