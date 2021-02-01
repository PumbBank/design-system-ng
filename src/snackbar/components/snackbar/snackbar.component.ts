import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { SnackBarService, SNACK_BAR_DATA } from '../../services/snackbar.service';
import { HorizontalPosition, SnackBarConfig, VerticalPosition } from '../../models/snackbar-config.model';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(
        ':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]
      ),
      transition(
        ':leave', [
        animate('0.2s', style({ opacity: 0, transform: 'translateY(100px)' })),
      ]
      )
    ])
  ]
})

export class SnackBarComponent implements OnInit {
  justifyContent: string;
  alignItems: string;
  timeoutId: any;
  snackbarType: 'alert' | 'notification' | undefined;

  constructor(
    @Inject(SNACK_BAR_DATA) public snackbarData: any
  ) { }

  ngOnInit(): void {    
    const config = (this.snackbarData.data.config as SnackBarConfig);
    this.snackbarType = config.type;
    this.setHorizontalPosition(config.horizontalPosition);
    this.setVerticalPosition(config.verticalPosition);

    if (config.duration > 0) {

      this.timeoutId = setTimeout(() => {
        this.snackbarType = undefined;
      }, config.duration);
    }
  }

  onClick(fn: Function): void {
    this.snackbarType = undefined;
    fn();
    clearTimeout(this.timeoutId);
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
