import { MillInput } from '../component/input';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Directive, ElementRef, forwardRef, OnInit, Renderer2 } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { CleanFunction } from '..';

const VISA_LOGO = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAzMCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0xOC4yNDk5IDE3LjQ3NzVIMTEuNzYwNVY1LjYwODY0SDE4LjI0OTlWMTcuNDc3NVoiIGZpbGw9IiNGRjVGMDAiLz4KPHBhdGggZD0iTTEyLjE2NyAxMS41QzEyLjE2NyA5LjEwNzc2IDEzLjI3NDcgNi45NzY4MyAxNC45OTk3IDUuNjAzNTdDMTMuNzM4MyA0LjU5OTM3IDEyLjE0NjMgNCAxMC40MTYxIDRDNi4zMjAyMiA0IDMgNy4zNTc4MSAzIDExLjVDMyAxNS42NDIyIDYuMzIwMjIgMTkgMTAuNDE2MSAxOUMxMi4xNDYzIDE5IDEzLjczODMgMTguNDAwNiAxNC45OTk3IDE3LjM5NjRDMTMuMjc0NyAxNi4wMjMyIDEyLjE2NyAxMy44OTIyIDEyLjE2NyAxMS41WiIgZmlsbD0iI0VCMDAxQiIvPgo8cGF0aCBkPSJNMjcuMDAwMSAxMS41QzI3LjAwMDEgMTUuNjQyMiAyMy42Nzk5IDE5IDE5LjU4NCAxOUMxNy44NTM5IDE5IDE2LjI2MTkgMTguNDAwNiAxNSAxNy4zOTY0QzE2LjcyNTQgMTYuMDIzMiAxNy44MzMxIDEzLjg5MjIgMTcuODMzMSAxMS41QzE3LjgzMzEgOS4xMDc3NiAxNi43MjU0IDYuOTc2ODMgMTUgNS42MDM1N0MxNi4yNjE5IDQuNTk5MzcgMTcuODUzOSA0IDE5LjU4NCA0QzIzLjY3OTkgNCAyNy4wMDAxIDcuMzU3ODEgMjcuMDAwMSAxMS41WiIgZmlsbD0iI0Y3OUUxQiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";

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

  validate(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
  }

  registerOnChange(fn: Function) {
    super.registerOnChange(this.onChange);
  }

  writeValue(value: string) {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = function (inputValue: string) {
    this.input.value = inputValue;
    this._textMaskInput.update();
    return this.input.value;
  };

  private onChange(value: string) {
    if (!value) {
      super.replaceIconToImage();
      return;
    }
    if (value[0] === '4') {
      super.replaceIconToImage('assets/images/visa_logo.svg');
    }

    if (value[0] === '5') {
      super.replaceIconToImage('assets/images/mc_logo.svg');
    }
  }

}
