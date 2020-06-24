import { Component, Input } from '@angular/core';

enum BadgeColorEnum {
  green = 'green',
  orange = 'orange',
  red = 'red',
  black = 'black',
  grey = 'grey',
  blue = 'blue'
}

enum BadgeTypeEnum {
  basic = 'basic',
  filled = 'filled',
  minimal = 'minimal'
}

@Component({
  selector: 'mill-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})

export class BadgeComponent {
  @Input() public type: BadgeTypeEnum = BadgeTypeEnum.basic;
  @Input() public color: BadgeColorEnum = BadgeColorEnum.green;
  @Input() public icon: string = 'valid';
  public badgeTypeEnum: any = BadgeTypeEnum;
  public badgeColorEnum: any = BadgeColorEnum;
}
