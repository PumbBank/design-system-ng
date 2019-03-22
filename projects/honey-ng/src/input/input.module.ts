import { NgModule } from '@angular/core';
import { InputDigitDirective } from './input-digit.directive';
import { InputTextDirective } from './input-text.directive';
import { InputNumberDirective } from './input-number.derective';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective,
    InputNumberDirective
  ]
})
export class InputModule { }
