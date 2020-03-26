import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mill-icon',
  templateUrl: './icon.component.html',
  styles: [':host {display: flex}']
})
export class IconComponent {
  @Input() public size: '12' | '24' | '36' = '24';
  @Input() public name: string;
  @Input() public color: string;

  get iconSize() {
    return `icon_${this.size}`;
  }

  get iconName() {
    return this.name ? `icon_${this.name}` : null
  }

  @HostBinding('style.width') get iconWidth() {
    return `${this.size}px`
  }

  @HostBinding('style.height') get iconHeight() {
    return `${this.size}px`
  }
}
