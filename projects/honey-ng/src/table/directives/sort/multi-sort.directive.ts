import { Directive, Output, EventEmitter } from '@angular/core';
import { SORT_CONTROLLER, SortController, SortEvent, iterations } from './sort.controller';


@Directive({
  selector: '[hnMultiSort]',
  providers: [{
    provide: SORT_CONTROLLER,
    useExisting: MultiSortDirective
  }]
})
export class MultiSortDirective implements SortController {
  private sortedFields: SortEvent[] = [];

  @Output() hnMultiSort: EventEmitter<SortEvent[]> = new EventEmitter<SortEvent[]>();

  checkField(fieldName: string): string {
    const field = this.sortedFields.find((el: SortEvent) => el.sortField === fieldName);
    return field && field.sortDirection;
  }

  nextSortIteration(sortField: string): void {
    const existingFiled = this.sortedFields.find((el: SortEvent) => el.sortField === sortField);

    if (existingFiled) {
      existingFiled.sortDirection === iterations[0]
        ? existingFiled.sortDirection = iterations[1]
        : this.sortedFields.splice(this.sortedFields.indexOf(existingFiled), 1);
    } else {
      this.sortedFields.push({
        sortField: sortField,
        sortDirection: iterations[0]
      });
    }

    this.hnMultiSort.next(this.sortedFields);
  }
}
