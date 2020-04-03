import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxValueAccessorDirective } from './directives/checkbox-value-accessor.directive';
import { CheckboxOverviewComponent } from './examples/checkbox-page.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    CheckboxValueAccessorDirective,
    CheckboxOverviewComponent
  ],
  exports: [
    CheckboxComponent,
    CheckboxValueAccessorDirective,
    CheckboxOverviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CheckboxModule { }
