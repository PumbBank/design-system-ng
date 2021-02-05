import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mill-icon',
  templateUrl: './icon.component.html',
  styles: [':host {display: flex;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() public size: '12' | '24' | '36' = '24';
  @Input() public name: string;
  @Input() public color: string = 'currentColor';

  public get iconSize(): string {
    return `icon_${this.size}`;
  }

  public get iconName(): string {
    return this.name ? `icon_${this.name}` : '';
  }

  @HostBinding('style.width') get iconWidth(): string {
    return `${this.size}px`;
  }

  @HostBinding('style.height') get iconHeight(): string {
    return `${this.size}px`;
  }
}
