import { NgModule } from '@angular/core';
import { InputDigitDirective } from './input-digit.directive';
import { InputTextDirective } from './input-text.directive';
import { InputNumberDirective } from './input-number.derective';
import { InputDateDirective } from './input-date.directive';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective
  ]
})
export class InputModule { }
