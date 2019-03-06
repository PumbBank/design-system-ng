import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-fab',
  templateUrl: './fab.component.html'
})
export class FabComponent {
  @Input() icon: string;
}
