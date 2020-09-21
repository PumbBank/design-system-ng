import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'mill-chip-clear',
  templateUrl: './chip-clear.component.html',
  styleUrls: ['./chip-clear.component.scss'],
})
export class ChipClearComponent {
  public defaultButtonText: string = 'Очистити фільтри';

  @Input() disabled: boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('click', ['$event']) _click(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.click();
  }

  constructor() {
  }

  click(): void {
    if (!this.disabled) {
      this.clear.emit();
    }
  }
}
