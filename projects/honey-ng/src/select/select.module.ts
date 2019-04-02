import { NgModule } from '@angular/core';
import { SelectComponent } from './components/select/select.component';
import { SelectHeaderComponent } from './components/select-header/select-header.component';
import { SelectBodyComponent } from './components/select-body/select-body.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './components/select/select-clickoutside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectComponent,
    SelectHeaderComponent,
    SelectBodyComponent,
    SelectOptionComponent,
    ClickOutsideDirective
  ],
  exports: [
    SelectComponent,
    SelectHeaderComponent,
    SelectBodyComponent,
    SelectOptionComponent,
    ClickOutsideDirective
  ]
})
export class SelectModule { }
