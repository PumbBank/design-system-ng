import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-checkbox-overview',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss', '../../../assets/styles/overview.scss']
})

export class CheckboxOverviewComponent {
  @Input() label: string;
  @Input() hideLabel: boolean;
  @Input() tabindex: number = 0;
}
