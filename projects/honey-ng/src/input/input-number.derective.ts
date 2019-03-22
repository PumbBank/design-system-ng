import { HnInput, CleanFunction } from './hn-input';
import { Directive, Renderer2, ElementRef, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[hnInput="number"][type="text"], [hnInput="number"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberDirective),
      multi: true
    }
  ]
})
export class InputNumberDirective extends HnInput implements ControlValueAccessor {

  constructor(
    renderer: Renderer2,
    inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => fn(parseFloat(value)));
  }

  protected cleanFunction: CleanFunction = function (inputValue: any) {
    inputValue = inputValue ? String(inputValue) : '';
    return inputValue.replace(/^[\.\,]/g, '')
      .replace(/[\,]/g, '.')
      .replace(/(\.+\d{0,})(?:\.)/g, '$1')
      .replace(/[^0-9\.]/g, '');
  };
}
