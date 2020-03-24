import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pin-input-overview',
  templateUrl: './pin-input-page.component.html',
  styleUrls: ['./pin-input-page.component.scss']
})
export class PinInputOverviewComponent {

  @Input() label: string
  @Input() fn: Function;

}
