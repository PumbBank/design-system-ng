import { NgModule } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputDigitDirective } from './directives/input-digit.directive';
import { InputTextDirective } from './directives/input-text.directive';
import { InputNumberDirective } from './directives/input-number.derective';
import { InputDateDirective } from './directives/input-date.directive';
import { InputMoneyDirective } from './directives/input-money.directive';
import { InputPhoneDirective } from './directives/input-phone.directive';
import { InputCardDirective } from './directives/input-card.directive';
import { IconsModule } from '../icons';
import { InputIbanDirective } from './directives/input-iban.directive';
import { DomService } from 'src/autocomplete/services/dom.service';
import { CalendarModule } from '../calendar';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective,
    InputCardDirective,
    InputIbanDirective,
  ],
  imports: [
    IconsModule,
    CalendarModule
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
    InputPhoneDirective,
    InputCardDirective,
    InputIbanDirective,
  ],
  providers: [FormGroupDirective, DomService]
})
export class InputModule {
}
