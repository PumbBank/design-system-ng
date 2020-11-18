import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { BadgeModule } from '../badge';

const components = [
  TableComponent,
  FilterInputComponent,
];

@NgModule({
	declarations: [
    ...components,
	],
	exports: [
    ...components,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
    BadgeModule,
	]
})

export class TableModule { }

