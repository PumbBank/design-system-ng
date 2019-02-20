import { Component, Input } from '@angular/core';

@Component({
  selector: 'fuui-fab',
  templateUrl: './fab.component.html'
})
export class FabComponent {
  @Input() icon: string;
}
