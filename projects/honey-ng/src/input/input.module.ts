import { NgModule } from '@angular/core';
import { InputTextDirective } from './input-text.directive';

@NgModule({
  declarations: [
    InputTextDirective
  ],
  exports: [
    InputTextDirective
  ]
})
export class InputModule { }
