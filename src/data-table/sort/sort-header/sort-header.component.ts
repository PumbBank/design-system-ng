import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SortDirective, MillSortToken } from '../sort.directive';
import { MillColumnDefDirective, MillColumnToken } from '../../directives/cells';

@Component({
  selector: '[mill-sort-header]',
  exportAs: 'millSortHeader',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit, OnDestroy {

  public sortDirection: 'asc' | 'desc' | null = null;

  public id: string;

  constructor(
    @Inject(MillColumnToken) public columnDef: MillColumnDefDirective,
    @Inject(MillSortToken) public _sort: SortDirective,
  ) {
    this.id = columnDef.name;

    this._sort.sortChange.subscribe(sorted => {
      if (sorted.active === this.id) {
        this.sortDirection = sorted.direction;
      } else {
        this.sortDirection = null;
      }
    });
  }

  ngOnInit(): void {
    if (this._sort) {
      this._sort.register(this);
    }
  }

  ngOnDestroy(): void {
    this._sort.sortChange.unsubscribe();
    this._sort.deregister(this);
  }

  onClick(): void {
    this._sort.sort(this);
  }


}
