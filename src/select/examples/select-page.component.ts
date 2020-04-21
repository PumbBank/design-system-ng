import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-overview',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss', '../../assets/styles/overview.scss']
})
export class SelectOverviewComponent {
  @Input() label: string;
}
