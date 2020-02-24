import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectComponent } from './components/select/select.component';
import { SelectWithoutOptionSourceDirective } from './directives/without-option-source/select-without-option-source.directive';
import { SelectOptionDirective } from './directives/option/select-option.directive';
import { SelectValueAccessorDirective } from './directives/select-value-accessor/select-value-accessor.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective
  ],
  exports: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective
  ]
})
export class SelectModule { }
