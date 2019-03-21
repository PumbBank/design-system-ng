import { Directive, ElementRef, Renderer2, Inject, OnInit, OnDestroy } from '@angular/core';
import { TableDirective } from '../table/table.directive';
import { HN_TABLE } from '../../tokens';

@Directive({
  selector: '[hnTableHeader]'
})
export class TableHeaderDirective implements OnInit, OnDestroy {
  tableElement: HTMLElement;
  theadElement: HTMLElement;
  theadRowElement: HTMLElement;
  thedRowElementFixed: HTMLElement;

  constructor(
    @Inject(HN_TABLE) private tableDirective: TableDirective,
    private element: ElementRef,
    private renderer: Renderer2
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
    this.theadRowElement = Array.from(this.theadElement.children)[0] as HTMLElement;

    const rect: DOMRect = this.tableElement.getBoundingClientRect() as DOMRect;
    const headerOutOfDisplay: boolean = rect.y < 0;

    if (headerOutOfDisplay) {
      if (!this.thedRowElementFixed) { this.createRowElementFixed();  }

     this.updatePostionOfRowElementFixed();
    } else {
      if (this.thedRowElementFixed) {
        this.destroyRowElementFixed();
      }
    }
  }

  private createRowElementFixed() {
    this.thedRowElementFixed = this.theadRowElement.cloneNode(true) as HTMLElement;

    this.renderer.addClass(this.tableElement, 'hn-table_fixed-header');
    this.renderer.addClass(this.thedRowElementFixed, 'hn-table__header-row_fixed');
    this.renderer.addClass(this.tableElement, 'hn-table_fixed-header');
    this.renderer.appendChild(this.theadElement, this.thedRowElementFixed);
  }

  private updatePostionOfRowElementFixed() {
    const rect: DOMRect = this.tableElement.getBoundingClientRect() as DOMRect;

    this.renderer.setStyle(this.thedRowElementFixed, 'top', `${Math.abs(rect.y)}px`);

    this.updateWidthOfCellsInRowElementFixed();
  }

  private updateWidthOfCellsInRowElementFixed() {
    Array.from(this.thedRowElementFixed.children).forEach((th: HTMLElement, i: number) => {
      const width = this.theadRowElement.children[i].clientWidth + 'px';
      this.renderer.setStyle(th, 'max-width', width);
      this.renderer.setStyle(th, 'min-width', width);
    });
  }

  private destroyRowElementFixed() {
    if (this.thedRowElementFixed) {
      this.renderer.removeClass(this.tableElement, 'hn-table_fixed-header');
      this.renderer.removeChild(this.theadElement, this.thedRowElementFixed);
      this.thedRowElementFixed = null;
    }
  }
}
