import { NgModule } from '@angular/core';
import { InputDigitDirective } from './input-digit.directive';
import { InputTextDirective } from './input-text.directive';

@NgModule({
  declarations: [
    InputTextDirective,
    InputDigitDirective
  ],
  exports: [
    InputTextDirective,
    InputDigitDirective
  ]
})
export class InputModule { }
