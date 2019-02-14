import { Component, Input } from '@angular/core';

@Component({
  selector: 'fuui-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent {
  @Input() icon: string;
}
