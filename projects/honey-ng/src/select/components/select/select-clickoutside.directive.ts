import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[hnClickOutside]'
})
export class ClickOutsideDirective {

  @Output()
  public hnClickOutside = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
        this.hnClickOutside.emit(null);
    }
  }
}
