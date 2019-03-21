import { NgModule } from '@angular/core';
import { TableHeaderDirective } from './directives/table-header/table-header.directive';
import { TableDirective } from './directives/table/table.directive';

@NgModule({
  declarations: [
    TableHeaderDirective,
    TableDirective
  ],
  exports: [
    TableHeaderDirective,
    TableDirective
  ]
})
export class TableModule { }
