import { NgModule } from '@angular/core';
import { InputDigitDirective } from './input-digit.directive';
import { InputTextDirective } from './input-text.directive';
import { InputNumberDirective } from './input-number.derective';
import { InputDateDirective } from './input-date.directive';
import { InputMoneyDirective } from './input-money.directive';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective
  ]
})
export class InputModule { }
