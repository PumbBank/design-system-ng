import { Component } from '@angular/core';
import { ButtonView } from '../../../button/models/button-parameters.model';
import { HorizontalPosition, SnackBarConfig, VerticalPosition } from '../../models/snackbar-config.model';
import { SnackBarService } from '../../services/snackbar.service';

const ALERT_TEXT = `Lorem Ipsum is simply dummy text of the
 printing and typesetting industry. Lorem Ipsum has been the industry's standard`

@Component({
  selector: 'snackbar-overview',
  templateUrl: './snackbar-overview.component.html',
  styleUrls: ['./snackbar-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class SnackBarOverviewComponent {

  configAlert = new SnackBarConfig();
  configNotification = new SnackBarConfig();
  constructor(private snk: SnackBarService) {
    this.configAlert.type = 'alert';
    this.configAlert.horizontalPosition = HorizontalPosition.center;
    this.configAlert.verticalPosition = VerticalPosition.bottom;

    this.configAlert.buttons = [
      {
        buttonText: 'ok',
        buttonView: ButtonView.ghost,
        action: () => console.log('dsdaaaaaaa')
      }
    ];

    this.configNotification.type = 'notification';
    this.configNotification.duration = 5000;
  }

  openAlert() {
    this.snk.open(ALERT_TEXT, this.configAlert);
  }

  openNotification(): void {
    this.snk.open(ALERT_TEXT, this.configNotification);
  }
}
