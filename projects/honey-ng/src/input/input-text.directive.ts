import { Directive, Renderer2, ElementRef, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HnInput, CleanFunction } from './hn-input';
import { createTextMaskInputElement, } from 'text-mask-core';

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
export class InputTextDirective extends HnInput implements ControlValueAccessor, OnInit {
  private textMaskInput: any;
  @Input() mask: Array<string | RegExp>;

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
    super.registerOnChange((value: string) => fn(value));
  }

  writeValue(value: string) {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = function (inputValue: string) {
    this.input.value = inputValue;
    this.textMaskInput.update();
    return this.input.value;
  };

}
