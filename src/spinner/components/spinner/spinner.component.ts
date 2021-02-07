import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mill-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @HostBinding('class') public hostClass: string = 'mill-spinner';
  @Input() label: string;
  @Input() description: string;
  @Input() size: 'small' | 'medium' | 'big' = 'medium';

  constructor() {}
}
