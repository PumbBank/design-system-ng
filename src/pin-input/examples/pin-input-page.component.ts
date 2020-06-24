import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pin-input-overview',
  templateUrl: './pin-input-page.component.html',
  styleUrls: ['./pin-input-page.component.scss', '../../assets/styles/overview.scss']
})

export class PinInputOverviewComponent {
  @Input() label: string;
  @Input() fn: (event: Event) => {};
}
