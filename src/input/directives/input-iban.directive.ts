import { CleanFunction, MillInput } from '../component/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective} from '@angular/forms';
import { Directive, ElementRef, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

@Directive({
  selector: '[millInput="iban"][type="text"], [millInput="iban"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputIbanDirective),
      multi: true
    }
  ]
})
export class InputIbanDirective extends MillInput implements ControlValueAccessor, OnInit {
  private _textMaskInput: any;
  private _host: any;

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef,
    public parentForm: FormGroupDirective
  ) {
    super(inputElementRef.nativeElement, renderer, parentForm);
    super.setBodyMinWidth('240px');
    this._host = inputElementRef.nativeElement;
  }

  private static cleanMask(maskedValue: string): string {
    const value = maskedValue.replace(/[-+()\s]/g, '');
    return value;
  }

// UA21 3223 1300 0002 6007 2335 6600 1
  ngOnInit(): void {
    this._textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: [/[A-Z]/, /[A-Z]/,' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      keepCharPositions: true,
      guide: false
    });
  }

  registerOnChange(fn: any): void {
    super.registerOnChange((value: string) => fn(InputIbanDirective.cleanMask(value)));
  }

  writeValue(value: string): void {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = function(inputValue: string): string {
    this.input.value = inputValue;
    this._textMaskInput.update();
    return this.input.value;
  };
}
