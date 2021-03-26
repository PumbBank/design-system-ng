import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MillColumnDefDirective } from './cells';


export interface RowsInterface {
  data: any;
  rowIndex: number;
  rowDef: MillRowDirective;
}

export interface RowOutletInterface {
  viewContainer: ViewContainerRef;
}

@Directive({selector: '[headerHolder]'})
export class MillHeaderHolderDirective implements RowOutletInterface {
  constructor(public viewContainer: ViewContainerRef, public el: ElementRef) {
  }
}

@Directive({selector: '[rowsHolder]'})
export class MillRowsHolderDirective implements RowOutletInterface {
  constructor(public viewContainer: ViewContainerRef, public el: ElementRef) {
  }
}

export abstract class MillRowRef {}

export abstract class MillBaseRow {
  public columns: Iterable<string>;

  protected constructor(
    public template: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
  ) {}

  public getCellTemplate(column: MillColumnDefDirective): TemplateRef<any> {
    if (this instanceof MillHeaderRowDirective) {
      return column.headerCell.template;
    } else {
      return column.cell.template;
    }
  }
}

export abstract class MillRowToken {}

@Directive({
  selector: '[row]',
  providers: [{
    provide: MillRowToken, useExisting: MillRowDirective
  }]
})
export class MillRowDirective extends MillBaseRow {

  @Input('rowColumns') public columns: string[];

  constructor(
    public template: TemplateRef<any>,
    public element: ElementRef,
    public viewContainer: ViewContainerRef,
    ) {
    super(template, viewContainer);
  }

}

@Directive({selector: '[headerRow]'})
export class MillHeaderRowDirective extends MillBaseRow {

  @Input('headerRow') public columns: string[];

  constructor(public template: TemplateRef<any>, public viewContainer: ViewContainerRef) {
    super(template, viewContainer);
  }
}
