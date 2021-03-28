import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { Subject } from 'rxjs';

export abstract class MillSortToken {}

export interface SortInterface {
  active: string;
  direction: 'asc' | 'desc' | null;
}

@Directive({
  selector: '[mill-sort]',
  providers: [{
    provide: MillSortToken, useExisting: SortDirective
  }]
})
export class SortDirective implements OnInit {
  public init: Subject<void> = new Subject<void>();

  public sortItems: Map<string, SortHeaderComponent> = new Map<string, SortHeaderComponent>();
  public sortDirection: 'asc' | 'desc' | null = null;

  public activeSortItem: string;

  @Output() sortChange: EventEmitter<SortInterface> = new EventEmitter<SortInterface>();

  constructor() { }

  ngOnInit(): void {
    this.init.next();
  }

  register(sortItem: SortHeaderComponent): void {
    this.sortItems.set(sortItem.id, sortItem);
  }

  deregister(sortItem: SortHeaderComponent): void {
    this.sortItems.delete(sortItem.id);
  }

  sort(sortItem: SortHeaderComponent): void {
    if (this.activeSortItem === sortItem.id) {
      if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.activeSortItem = null;
      } else {
        this.sortDirection = 'desc';
      }
    } else {
      this.activeSortItem = sortItem.id;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({active: this.activeSortItem, direction: this.sortDirection});
  }

}
