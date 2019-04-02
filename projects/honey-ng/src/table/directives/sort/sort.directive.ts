import { InjectionToken, Directive, Output, EventEmitter, forwardRef, ElementRef } from '@angular/core';

export type SortDirection = 'ASC' | 'DESC';

export interface SortEvent {
  sortField: string | null;
  sortDirection: SortDirection;
}

@Directive({
  selector: '[hnSort]'
})
export class SortDirective {
  private static iterations: SortDirection[] = ['ASC', 'DESC', null];

  sortDirection: SortDirection = null;
  sortField: string;

  @Output() hnSort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  constructor(
    elementRef: ElementRef
  ) {
    console.log(elementRef);
  }

  nextSortIteration(sortField: string): void {
    if (sortField === this.sortField) {
      // Берем поочереди значения из массива
      this.sortDirection = SortDirective.iterations[
        (SortDirective.iterations.indexOf(this.sortDirection) + 1) %
        SortDirective.iterations.length
      ];
    } else {
      this.sortField = sortField;
      this.sortDirection = SortDirective.iterations[0];
    }

    this.hnSort.emit({ sortField: this.sortField, sortDirection: this.sortDirection });
  }
}
