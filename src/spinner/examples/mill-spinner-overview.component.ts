import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-spinner-overview',
  templateUrl: './mill-spinner-overview.component.html',
  styleUrls: ['./mill-spinner-overview.component.scss', '../../assets/styles/overview.scss']
})
export class SpinnerOverviewComponent {
  @Input() label: string;

  constructor() {
  }
}
