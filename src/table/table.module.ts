import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { BadgeModule } from '../badge';


@NgModule({
  declarations: [
    TableComponent,
    FilterInputComponent,
  ],
  exports: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule
  ],
})
export class TableModule {
}

