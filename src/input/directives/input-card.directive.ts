import { MillInput } from '../component/input';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator,
} from '@angular/forms';
import { Directive, ElementRef, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { CleanFunction } from '..';

enum PaymentSystem {
  Visa,
  Master,
  Maestro
}

@Directive({
  selector: '[millInput="card"][type="text"], [millInput="card"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCardDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputCardDirective),
      multi: true
    }
  ]
})
export class InputCardDirective extends MillInput implements ControlValueAccessor, OnInit, Validator {
  private static getCardType(value: string): PaymentSystem {
    const cardBin = value.substr(0, 6);

    if (cardBin[0] === '4') {
      return PaymentSystem.Visa;
    }

    const firstFour = parseInt(cardBin.substr(0, 4), 10);
    const firstTwo = parseInt(cardBin.substr(0, 2), 10);
    if ((firstFour >= 2221 && firstFour <= 2720) || (firstTwo >= 51 && firstTwo <=55)) {
      return PaymentSystem.Master;
    }
    if (firstTwo === 50 || firstTwo.toString()[0] === '6' || (firstTwo >= 56 && firstTwo <=58)) {
      return PaymentSystem.Maestro;
    }
  }

  private _textMaskInput: any;
  private _mask: Array<string | RegExp> = [/\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/
  ];

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef
  ) {
    super(inputElementRef.nativeElement, renderer);
  }

  ngOnInit() {
    this._textMaskInput = createTextMaskInputElement({
      inputElement: this.inputElementRef.nativeElement,
      mask: this._mask,
      keepCharPositions: true
    });
  }

  registerOnChange(fn: Function) {
    super.registerOnChange((value: string) => fn(this.onChange(value)));
  }

  writeValue(value: string) {
    super.writeValue(value);
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }

    const message = 'Невірний формат';

    if (/^\d{16}$/.test(control.value)) {
      return null;
    } else {
      return { errorMessage: message };
    }
  }

  protected cleanFunction: CleanFunction = function (inputValue: string) {
    this.input.value = inputValue;
    this._textMaskInput.update();
    return this.input.value;
  };

  private onChange(value: string) {
    if (!value) {
      super.replaceIconToImage('');
    }
    value = value.replace(/\s/g, '');
    if (InputCardDirective.getCardType(value) === PaymentSystem.Visa) {
      super.replaceIconToImage('assets/images/visa_logo.svg', '36px');
    } else if ([PaymentSystem.Master, PaymentSystem.Maestro].indexOf(InputCardDirective.getCardType(value)) > -1) {
      super.replaceIconToImage('assets/images/mc_logo.svg', '36px');
    } else {
      super.replaceIconToImage('');
    }
    return value;
  }

}
