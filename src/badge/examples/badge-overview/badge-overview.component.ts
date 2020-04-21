import { Component } from '@angular/core';

@Component({
  selector: 'badge-overview',
  templateUrl: './badge-overview.component.html',
  styleUrls: ['./badge-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class BadgeOverviewComponent {
  public types = ['basic', 'filled', 'minimal'];
  public colors = ['green', 'orange', 'red', 'black', 'grey', 'blue'];
}
