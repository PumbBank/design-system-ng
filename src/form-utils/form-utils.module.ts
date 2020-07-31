import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirtyValidatorDirective } from './directives/dirty-validator.directive';



@NgModule({
  declarations: [DirtyValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [DirtyValidatorDirective]
})
export class FormUtilsModule { }
