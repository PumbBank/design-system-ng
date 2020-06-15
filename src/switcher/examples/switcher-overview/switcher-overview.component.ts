import { Component } from '@angular/core';

@Component({
  selector: 'switcher-overview',
  templateUrl: './switcher-overview.component.html',
  styleUrls: ['./switcher-overview.component.scss', '../../../assets/styles/overview.scss']
})

export class SwitcherOverviewComponent {
  switcherActive: any = null;

  constructor() {
    setTimeout(() => {
      this.switcherActive = true;
    }, 10000);
  }
}
