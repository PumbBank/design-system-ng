import {
  ContentChild,
  Directive,
  ElementRef, HostBinding,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';


export interface CellDefInterface {
  template: TemplateRef<any>;
}

// @dynamic
@Directive({selector: '[cellOutlet]'})
export class MillCellOutletDirective {
  static outlet: MillCellOutletDirective;

  context: any;

  constructor(public vc: ViewContainerRef) {
    MillCellOutletDirective.outlet = this;
  }
}

@Directive({selector: '[cellDef]'})
export class MillCellDefDirective implements CellDefInterface {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({selector: '[headerCellDef]'})
export class MillHeaderCellDefDirective implements CellDefInterface {
  constructor(public template: TemplateRef<any>) {}
}

export abstract class MillColumnToken {}

@Directive({
  selector: '[column]',
  providers: [{
    provide: MillColumnToken, useExisting: MillColumnDefDirective
  }]
})
export class MillColumnDefDirective {

  @Input('column') public name: string;
  @ContentChild(MillCellDefDirective, {static: true}) cell: MillCellDefDirective;
  @ContentChild(MillHeaderCellDefDirective, {static: true}) headerCell: MillHeaderCellDefDirective;

  constructor() {
  }

}

export class MillBaseCellDef {
  constructor(public column: MillColumnDefDirective, public element: ElementRef) {
  }
}

@Directive({selector: 'mill-cell'})
export class MillCellDirective extends MillBaseCellDef {
  @HostBinding('class.table-row__cell') get class(): boolean { return true; }
  constructor(public column: MillColumnDefDirective, public element: ElementRef) {
    super(column, element);
  }
}


@Directive({selector: 'mill-header-cell'})
export class MillHeaderCellDirective extends MillBaseCellDef {
  @HostBinding('class.table-header-row__cell') get class(): boolean { return true; }
  constructor(public column: MillColumnDefDirective, public element: ElementRef) {
    super(column, element);
  }
}

// @Directive({selector: '[selectDef]'})
// export class MillSelectDef implements CellDefInterface {
//   constructor(
//     public template: TemplateRef<any>,
//     public component: SelectInputComponent
//   ) {}
// }
