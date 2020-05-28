import { NgModule } from '@angular/core';
import { InputDigitDirective } from './directives/input-digit.directive';
import { InputTextDirective } from './directives/input-text.directive';
import { InputNumberDirective } from './directives/input-number.derective';
import { InputDateDirective } from './directives/input-date.directive';
import { InputMoneyDirective } from './directives/input-money.directive';
import { InputCardDirective } from "./directives/input-card.directive";
import { IconsModule } from '../2-icons';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective,
    InputDateDirective,
    InputMoneyDirective,
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
    InputCardDirective
  ]
})
export class InputModule { }
