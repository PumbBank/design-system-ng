import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MillSelectComponent } from './components/select/mill-select.component';
import { MillSelectWithoutOptionSourceDirective } from './directives/without-option-source/mill-select-without-option-source.directive';
import { MillSelectOptionDirective } from './directives/option/mill-select-option.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MillSelectComponent,
    MillSelectWithoutOptionSourceDirective,
    MillSelectOptionDirective
  ],
  exports: [
    MillSelectComponent,
    MillSelectWithoutOptionSourceDirective,
    MillSelectOptionDirective
  ]
})
export class MillSelectModule { }
