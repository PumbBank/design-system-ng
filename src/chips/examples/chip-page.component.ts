import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-chip-overview',
  templateUrl: './chip-page.component.html',
  styleUrls: ['./chip-page.component.scss', '../../assets/styles/overview.scss']
})
export class ChipOverviewComponent {
  @Input() label: string;

  constructor() {

  }

  someMethod(event: any, count: number): void {

  }
}
