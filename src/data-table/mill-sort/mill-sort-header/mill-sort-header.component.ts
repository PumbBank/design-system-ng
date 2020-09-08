import { Component, Host, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MillSortDirective, MillSortToken } from '../mill-sort.directive';
import { MillColumnDefDirective, MillColumnToken } from '../../directives/mill-cells';

@Component({
  selector: '[mill-sort-header]',
  exportAs: 'millSortHeader',
  templateUrl: './mill-sort-header.component.html',
  styleUrls: ['./mill-sort-header.component.scss']
})
export class MillSortHeaderComponent implements OnInit, OnDestroy {

  public sortDirection: 'asc' | 'desc' | null = null;

  public id: string;

  constructor(
    @Inject(MillColumnToken) public columnDef: MillColumnDefDirective,
    @Inject(MillSortToken) public _sort: MillSortDirective,
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
