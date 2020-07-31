import { Directive, AfterContentInit, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[millDirtyValidator]'
})
export class DirtyValidatorDirective implements AfterContentInit {
  
  @ContentChildren(NgControl) controls: QueryList<any>;
  
  ngAfterContentInit(): void {
    this.controls.forEach((item) => {
      item.valueAccessor.isDirtyValid = true;
    });
  }
}
