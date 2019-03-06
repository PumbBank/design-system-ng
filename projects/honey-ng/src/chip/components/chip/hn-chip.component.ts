import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-chip',
  templateUrl: './hn-chip.component.html'
})
export class ChipComponent {
  @Input() active: boolean = false;
}
