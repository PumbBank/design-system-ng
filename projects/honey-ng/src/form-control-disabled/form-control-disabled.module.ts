import { NgModule } from '@angular/core';
import { FormControlDisabledDirective } from './directives/form-control-disabled.directive';

@NgModule({
  declarations: [FormControlDisabledDirective],
  exports: [FormControlDisabledDirective]
})
export class FormControlDisabledModule { }
