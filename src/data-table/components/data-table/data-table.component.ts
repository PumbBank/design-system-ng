import {
  AfterContentInit,
  Component,
  ContentChildren, EventEmitter,
  Input,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SelectService } from '../../services/select.service';
import {Observable, isObservable, of, Subscription} from 'rxjs';
import { DataTableSource, isDataSource } from '../../data-table-source';
import {
  MillBaseRow,
  MillHeaderHolderDirective,
  MillHeaderRowDirective,
  MillRowDirective,
  MillRowsHolderDirective,
  RowOutletInterface,
  RowsInterface
} from '../../directives/mill-rows';
import { MillCellOutletDirective, MillColumnDefDirective } from '../../directives/mill-cells';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent<T> implements OnInit, AfterContentInit {

  static tableIndex: number = 0;
  public index: number;

  private _data: T[] = [];

  @Input() get dataSource(): Observable<T[]> | T[] | DataTableSource<T> {
    return this._dataSource;
  }
  set dataSource(dataSource: Observable<T[]> | T[] | DataTableSource<T>) {
    if (this._dataSource !== dataSource) {
      this._data = [];

      if (this.renderSubscription) {
        this.renderSubscription.unsubscribe();
        this.renderSubscription = null;
      }

      // todo add cache
      this.rowsHolder.viewContainer.clear();

      this._dataSource = dataSource;
      this.observeDataSource();
    }
  }

  private renderSubscription: Subscription;

  private _dataSource: Observable<T[]> | T[] | DataTableSource<T>;

  @Input() dataColumns: string[];

  @Output() selectedRows: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ViewChild(MillRowsHolderDirective, {static: true}) public rowsHolder: MillRowsHolderDirective;
  @ViewChild(MillHeaderHolderDirective, {static: true}) public headerHolder: MillHeaderHolderDirective;

  @ContentChildren(MillColumnDefDirective, {descendants: true}) public columns: QueryList<MillColumnDefDirective>;
  @ContentChildren(MillRowDirective, {descendants: true}) public rows: QueryList<MillRowDirective>;
  @ContentChildren(MillHeaderRowDirective, {descendants: true}) public header: QueryList<MillHeaderRowDirective>;

  // @ContentChildren(MillSelectDef) public select: QueryList<MillSelectDef>;

  private _rows: MillRowDirective[];
  private _renderRows: RowsInterface[] = [];
  private _columnsNames: Map<string, MillColumnDefDirective> = new Map<string, MillColumnDefDirective>();

  constructor(private selectService: SelectService) {
    this.index = DataTableComponent.tableIndex++;
  }

  public ngOnInit(): void {
    // this.selectService.selectedIndex.subscribe(i => {
    //   if (i) {
    //     console.log(i);
    //     // this.selectedRows.emit(this._renderRows.find(row => (row.rowIndex + 1) === i).data)
    //   }
    // })
  }

  public ngAfterContentInit(): void {
    this.cacheColumns();
    this.renderHeaderRow();
    this.observeDataSource();
  }

  private observeDataSource(): void {
    let dataStream: Observable<T[]>;

    if (isDataSource(this.dataSource)) {
      dataStream = this.dataSource.connect();
    } else if (isObservable(this.dataSource)) {
      dataStream = this.dataSource;
    } else {
      dataStream = of(this.dataSource);
    }

    this.renderSubscription = dataStream.subscribe(data => {
      this.rowsHolder.viewContainer.clear();
      this._data = data;
      this.renderContentRows();
    });
  }

  private  cacheColumns(): void {
    this._columnsNames.clear();
    this.columns.forEach(c => {
      this._columnsNames.set(c.name, c);
    });
  }

  private renderHeaderRow(): void {
    this.renderRows(this.headerHolder, this.header.first, 0);
  }

  private renderContentRows(): void {
    if (this.rows) {
      this._renderRows = this.setDataToRows();

      this._renderRows.forEach(row => {
        this.renderRows(this.rowsHolder, row.rowDef, row.rowIndex, {$implicit: row.data});
      });
    }
  }

  private renderRows(outlet: RowOutletInterface, rowDef: MillBaseRow, rowIndex: number, context: any = {}): void {
    outlet.viewContainer.createEmbeddedView(rowDef.template, context, rowIndex);

    for (const cell of this.getCellTemplate(rowDef)) {
      MillCellOutletDirective.outlet.vc.createEmbeddedView(cell, context);
    }
  }

  private getCellTemplate(rowDef: MillBaseRow): any[] {
    return Array.from(rowDef.columns, columnId => {
      const column = this._columnsNames.get(columnId);
      return rowDef.getCellTemplate(column);
    });
  }

  private setDataToRows(): RowsInterface[] {
    const rows: RowsInterface[] = [];

    this._data.forEach((data, index) => {
      const renderRows = this.getRenderRows(data, index);
      renderRows.forEach(r => rows.push(r));
    });

    return rows;
  }

  private getRenderRows(data: any, rowIndex: number): RowsInterface[] {
    const rowDefs = this.getRowDefs();

    return rowDefs.map(rowDef => {
      return {data, rowDef, rowIndex};
    });
  }

  // todo cache rows
  private getRowDefs(): MillRowDirective[] {
    const rowDefs: MillRowDirective[] = [];
    rowDefs.push(this.rows.first);
    return rowDefs;
  }

}



