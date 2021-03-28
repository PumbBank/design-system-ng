import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '../badge';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableRowComponent } from './components/data-table-row/data-table-row.component';
import { DataTableHeaderComponent } from './components/data-table-header/data-table-header.component';
import { SortHeaderComponent } from './sort/sort-header/sort-header.component';
import {
  MillCellDirective,
  MillCellDefDirective,
  MillCellOutletDirective,
  MillColumnDefDirective,
  MillHeaderCellDirective,
  MillHeaderCellDefDirective
} from './directives/cells';
import {
  MillHeaderHolderDirective,
  MillHeaderRowDirective,
  MillRowDirective,
  MillRowsHolderDirective
} from './directives/rows';
import { SortDirective } from './sort/sort.directive';
import { PaginatorComponent } from './paginator/paginator.component';


const components = [
  DataTableComponent,
  DataTableRowComponent,
  DataTableHeaderComponent,
  SortHeaderComponent,
];

const cells = [
  MillColumnDefDirective,
  // MillSelectDef,
  MillCellOutletDirective,
  MillCellDefDirective,
  MillCellDirective,
  MillHeaderCellDefDirective,
  MillHeaderCellDirective,
];

const rows = [
  MillRowDirective,
  MillRowsHolderDirective,
  MillHeaderHolderDirective,
  MillHeaderRowDirective,
];

const dataChanges = [
  SortDirective,
  PaginatorComponent
];

@NgModule({
  declarations: [
    ...dataChanges,
    ...components,
    ...cells,
    ...rows,
  ],
  exports: [
    ...dataChanges,
    ...components,
    ...cells,
    ...rows,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    // RadioModule,
    // CheckboxModule
  ]
})
export class DataTableModule {
}

