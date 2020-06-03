import { NgModule } from '@angular/core';
import { InputDigitDirective } from './directives/input-digit.directive';
import { InputTextDirective } from './directives/input-text.directive';
import { InputNumberDirective } from './directives/input-number.derective';
import { InputDateDirective } from './directives/input-date.directive';
import { InputMoneyDirective } from './directives/input-money.directive';
import { InputPhoneDirective } from './directives/input-phone.directive';

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
