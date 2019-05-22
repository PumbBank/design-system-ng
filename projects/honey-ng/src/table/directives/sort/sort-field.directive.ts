import { Directive, Input, HostListener, Inject, HostBinding } from '@angular/core';
import { SORT_CONTROLLER, SortController } from './sort.controller';

@Directive({
  selector: '[hnThSortble]'
})
export class SortFieldDirective {

  @HostBinding('class.hn-table__header_sortable') sortableClass: boolean = true;
  @HostBinding('class.hn-table__header_sortable_asc') get asc(): boolean {
    return this.sortController.checkField(this.hnThSortble) === 'ASC';
  }
  @HostBinding('class.hn-table__header_sortable_desc') get desc(): boolean {
    return this.sortController.checkField(this.hnThSortble) === 'DESC';
  }

  @Input() hnThSortble: string;

  constructor(
    @Inject(SORT_CONTROLLER) private sortController: SortController
  ) { }

  @HostListener('click') onClick() {
    this.sortController.nextSortIteration(this.hnThSortble);
  }

}
