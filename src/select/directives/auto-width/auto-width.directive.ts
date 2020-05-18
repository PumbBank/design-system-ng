import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autoWidth]'
})
export class AutoWidthDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') onKeyUp() {
    this.resize();
  }

  @HostListener('focus') onFocus() {
    this.resize();
  }

  private resize() {
    this.el.nativeElement.setAttribute('size', this.el.nativeElement.value.length);
  }

}
