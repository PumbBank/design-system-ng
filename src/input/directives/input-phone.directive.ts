import { CleanFunction, MillInput } from '../component/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

const UA_PHONE_CODE = '+380';

@Directive({
  selector: '[millInput="phone"][type="tel"], [millInput="phone"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPhoneDirective),
      multi: true
    }
  ]
})
export class InputPhoneDirective extends MillInput implements ControlValueAccessor, OnInit {
  private _textMaskInput: any;
  private _host: any;

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
    this._host = inputElementRef.nativeElement;
  }

  private static cleanMask(maskedValue: string): string {
    return maskedValue.replace(/[-+()\s]/g, '');
  }

  @HostListener('focus') setUkrainianCode(): void {
    if (typeof this._host.value === 'undefined' || this._host.value === '') {
      this._host.value = UA_PHONE_CODE+ ' (';
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this._host.value === UA_PHONE_CODE && event.code === 'Backspace') {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this._textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: ['+', /\d/, /\d/, /\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
      keepCharPositions: true,
      guide: false
    });
  }

  registerOnChange(fn: any): void {
    super.registerOnChange((value: string) => fn(InputPhoneDirective.cleanMask(value)));
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
