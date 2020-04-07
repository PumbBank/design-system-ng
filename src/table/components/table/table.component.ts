import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  BadgeInterface,
  CheckboxEnum,
  DataModelInterface,
  EmitInterface,
  FilterInterface,
  PaginatorInterface,
  SortInterface,
  TableStyleEnum,
  TableTypeEnum
} from '../../table';

@Component({
  selector: 'mill-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  protected _tableData$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  @Input() set data(value: any[]) {
    if (value) {
      this._tableData$.next(value);
    }
  }

  @Input() dataModel: DataModelInterface[] = [];
  public selected: any[] = [];

  @Input() selectInput: 'checkbox' | 'radio';
  public groupCheckbox: CheckboxEnum;
  public checkboxStates = CheckboxEnum;

  @Input() public set rowCount(value) {
    if (value) {
      this._rowCount = Number.isInteger(value) ? value : +value;
      this._dataLength = this._rowCount;
      this._updatePaginator();
      // this._updatePaginatorLabel();
    }
  }

  public get rowCount(): number {
    return this._rowCount;
  }

  private _rowCount: number;

  @Input() paginator: boolean;
  @Input()
  set paginatorShowCount(value: number[]) {
    if (value) {
      this.paginatorSettings.limit = this.paginatorSettings.limit ? this.paginatorSettings.limit : value[0];
      this._paginatorShowCount = value;
    }
  }
  get paginatorShowCount(): number[] {
    return this._paginatorShowCount;
  }

  private _paginatorShowCount: number[];

  public paginatorSettings: PaginatorInterface = {
    currentPage: 0,
    offset: 0,
    limit: 0,
    pages: 0
  };

  @Input() counterSeparator = 'из';
  public counterLabel: string;

  public filterSettings: FilterInterface[] = [];
  public sortSettings: SortInterface = {
    sortColumn: null,
    sortDirection: 'asc'
  };

  @Input() width: string | number = 100;
  @Input() loading = true;
  public menuState = false;

  public viewData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  private _dataLength: number;

  @Input() async = false;
  @Input() padding = true;

  @Input() fixedHeader = false;
  public fixedHeaderShadow = false;

  @Input() tableStyle: TableStyleEnum = TableStyleEnum.normal;
  public tableStyleEnum = TableStyleEnum;

  @Input() tableType: TableTypeEnum = TableTypeEnum.normal;
  public tableTypeEnum = TableTypeEnum;

  @Input()
  set badge(value: BadgeInterface[]) {
    this._badge = value;
  }
  get badge(): BadgeInterface[] {
    return this._badge;
  }

  private _badge: BadgeInterface[];

  @Output() tableOutput: EventEmitter<EmitInterface> = new EventEmitter<EmitInterface>();
  @Output() selectedRows: EventEmitter<any[]> = new EventEmitter<any[]>();

  private _tableActions$: Subject<EmitInterface> = new Subject();

  @ViewChild('table', { static: true })
  public table: ElementRef;

  @ViewChild('header', { static: true })
  public header: ElementRef;



  ngOnInit() {
    if (this.paginatorSettings.limit === 0) {
      this.paginatorSettings.limit = 5;
      this._paginatorShowCount = [5, 10, 20];
    }

    this._tableData$.subscribe(data => {
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

    this.viewData$.subscribe(data => {
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

  public updateViewData(): void {
    let data = this._tableData$.getValue().concat();

    data = this._filterData(data);
    data = this._sortData(data);
    data = this._orderData(data);

    this.viewData$.next(data);
    this._updatePaginatorLabel();
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

  public onRowClick(event, row): void {
    // event.stopPropagation();
    if (this.selectInput) {
      this._updateSelected(row);
    }
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

  public onSortClick(column): void {
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

  private _calcPaginatorPages(dataLength?: number): number {
    return Math.max(Math.ceil((dataLength ? dataLength : this._dataLength) / this.paginatorSettings.limit) - 1, 0);
  }

  private _updatePaginatorLabel(): void {
    if (this.async) {
      console.log('View data length', this.viewData$.getValue().length);
    }
    this.counterLabel = `
            ${this.paginatorSettings.offset + 1}—${this.paginatorSettings.offset + this.viewData$.getValue().length} 
            ${this.counterSeparator} 
            ${this._dataLength}
        `;
  }

  public onFilterKeyUp(event, field): void {
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

  private _updateSelected(row): void {
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

  private _onTableScroll(): void {
    fromEvent(this.table.nativeElement, 'scroll')
      .pipe(
        map(() => this.header.nativeElement.offsetTop > 0),
        distinctUntilChanged()
      )
      .subscribe(v => (this.fixedHeaderShadow = v));
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
