import { Component, Input } from '@angular/core';

@Component({
  selector: 'tooltip-overview',
  templateUrl: './tooltip-overview.component.html',
  styleUrls: ['./tooltip-overview.component.scss', '../../assets/styles/overview.scss']
})
export class TooltipOverviewComponent {
  @Input() flow: string;

  constructor() {
  }
}
