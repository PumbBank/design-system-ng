import { Directive, Output, EventEmitter } from '@angular/core';
import { SortController, SORT_CONTROLLER, SortDirection, SortEvent, iterations } from './sort.controller';


@Directive({
  selector: '[hnSort]',
  providers: [
    {
      provide: SORT_CONTROLLER,
      useExisting: SortDirective
    }
  ]
})
export class SortDirective implements SortController {

  sortDirection: SortDirection = null;
  sortField: string;

  @Output() hnSort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  checkField(fieldName: string): string {
    return fieldName === this.sortField ? this.sortDirection : null;
  }

  nextSortIteration(sortField: string): void {
    if (sortField === this.sortField) {
      // Берем поочереди значения из массива
      this.sortDirection = iterations[
        (iterations.indexOf(this.sortDirection) + 1) % iterations.length
      ];
    } else {
      this.sortField = sortField;
      this.sortDirection = iterations[0];
    }

    this.hnSort.emit({ sortField: this.sortField, sortDirection: this.sortDirection });
  }
}
