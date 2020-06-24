import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mill-icon',
  templateUrl: './icon.component.html',
  styles: [':host {display: flex;}']
})
export class IconComponent {
  @Input() public size: '12' | '24' | '36' = '24';
  @Input() public name: string;

  public get iconSize(): string {
    return `icon_${this.size}`;
  }

  public get iconName(): string {
    return this.name ? `icon_${this.name}` : null;
  }

  @HostBinding('style.width') get iconWidth(): string {
    return `${this.size}px`;
  }

  @HostBinding('style.height') get iconHeight(): string {
    return `${this.size}px`;
  }
}
