import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-radio-overview',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss', '../../assets/styles/overview.scss']
})

export class RadioOverviewComponent {
  @Input() label: string;
  @Input() hideLabel: boolean;

  oneGroup = 'oneGroup';
}
