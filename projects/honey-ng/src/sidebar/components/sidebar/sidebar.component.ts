import { Component, Input } from '@angular/core';

@Component({
  selector: 'hn-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() theme: '' | 'default' = '';

  get themeClass(): string {
    return this.theme ? `hn-sidebar_${this.theme}` : '';
  }
}
