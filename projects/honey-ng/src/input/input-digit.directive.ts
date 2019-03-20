import { HnInput, CleanFunction } from './hn-input';
import { Directive, Renderer2, ElementRef, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[hnInput="digit"][type="text"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDigitDirective),
      multi: true
    }
  ]
})
export class InputDigitDirective implements ControlValueAccessor, OnInit {


  hnInput: HnInput;

  get value(): string {
    return this.hnInput.value.value;
  }

  constructor(
    private renderer: Renderer2,
    private inputElementRef: ElementRef
  ) { }

  ngOnInit() {
    this.hnInput = new HnInput(this.inputElementRef.nativeElement, this.renderer, this.cleanFunction);
  }

  writeValue(value: string) {
    this.hnInput.writeValue(value);
  }

  registerOnChange(fn: Function) {
    this.hnInput.registerOnChange(fn);
  }

  registerOnTouched(fn: Function) {
    this.hnInput.registerOnTouched(fn);
  }

  private cleanFunction: CleanFunction = (inputValue: string): string => inputValue.replace(/[^0-9]/g, '');

}
