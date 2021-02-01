import { Component, Inject } from "@angular/core";
import { DIALOG_SERVICE_CONTROLLER, DialogServiceController } from '../../shared/dialog';

@Component({
  selector: 'aaahn-overlay',
  template: '<div class="mill-overlay" (click)="onClick()"></div>',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
  constructor(
    @Inject(DIALOG_SERVICE_CONTROLLER) private dialogServiceController: DialogServiceController
  ) { }

  onClick(): void {
    this.dialogServiceController.emitBackdropClick();
  }
}
