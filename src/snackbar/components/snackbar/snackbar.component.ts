import { Component, Inject, OnInit } from '@angular/core';
import { HorizontalPosition, SnackBarConfig, VerticalPosition } from '../../models/snackbar-config.model';
import { SNACK_BAR_CONTROLLER, SNACK_BAR_DATA } from '../../shared/snackbar';
import { ISnackbarConroller } from '../../models/snackbar-controller.model';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})

export class SnackBarComponent implements OnInit {
  justifyContent: string;
  alignItems: string;
  timeoutId: any;
  snackbarType: 'alert' | 'notification' | undefined;

  constructor(
    @Inject(SNACK_BAR_DATA) public snackbarData: any,
    @Inject(SNACK_BAR_CONTROLLER) public snc: ISnackbarConroller
  ) { }

  ngOnInit(): void {    
    const config = (this.snackbarData.data.config as SnackBarConfig);
    this.snackbarType = config.type;
    this.setHorizontalPosition(config.horizontalPosition);
    this.setVerticalPosition(config.verticalPosition);

    if (config.duration > 0) {

      this.timeoutId = setTimeout(() => {
        this.snc.close();
      }, config.duration);
    }
  }

  onClick(fn: Function): void {
    
    fn();
    clearTimeout(this.timeoutId);
    this.snc.close();
  }

  private setHorizontalPosition(val: HorizontalPosition): void {
    switch (val) {
      case HorizontalPosition.center:
        this.justifyContent = 'center'
        break;
      case HorizontalPosition.right:
        this.justifyContent = 'flex-end'
        break;
      case HorizontalPosition.left:
        this.justifyContent = 'flex-start'
        break;
      default:
        break;
    }
  }

  private setVerticalPosition(val: VerticalPosition) {
    switch (val) {
      case VerticalPosition.center:
        this.alignItems = 'center'
        break;
      case VerticalPosition.bottom:
        this.alignItems = 'flex-end'
        break;
      case VerticalPosition.top:
        this.alignItems = 'flex-start'
        break;
      default:
        break;
    }
  }
}
