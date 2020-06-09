import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { SelectComponent } from '../../components/select/select.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  private unsubscriber = new Subject<void>();
  active: boolean;

  constructor(private _elementRef: ElementRef,
              private select: SelectComponent) {
      select.active$.pipe(takeUntil(this.unsubscriber)).subscribe((active: boolean) => {
        this.active = active;
      });
     }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside && this.active) {
          this.clickOutside.emit();
      }

  }

}
