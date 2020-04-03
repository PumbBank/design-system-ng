import { Component } from '@angular/core';

@Component({
  selector: 'badge-overview',
  templateUrl: './badge-overview.component.html',
  styleUrls: ['./badge-overview.component.scss']
})
export class BadgeOverview {
  public types = ['basic', 'filled', 'minimal'];
  public colors = ['green', 'orange', 'red', 'black', 'grey', 'blue'];
}
