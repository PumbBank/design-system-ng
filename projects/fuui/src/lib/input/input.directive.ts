import { FuuiInput } from './fuui-input';
import { Directive, Renderer2, ElementRef, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[fuuiInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
      multi: true
    }
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => InputDirective),
    //   multi: true
    // }
  ]
})
export class InputDirective implements ControlValueAccessor, OnInit {
  internalValue: string;
  control: NgControl;
  fuuiInput: FuuiInput;

  get value(): string {
    return this.internalValue;
  }

  constructor(
    private renderer: Renderer2,
    private inputElementRef: ElementRef,
    private injector: Injector,
  ) { }

  ngOnInit() {
    this.control = this.injector.get(NgControl);
    this.fuuiInput = new FuuiInput(this.inputElementRef.nativeElement, this.renderer);

    console.log(this.control);
  }

  writeValue(value: string) {
    this.fuuiInput.writeValue(value);
  }

  registerOnChange(fn: Function) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }

  onChangeCallback: Function = () => { };
  onTouchedCallback: Function = () => { };
}
