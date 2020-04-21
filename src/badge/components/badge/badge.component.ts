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
  @Input() public type = BadgeTypeEnum.basic;
  @Input() public color = BadgeColorEnum.green;
  @Input() public icon = 'valid';
  public badgeTypeEnum = BadgeTypeEnum;
  public badgeColorEnum = BadgeColorEnum;
}
