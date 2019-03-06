import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() icon: string;
}
