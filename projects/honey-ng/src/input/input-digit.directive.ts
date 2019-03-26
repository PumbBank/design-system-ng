import { HnInput, CleanFunction } from './hn-input';
import { Directive, Renderer2, ElementRef, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[hnInput="digit"][type="text"], [hnInput="digit"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDigitDirective),
      multi: true
    }
  ]
})
export class InputDigitDirective extends HnInput implements ControlValueAccessor {

  constructor(
    renderer: Renderer2,
    inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => fn(parseInt(value, 10)));
  }

  protected cleanFunction: CleanFunction = function (inputValue: any) {
    const inputValueStr = String(inputValue);
    const parsed = parseInt(inputValue, 10);

    if (inputValueStr === '-') { return inputValueStr; }

    return !Number.isInteger(parsed) ? '' : parsed.toString();
  };
}
