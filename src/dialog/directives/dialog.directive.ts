import {ContentChild, Directive, TemplateRef} from '@angular/core';

// *millRef
@Directive({
  selector: '[millRef]',
})
export class MillTemplateRefDirective {
  constructor(public _template: TemplateRef<any>) {}
}

/* tslint:disable:directive-selector */
@Directive({
  selector: 'mill-dialog-title, [mill-dialog-title]',
})
export class MillDialogTitleDirective {
  @ContentChild(MillTemplateRefDirective) ref: MillTemplateRefDirective;
}

@Directive({
  selector: 'mill-dialog-actions, [mill-dialog-actions]',
})
export class MillDialogActionsDirective {
  @ContentChild(MillTemplateRefDirective) ref: MillTemplateRefDirective;
}

@Directive({
  selector: 'mill-dialog-content, [mill-dialog-content]',
})
export class MillDialogContentDirective {
  @ContentChild(MillTemplateRefDirective) ref: MillTemplateRefDirective;
}
/* tslint:enable:directive-selector */

@Directive({
  selector: 'mill-dialog-close, [mill-dialog-close]',
})
export class MillDialogCloseDirective {

}
