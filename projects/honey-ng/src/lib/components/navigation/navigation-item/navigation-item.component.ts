import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-navigation-item',
  templateUrl: './navigation-item.component.html'
})
export class NavigationItemComponent {
  @Input() active: boolean = false;
}
