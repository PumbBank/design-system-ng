import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-overview',
  templateUrl: './button-overview.component.html',
  styleUrls: ['./button-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class ButtonOverview {
  @Input() public label: string;
}
