import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

export interface PaginatorInterface {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'mill-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  public init: Subject<void> = new Subject<void>();

  public menuState: boolean;
  public counterLabel: string;

  @Input()
  get pageIndex(): number {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    this._pageIndex = value;
  }
  private _pageIndex: number = 0;

  @Input()
  get length(): number {
    return this._length;
  }
  set length(value: number) {
    this._length = value;
    this.updateCounterLabel();
  }
  private _length: number = 0;

  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    this._pageSize = value;
  }
  private _pageSize: number;

  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value;
    this.displayedPageSizeOptions();
  }
  private _pageSizeOptions: number[];

  @Output() paginatorChange: EventEmitter<PaginatorInterface> = new EventEmitter<PaginatorInterface>();

  constructor() {}

  ngOnInit(): void {
    this.init.next();
    this.displayedPageSizeOptions();
    this.updateCounterLabel();
  }

  displayedPageSizeOptions(): void {
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
  }

  nextPage(): void {
    if (!this.hasNextPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);

    this.updateCounterLabel();
  }

  previousPage(): void {
    if (!this.hasPreviousPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);

    this.updateCounterLabel();
  }

  hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize !== 0;
  }

  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize !== 0;
  }

  getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0;
    }

    return Math.ceil(this.length / this.pageSize);
  }

  onMenuOptionClick(pageSize: number): void {
    this.menuState = false;

    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);

    this.updateCounterLabel();
  }

  private updateCounterLabel(): void {
    const max = ((this.pageIndex * this.pageSize) + this.pageSize);
    this.counterLabel = `
            ${(this.pageIndex * this.pageSize) + 1}—${max > this.length ? this.length : max} з ${this.length}`;
  }

  private _emitPageEvent(prevIndex: number): void {
    this.paginatorChange.emit({
      previousPageIndex: prevIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }

}
