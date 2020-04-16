import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-overview',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss']
})

export class RadioOverviewComponent {
  @Input() label: string;
}
