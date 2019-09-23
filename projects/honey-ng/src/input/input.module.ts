import { NgModule } from '@angular/core';
import { InputDigitDirective } from './input-digit.directive';
import { InputTextDirective } from './input-text.directive';
import { InputNumberDirective } from './input-number.derective';
import { InputDateDirective } from './input-date.directive';
import { InputMoneyDirective } from './input-money.directive';
import { InputPhoneDirective } from './input-phone.directive';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective
  ]
})
export class InputModule { }
