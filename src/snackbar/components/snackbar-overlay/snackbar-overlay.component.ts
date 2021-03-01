import { animate, style, transition, trigger } from "@angular/animations";
import { Component, HostBinding} from "@angular/core";

@Component({
  selector: 'snackbar-overlay',
  template: `
    <snackbar></snackbar>
  `,
  styleUrls: ['./snackbar-overlay.component.scss'],
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
export class SnackBarOverlayComponent {
  @HostBinding('@slideInOut') get slideIn() {
    return ;
  }  
}
