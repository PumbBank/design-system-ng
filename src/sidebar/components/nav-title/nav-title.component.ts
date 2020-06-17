import { Component, HostBinding, OnInit, Optional } from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils';
import { SidebarController } from '../..';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mill-nav-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./nav-title.component.scss'],
})
export class NavTitleComponent extends ComponentWithUnsubscriber implements OnInit {
  collapsed: boolean;

  @HostBinding('class.nav-item_collapsed') get collapsedClass(): boolean { return this.collapsed; }

  constructor(
    @Optional() public sidebarController: SidebarController
  ) { super(); }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  private bindCollapsedWithController(): void {
    if (!this.sidebarController) { return; }

    this.collapsed = this.sidebarController.collapsed$.value;
    this.sidebarController.collapsed$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((collapsed: boolean) => {
        this.collapsed = collapsed;
      });
  }
}
