import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mill-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
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
