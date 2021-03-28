import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-spinner-overview',
  templateUrl: './spinner-overview.component.html',
  styleUrls: ['./spinner-overview.component.scss', '../../assets/styles/overview.scss']
})
export class SpinnerOverviewComponent {
  @Input() label: string;

  constructor() {
  }
}
