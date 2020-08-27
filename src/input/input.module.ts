import { NgModule } from '@angular/core';
import { InputDigitDirective } from './directives/input-digit.directive';
import { InputTextDirective } from './directives/input-text.directive';
import { InputNumberDirective } from './directives/input-number.derective';
import { InputDateDirective } from './directives/input-date.directive';
import { InputMoneyDirective } from './directives/input-money.directive';
import { InputPhoneDirective } from './directives/input-phone.directive';
import { InputCardDirective } from './directives/input-card.directive';
import { IconsModule } from '../icons';
import { FormGroupDirective } from '@angular/forms';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective,
    InputCardDirective
  ],
  imports: [
    IconsModule
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective,
    InputCardDirective
  ],
  providers: [FormGroupDirective]
})
export class InputModule {
}
