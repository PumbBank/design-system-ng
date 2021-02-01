import { Component } from '@angular/core';
import { DialogService } from '../services/dialog-service';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

const DIALOG_CAPTION = 'Dialog caption';
const DIALOG_BODY_TEXT = 'In either case, a MatSnackBarRef is returned. This can be used to dismiss the snack-bar or to receive notification of when the snack-bar is dismissed. For simple messages with an action, the MatSnackBarRef exposes an observable for when the action is triggered. If you want to close a custom snack-bar that was opened via openFromComponent, from within the component itself, you can inject the MatSnackBarRef.';

@Component({
  selector: 'dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss', '../../assets/styles/overview.scss']
})
export class DialogOverviewComponent {

  constructor( private dialog: DialogService) {}

   openDialog(): void {
    this.dialog.openDialog(DialogContentComponent, {
      data: {
        caption: DIALOG_CAPTION,
        bodyText: DIALOG_BODY_TEXT
      }
    });
  }
}
