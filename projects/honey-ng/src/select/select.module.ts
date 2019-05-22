import { NgModule } from '@angular/core';
import { SelectComponent } from './components/select/select.component';
import { SelectHeaderComponent } from './components/select-header/select-header.component';
import { SelectBodyComponent } from './components/select-body/select-body.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './components/select/select-clickoutside.directive';
import { SelectBodyFilterComponent } from './components/select-body-filter/select-body-filter.component';
import { InputModule } from '../input/input.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ReactiveFormsModule
  ],
  declarations: [
    SelectComponent,
    SelectHeaderComponent,
    SelectBodyComponent,
    SelectOptionComponent,
    ClickOutsideDirective,
    SelectBodyFilterComponent
  ],
  exports: [
    SelectComponent,
    SelectHeaderComponent,
    SelectBodyComponent,
    SelectOptionComponent,
    ClickOutsideDirective,
    SelectBodyFilterComponent
  ]
})
export class SelectModule { }
