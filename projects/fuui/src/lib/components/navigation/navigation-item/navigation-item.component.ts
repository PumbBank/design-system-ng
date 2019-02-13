import { Component, Input } from '@angular/core';

@Component({
  selector: 'fuui-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() active: boolean = false;
}
