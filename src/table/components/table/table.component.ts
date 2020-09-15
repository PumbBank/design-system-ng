import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import {
  BadgeInterface,
  CheckboxEnum,
  DataModelInterface,
  EmitInterface,
  FilterInterface,
  PaginatorInterface,
  SortingInterface,
  TableStyleEnum,
  TableTypeEnum
} from '../../table';

@Component({
  selector: 'mill-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();
  private _tableActions$: Subject<EmitInterface> = new Subject();
  private _dataLength: number;
  protected _tableData$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  // tslint:disable-next-line:typedef
  public checkboxStates = CheckboxEnum;
  // tslint:disable-next-line:typedef
  public tableStyleEnum = TableStyleEnum;

  // enums for html
  // tslint:disable-next-line:typedef
  public tableTypeEnum = TableTypeEnum;
  public groupCheckbox: CheckboxEnum;
  public selected: any[] = [];
  public paginatorSettings: PaginatorInterface = {
    currentPage: 0,
    offset: 0,
    limit: 0,
    pages: 0
  };
  public menuState: boolean = false;
  public fixedHeaderShadow: boolean = false;
  public counterLabel: string;
  public filterSettings: FilterInterface[] = [];
  public sortSettings: SortingInterface = {
    sortColumn: null,
    sortDirection: 'asc'
  };
  public viewData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  @Input() dataModel: DataModelInterface[] = [];
  @Input() selectInput: 'checkbox' | 'radio';
  @Input() counterSeparator: string = 'з';
  @Input() width: string | number = 100;
  @Input() loading: boolean = true;
  @Input() async: boolean = false;
  @Input() padding: boolean = true;
  @Input() fixedHeader: boolean = false;
  @Input() darkStyleHeader: boolean = false;
  @Input() tableStyle: TableStyleEnum = TableStyleEnum.normal;
  @Input() tableType: TableTypeEnum = TableTypeEnum.normal;
  @Input() paginator: boolean;
  @Output() tableOutput: EventEmitter<EmitInterface> = new EventEmitter<EmitInterface>();
  @Output() selectedRows: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ViewChild('table', {static: true})
  public table: ElementRef;
  @ViewChild('header', {static: true})
  public header: ElementRef;

  private _rowCount: number;

  public get rowCount(): number {
    return this._rowCount;
  }

  @Input()
  public set rowCount(value: number) {
    if (value) {
      this._rowCount = Number.isInteger(value) ? value : +value;
      this._dataLength = this._rowCount;
      this._updatePaginator();
      // this._updatePaginatorLabel();
    }
  }

  private _paginatorShowCount: number[];

  get paginatorShowCount(): number[] {
    return this._paginatorShowCount;
  }

  @Input()
  set paginatorShowCount(value: number[]) {
    if (value) {
      this.paginatorSettings.limit = this.paginatorSettings.limit ? this.paginatorSettings.limit : value[0];
      this._paginatorShowCount = value;
    }
  }

  private _badge: BadgeInterface[];

  get badge(): BadgeInterface[] {
    return this._badge;
  }

  @Input()
  set badge(value: BadgeInterface[]) {
    this._badge = value;
  }

  @Input()
  set data(value: any[]) {
    if (value) {
      this._tableData$.next(value);
    }
  }

  ngOnInit(): void {
    if (this.paginatorSettings.limit === 0) {
      this.paginatorSettings.limit = 5;
      this._paginatorShowCount = [5, 10, 20];
    }

    this._tableData$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => {
        if (data) {
          this._dataLength = this.rowCount ? this.rowCount : data.length;

          if (this.async) {
            this.viewData$.next(data);
          } else {
            this.updateViewData();
          }

          if (this.paginator) {
            this._updatePaginator();
            this._updatePaginatorLabel();
          }
        }
      });

    this.viewData$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => {
        if (data) {
          this.loading = false;
        }
      });

    if (this.async) {
      this._onAsyncOutput();

      if (this._tableData$.getValue() && this._tableData$.getValue().length === 0) {
        this._tableDataUpdate();
      }
    }

    if (this.fixedHeader) {
      this._onTableScroll();
    }
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public updateViewData(): void {
    let data = this._tableData$.getValue().concat();

    data = this._filterData(data);
    data = this._sortData(data);
    data = this._orderData(data);

    this.viewData$.next(data);
    this._updatePaginatorLabel();
  }

  public onRowClick(event: MouseEvent, row: any): void {
    // event.stopPropagation();
    this._updateSelected(row);
  }

  public onMainCheckboxClick(): void {
    if (this.groupCheckbox === this.checkboxStates.indeterminate) {
      this.groupCheckbox = this.checkboxStates.checked;
      this.selected = this.viewData$.getValue().concat();
    } else if (this.groupCheckbox === this.checkboxStates.checked) {
      this.groupCheckbox = this.checkboxStates.unchecked;
      this.selected = [];
    } else {
      this.groupCheckbox = this.checkboxStates.checked;
      this.selected = this.viewData$.getValue().concat();
    }

    this.selectedRows.emit(this.selected);
  }

  public onSortClick(column: any): void {
    if (column.sortable) {
      if (this.sortSettings.sortColumn === column) {
        if (this.sortSettings.sortDirection === 'desc') {
          this.sortSettings.sortDirection = null;
          this.sortSettings.sortColumn = null;
        } else {
          this.sortSettings.sortDirection = 'desc';
        }
      } else {
        this.sortSettings.sortColumn = column;
        this.sortSettings.sortDirection = 'asc';
      }

      this._tableDataUpdate();
    }
  }

  public onCountMenuClick(): void {
    this.menuState = !this.menuState;
  }

  public onPaginatorClick(increase: boolean): void {
    if (increase) {
      if (this.paginatorSettings.currentPage < this.paginatorSettings.pages) {
        this.paginatorSettings.currentPage++;
      } else {
        return;
      }
    } else {
      if (this.paginatorSettings.currentPage > 0) {
        this.paginatorSettings.currentPage--;
      } else {
        return;
      }
    }

    this.selected = [];
    this.selectedRows.emit(this.selected);

    if (this.selectInput === 'checkbox') {
      this.groupCheckbox = this.checkboxStates.unchecked;
    }

    this._updatePaginator();
    this._tableDataUpdate();
  }

  public onMenuOptionClick(count: number): void {
    this.menuState = false;

    this._updatePaginator(count);
    this._tableDataUpdate();
  }

  public onFilterKeyUp(event: any, field: DataModelInterface): void {
    const index = this.dataModel.indexOf(field);

    if (index > -1) {
      this.dataModel[index].filterValue = event;
    }

    this.filterSettings = [];

    this.dataModel.forEach(item => {
      if (item.filterValue) {
        this.filterSettings.push({
          value: item.filterValue,
          fieldName: item.fieldName
        });
      }
    });

    this._tableDataUpdate();
  }

  public isFilterable(): boolean {
    let show = false;

    for (const item of this.dataModel) {
      if (item.filterable) {
        show = true;
        break;
      }
    }

    return show;
  }

  public isValidBadge(fieldName: string, value: string | number): boolean {
    return this._checkBadge(fieldName, value, 'valid');
  }

  public isInvalidBadge(fieldName: string, value: string | number): boolean {
    return this._checkBadge(fieldName, value, 'invalid');
  }

  public isWarningBadge(fieldName: string, value: string | number): boolean {
    return this._checkBadge(fieldName, value, 'warning');
  }

  private _updatePaginator(count?: number, length?: number): void {
    if (count) {
      this.paginatorSettings.currentPage = Math.round(this.paginatorSettings.offset / count);
      this.paginatorSettings.limit = count;
    }

    this.paginatorSettings.pages = this._calcPaginatorPages(length);

    if (this.paginatorSettings.currentPage > this.paginatorSettings.pages) {
      this.paginatorSettings.currentPage = Math.min(this.paginatorSettings.currentPage, this.paginatorSettings.pages);
    }

    this.paginatorSettings.offset = this.paginatorSettings.currentPage * this.paginatorSettings.limit;
  }

  private _tableDataUpdate(): void {
    if (this.async) {
      const obj: EmitInterface = {
        filter: this.filterSettings,
        sort: this.sortSettings,
        paginator: this.paginatorSettings
      };
      this._tableActions$.next(obj);
    } else {
      this.updateViewData();
    }
  }

  private _onAsyncOutput(): void {
    this._tableActions$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(obj => {
        if (obj) {
          this.tableOutput.emit(obj);
          this.loading = true;
        }
      });
  }

  private _calcPaginatorPages(dataLength?: number): number {
    return Math.max(Math.ceil((dataLength ? dataLength : this._dataLength) / this.paginatorSettings.limit) - 1, 0);
  }

  private _updatePaginatorLabel(): void {
    if (this.async) {
      console.debug('View data length', this.viewData$.getValue().length);
    }
    this.counterLabel = `
            ${this.paginatorSettings.offset + 1}—${this.paginatorSettings.offset + this.viewData$.getValue().length}
            ${this.counterSeparator}
            ${this._dataLength}
        `;
  }

  private _updateSelected(row: any): void {
    const selectedRowIndex = this.selected.indexOf(row);

    if (selectedRowIndex > -1) {
      this.selected.splice(selectedRowIndex, 1);
    } else {
      if (this.selectInput === 'checkbox') {
        this.selected.push(row);
      } else {
        this.selected = [row];
      }
    }

    if (this.selectInput === 'checkbox') {
      if (this.selected.length === this.viewData$.getValue().length) {
        this.groupCheckbox = this.checkboxStates.checked;
      } else if (this.selected.length > 0 && this.selected.length !== this.viewData$.getValue().length) {
        this.groupCheckbox = this.checkboxStates.indeterminate;
      } else {
        this.groupCheckbox = this.checkboxStates.unchecked;
      }
    }

    this.selectedRows.emit(this.selected);
  }

  private _filterData(data: any[]): any[] {
    if (!this.isFilterable()) {
      return data;
    }

    const filteredData = data.filter(item => {
      if (typeof item === 'undefined' || item === null) {
        return false;
      }
      return this.dataModel.every(i => {
        return (
          item[i.fieldName]
            .toString()
            .toLowerCase()
            .indexOf(i.filterValue ? i.filterValue.toLowerCase() : '') !== -1
        );
      });
    });

    if (!this.rowCount) {
      this._dataLength = filteredData.length;
    }

    return filteredData;
  }

  private _sortData(data: any[]): any[] {
    if (!this.sortSettings.sortColumn || data.length === 0) {
      return data;
    }

    return data.sort((a, b) => {
      const valueA = a[this.sortSettings.sortColumn.fieldName];
      const valueB = b[this.sortSettings.sortColumn.fieldName];

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

      return comparedValue * (this.sortSettings.sortDirection === 'asc' ? 1 : -1);
    });
  }

  private _orderData(data: any[]): any[] {
    if (!this.paginator || data.length === 0) {
      return data;
    }

    this._updatePaginator(null, data.length);

    return data.slice(this.paginatorSettings.offset, this.paginatorSettings.offset + this.paginatorSettings.limit);
  }

  private _onTableScroll(): void {
    fromEvent(this.table.nativeElement, 'scroll')
      .pipe(
        map(() => this.header.nativeElement.offsetTop > 0),
        distinctUntilChanged()
      )
      .subscribe(v => (this.fixedHeaderShadow = v));
  }

  private _checkBadge(fieldName: string, value: string | number, type: string): boolean {
    if (!this.badge || this.badge.length === 0) {
      return;
    }

    if (value) {
      value = value.toString();

      for (const key of this.badge) {
        if (key.fieldName === fieldName) {
          return Array.isArray(key[type]) ? key[type].includes(value) : key[type] === value;
        }
      }

      return;
    }
  }
}
