import { element } from 'protractor';
import { Component, Directive, ElementRef, Renderer2, Inject, OnInit, OnDestroy } from '@angular/core';
import { TableDirective } from '../table/table.directive';
import { HN_TABLE } from '../../tokens';

@Directive({
  selector: '[hnTableHeader]'
})
export class TableHeaderDirective implements OnInit, OnDestroy {
  tableElement: HTMLElement;
  theadElement: HTMLElement;
  thedRowElement: HTMLElement;
  thedRowElementFixed: HTMLElement;

  constructor(
    @Inject(HN_TABLE) private tableDirective: TableDirective,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.tableElement = this.tableDirective.element.nativeElement;
    this.theadElement = this.element.nativeElement;

    if (window && window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy() {
    if (window && window.removeEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private onScroll = () => {
    this.thedRowElement = Array.from(this.theadElement.children)[0] as HTMLElement;

    const rect: DOMRect = this.tableElement.getBoundingClientRect() as DOMRect;
    const headerOutOfDisplay: boolean = rect.y < 0;

    if (headerOutOfDisplay) {
      if (!this.thedRowElementFixed) {
        this.createRowElementFixed();
      }
     this.updatePostionOfRowElementFixed();
    } else {
      if (this.thedRowElementFixed) {
        this.destroyRowElementFixed();
      }
    }
  }

  private createRowElementFixed() {
    this.tableElement.classList.add('hn-table_fixed-header');

    this.thedRowElementFixed = this.thedRowElement.cloneNode(true) as HTMLElement;
    this.thedRowElementFixed.classList.add('hn-table__header-row_fixed');
    this.theadElement.appendChild(this.thedRowElementFixed);
  }

  private updatePostionOfRowElementFixed() {
    const rect: DOMRect = this.tableElement.getBoundingClientRect() as DOMRect;

    this.thedRowElementFixed.style.top = `${Math.abs(rect.y)}px`;

    this.updateWidthOfCellsInRowElementFixed();
  }

  private updateWidthOfCellsInRowElementFixed() {
    Array.from(this.thedRowElementFixed.children).forEach((th: HTMLElement, i: number) => {
      th.style.maxWidth = this.thedRowElement.children[i].clientWidth + 'px';
      th.style.minWidth = this.thedRowElement.children[i].clientWidth + 'px';
    });
  }

  private destroyRowElementFixed() {
    if (this.thedRowElementFixed) {
      this.tableElement.classList.remove('hn-table_fixed-header');
      this.theadElement.removeChild(this.thedRowElementFixed);
      this.thedRowElementFixed = null;
    }
  }
}
