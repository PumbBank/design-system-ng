import { Directive, Input, HostListener, Inject, HostBinding } from '@angular/core';
import { SortDirection, SortDirective } from './sort.directive';

@Directive({
  selector: '[hnThSortble]'
})
export class SortFieldDirective {
  @HostBinding('class.hn-table__header_sortable') sortableClass: boolean = true;
  @HostBinding('class.hn-table__header_sortable_asc') get asc(): boolean {
    return this.hnThSortble === this.sortField && this.sortDirection === 'ASC';
  }
  @HostBinding('class.hn-table__header_sortable_desc') get desc(): boolean {
    return this.hnThSortble === this.sortField && this.sortDirection === 'DESC';
  }

  @Input() hnThSortble: string;

  get sortField(): string {
    return this.sortController.sortField;
  }

  get sortDirection(): SortDirection {
    return this.sortController.sortDirection;
  }

  constructor(
    private sortController: SortDirective
  ) {
  }

  @HostListener('click') onClick() {
    this.sortController.nextSortIteration(this.hnThSortble);
  }

}
