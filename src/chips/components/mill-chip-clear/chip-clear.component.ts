import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'mill-chip-clear',
  templateUrl: './chip-clear.component.html',
  styleUrls: ['./chip-clear.component.scss'],
})
export class ChipClearComponent {
  public defaultButtonText: string = 'Очистити фільтри';

  @Input() disabled: boolean = false;
  @Input() clear(): void { }

  @HostListener('click', ['$event']) _click(event: MouseEvent): void {
    event.stopPropagation();
    this.click();
  }

  constructor() {
  }

  click(): void {
    if (!this.disabled) {
      this.clear();
    }
  }
}
