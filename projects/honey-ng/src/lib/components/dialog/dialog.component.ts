import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hn-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  @Input() backgropClose: boolean = false;
  @Input() active: boolean = false;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  backdropClick(): void {
    if (this.backgropClose) {
      this.active = false;
      this.activeChange.emit(false);
    }
  }
}
