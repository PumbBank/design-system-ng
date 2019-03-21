import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'hn-sidebar-header',
  templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {
  get avatarStyle() {
    const style = `
      background-image: url("${this.avatarUrl}")
    `;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  @Input() avatarUrl: string = '';

  @Input() username: string = '';

  @Output() logOut: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer
  ) { }
}
