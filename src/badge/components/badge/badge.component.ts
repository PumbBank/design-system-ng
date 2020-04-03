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

  public colors = {
    green: '#66BB6A',
    orange: '#F57F17',
    red: '#F91F2B',
    black: '#4D4D5C',
    grey: '#93939E',
    blue: '#6BB0C9',
    white: '#F5F5FA'
  };

  public badgeTypeEnum = BadgeTypeEnum;
  public badgeColorEnum = BadgeColorEnum;
}
