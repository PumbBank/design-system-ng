import { Component, Inject } from "@angular/core";
import { DIALOG_CONTROLLER } from '../../shared/dialog';

@Component({
  selector: 'aaahn-overlay',
  template: '<div class="hn-overlay" (click)="onClick()"></div>'
})
export class OverlayComponent {
  constructor(
    @Inject(DIALOG_CONTROLLER) private dialogController: any
  ) { }

  onClick(): void {
    this.dialogController.emitBackdropClick();
  }
}
