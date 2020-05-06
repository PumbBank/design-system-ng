import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabs-overview',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss', '../../../assets/styles/overview.scss']
})
export class TabsOverview {

  @Input() public disable: boolean;
  @Input() public fullWidth: boolean;

  public tabsContent = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, '

}
