import { Directive, ElementRef, Host, HostListener } from '@angular/core';
import { ChipComponent } from '../components/chip/chip.component';

@Directive({
  selector: '[millChipRemove]',
})
export class ChipRemoveDirective {
  @HostListener('click', ['$event.target']) clicking(target: ElementRef): void {
    if (!this.chipsComponent.disabled) {
      this.chipsComponent.remove();
    }
  }

  constructor(private element: ElementRef, @Host() private chipsComponent: ChipComponent) {

  }
}
