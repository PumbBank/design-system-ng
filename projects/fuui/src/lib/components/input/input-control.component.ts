import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';
import { Component, forwardRef, Input } from "@angular/core";

@Component({
  selector: 'fuui-input-control',
  template: `
    <fuui-input
      [type]="type"
      [title]="title"
      [invalidHint]="invalidHint"
      [(value)]="inputValue"
      (focus)="onTouchedCallback()"
      (valueChange)="onChangeCallback($event)"
      ></fuui-input>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true
    }
  ]
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() type: string;
  @Input() title: string;

  invalidHint: boolean = false;
  inputValue: string = null;

  get value() {
    return this.inputValue;
  }

  validate(c: FormControl): null | ValidationErrors {
    return null;
  }

  writeValue(value: string) {
    this.inputValue = value;
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
