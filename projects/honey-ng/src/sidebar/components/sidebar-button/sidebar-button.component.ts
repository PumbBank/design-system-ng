import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-sidebar-button',
  template: `
    <div class="hn-sidebar__button">
      <span class="hn-icon hn-sidebar__icon" *ngIf="!!icon"> {{ icon }} </span>
      <ng-content></ng-content>
    </div>`
})
export class SidebarButtonComponent {
  @Input() icon: string;
}
