import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '../badge';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableRowComponent } from './components/data-table-row/data-table-row.component';
import { DataTableHeaderComponent } from './components/data-table-header/data-table-header.component';
import { MillSortHeaderComponent } from './mill-sort/mill-sort-header/mill-sort-header.component';
import {
  MillCellDirective,
  MillCellDefDirective,
  MillCellOutletDirective,
  MillColumnDefDirective,
  MillHeaderCellDirective,
  MillHeaderCellDefDirective
} from './directives/mill-cells';
import {
  MillHeaderHolderDirective,
  MillHeaderRowDirective,
  MillRowDirective,
  MillRowsHolderDirective
} from './directives/mill-rows';
import { MillSortDirective } from './mill-sort/mill-sort.directive';
import { MillPaginatorComponent } from './mill-paginator/mill-paginator.component';


const components = [
  DataTableComponent,
  DataTableRowComponent,
  DataTableHeaderComponent,
  MillSortHeaderComponent,
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
  MillSortDirective,
  MillPaginatorComponent
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

