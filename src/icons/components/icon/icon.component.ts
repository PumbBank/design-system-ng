import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mill-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {

  @Input() public small = false;
  @Input() public name: string;
  @Input() public color: string;

  get iconName() {
    return this.name ? `icon_${this.name}` : null
  }
}
