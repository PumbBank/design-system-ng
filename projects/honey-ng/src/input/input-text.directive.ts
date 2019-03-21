import { HnInput } from './hn-input';
import { Directive, Renderer2, ElementRef, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[hnInput="text"][type="text"], [hnInput="text"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextDirective),
      multi: true
    }
  ]
})
export class InputTextDirective implements ControlValueAccessor, OnInit {
  hnInput: HnInput;

  get value(): string {
    return this.hnInput.value.value;
  }

  constructor(
    private renderer: Renderer2,
    private inputElementRef: ElementRef
  ) { }

  ngOnInit() {
    this.hnInput = new HnInput(this.inputElementRef.nativeElement, this.renderer);
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
}
