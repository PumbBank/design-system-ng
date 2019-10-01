import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MillSelectWithoutOptionSourceDirective } from './mill-select-without-option-source.directive';
import { MillSelectComponent } from './components/select/mill-select.component';
import { MillSelectOptionComponent } from './components/option/mill-select-option.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MillSelectComponent,
    MillSelectWithoutOptionSourceDirective,
    MillSelectOptionComponent
  ],
  exports: [
    MillSelectComponent,
    MillSelectWithoutOptionSourceDirective,
    MillSelectOptionComponent
  ]
})
export class MillSelectModule { }
