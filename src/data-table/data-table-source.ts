import {BehaviorSubject} from 'rxjs';
import { SortDirective } from './sort/sort.directive';
import { PaginatorComponent } from './paginator/paginator.component';

export class DataTableSource<T> {

  private _data: BehaviorSubject<T[]>;
  private _renderData: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  private _sort: SortDirective;
  private _paginator: PaginatorComponent;

  get data(): T[] {
    return this._data.getValue();
  }
  set data(data: T[]) {
    this._data.next(data);
    this.updateData();
  }

  get sort(): SortDirective | null {
    return this._sort;
  }
  set sort(sort: SortDirective | null) {
    if (sort) {
      this._sort = sort;
      this._sort.sortChange.subscribe(() => {
        this.updateData();
      });
    }
  }

  get paginator(): PaginatorComponent | null {
    return this._paginator;
  }
  set paginator(paginator: PaginatorComponent | null) {
    if (paginator) {
      this._paginator = paginator;

      this.updateData();

      this._paginator.paginatorChange.subscribe(() => {
        this.updateData();
      });
    }
  }

  constructor(initData: T[] = []) {
    this._data = new BehaviorSubject<T[]>(initData);
    this.updateData();
  }

  // public filterData(data: T[]) {
  //   if (this.paginator) {
  //     this.updatePaginator(data.length)
  //   }
  //
  //   return data;
  // }

  private orderData(data: T[]): T[] {
    if (!this.sort) { return data; }

    return this.sortData(data.slice(), this.sort);
  }

  private sortData(data: T[], sort: SortDirective): T[] {
    const active = sort.activeSortItem;
    const direction = sort.sortDirection;

    if (!active || !direction) {
      return data;
    }

    return data.sort((a, b) => {
      const valueA = a[active];
      const valueB = b[active];

      let comparedValue = 0;

      if (valueA && valueB) {
        if (valueA > valueB) {
          comparedValue = 1;
        } else if (valueA < valueB) {
          comparedValue = -1;
        }
      } else if (!valueA) {
        comparedValue = 1;
      } else if (!valueB) {
        comparedValue = -1;
      }

      return comparedValue * (direction === 'asc' ? 1 : -1);
    });
  }

  private pageData(data: T[]): T[] {
    if (!this.paginator) { return data; }

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  public updatePaginator(length: number): void {
    const paginator = this.paginator;

    if (!paginator) { return; }

    paginator.length = length;

    if (paginator.pageIndex > 0) {
      const lastPageIndex = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
      const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);

      if (newPageIndex !== paginator.pageIndex) {
        paginator.pageIndex = newPageIndex;
      }
    }
  }

  public updateData(): void {
    let data = this._data.getValue();

    this.updatePaginator(data.length);

    data = this.orderData(data);
    data = this.pageData(data);

    this._renderData.next(data);
  }

  public connect(): BehaviorSubject<T[]> {
    return this._renderData;
  }

}

export function isDataSource(value: any): value is DataTableSource<any> {
  return value && typeof value.connect === 'function';
}
