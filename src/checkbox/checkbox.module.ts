import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxValueAccessorDirective } from './directives/checkbox-value-accessor.directive';

@NgModule({
  declarations: [
    CheckboxComponent,
    CheckboxValueAccessorDirective
  ],
  exports: [
    CheckboxComponent,
    CheckboxValueAccessorDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CheckboxModule { }
