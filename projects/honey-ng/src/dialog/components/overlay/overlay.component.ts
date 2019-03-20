import { Component, Inject } from '@angular/core';
import { DIALOG_SERVICE_CONTROLLER, DialogServiceController } from '../../shared/dialog';

@Component({
  selector: 'hn-overlay',
  template: '<div class="hn-overlay" (click)="onClick()"></div>'
})
export class OverlayComponent {
  constructor(
    @Inject(DIALOG_SERVICE_CONTROLLER) private dialogServiceController: DialogServiceController
  ) { }

  onClick(): void {
    this.dialogServiceController.emitBackdropClick();
  }
}
