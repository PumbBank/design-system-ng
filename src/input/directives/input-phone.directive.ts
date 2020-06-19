import { CleanFunction, MillInput } from '..';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

const UA_PHONE_CODE = '+380';
const PHONE_MASK = (input) => {
  const numbers = input.match(/\d/g);
  const numberLength = numbers ? numbers.join('').length : 0;
  const coreMask = ['+', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  if (numberLength >= 15) {
    return [...coreMask, /\d/, /\d/, /\d/, /\d/];
  } else if (numberLength === 14) {
    return [...coreMask, /\d/, /\d/, /\d/];
  } else if (numberLength === 13) {
    return [...coreMask, /\d/, /\d/];
  } else if (numberLength === 12) {
    return [...coreMask, /\d/];
  }
  return coreMask;
};
const COMBO_PHONE_MASK = (input) => {
  input = input.replace(/[^0-9]/g, '');
  if (input.slice(0, 3) === '380') {
    return ['+', /\d/, /\d/, /\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  } else {
    return PHONE_MASK(input);
  }
};

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
  private static cleanMask(maskedValue: string) {
    return maskedValue.replace(/[-+()\s]/g, '');
  }

  private _textMaskInput: any;
  private _host: any;

  @HostListener('focus') setUkrainianCode() {
    if (typeof this._host.value === 'undefined' || this._host.value === '') {
      this._host.value = UA_PHONE_CODE;
    }
  }

  @HostListener('blur') clearUkrainianCode() {
    if (this._host.value === UA_PHONE_CODE) {
      this._host.value = '';
    }
  }

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
    this._host = inputElementRef.nativeElement;
  }

  ngOnInit() {
    this._textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: COMBO_PHONE_MASK,
      keepCharPositions: false
    });
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => fn(InputPhoneDirective.cleanMask(value)));
  }

  writeValue(value: string) {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = function(inputValue: string) {
    this.input.value = inputValue;
    this._textMaskInput.update();
    return this.input.value;
  };

}
