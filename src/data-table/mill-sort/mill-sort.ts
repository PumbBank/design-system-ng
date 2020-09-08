import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MillSortHeader } from './mill-sort-header/mill-sort-header.component';
import { Subject } from 'rxjs';

export abstract class MillSortToken {}

export interface SortInterface {
  active: string;
  direction: 'asc' | 'desc' | null;
}

@Directive({
  selector: '[mill-sort]',
  providers: [{
    provide: MillSortToken, useExisting: MillSort
  }]
})
export class MillSort implements OnInit {
  public init: Subject<void> = new Subject<void>();

  public sortItems = new Map<string, MillSortHeader>();
  public sortDirection: 'asc' | 'desc' | null = null;

  public activeSortItem: string;

  @Output() sortChange: EventEmitter<SortInterface> = new EventEmitter<SortInterface>();

  constructor() { }

  ngOnInit(): void {
    this.init.next();
  }

  register(sortItem: MillSortHeader) {
    this.sortItems.set(sortItem.id, sortItem);
  }

  deregister(sortItem: MillSortHeader) {
    this.sortItems.delete(sortItem.id);
  }

  sort(sortItem: MillSortHeader) {
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

    this.sortChange.emit({active: this.activeSortItem, direction: this.sortDirection})
  }

}
