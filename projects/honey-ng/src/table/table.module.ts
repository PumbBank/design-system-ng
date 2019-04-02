import { NgModule } from '@angular/core';
import { TableHeaderDirective } from './directives/table-header/table-header.directive';
import { TableDirective } from './directives/table/table.directive';
import { SortDirective } from './directives/sort/sort.directive';
import { SortFieldDirective } from './directives/sort/sort-field.directive';

@NgModule({
  declarations: [
    TableHeaderDirective,
    TableDirective,
    SortDirective,
    SortFieldDirective
  ],
  exports: [
    TableHeaderDirective,
    TableDirective,
    SortDirective,
    SortFieldDirective
  ]
})
export class TableModule { }
