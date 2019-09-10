import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][hnDisabled], [formControl][hnDisabled]'
})
export class FormControlDisabledDirective {

  @Input() set hnDisabled(condition: boolean) {
    if (condition) {
      this.ngControl.control.disable();
    } else {
      this.ngControl.control.enable();
    }
  }

  constructor(private ngControl: NgControl) {
  }

}
