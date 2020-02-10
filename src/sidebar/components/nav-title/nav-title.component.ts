import { Component, OnInit, Optional } from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mill-nav-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./nav-title.component.scss'],
  host: {
    '[class.nav-item_collapsed]': 'collapsed'
  }
})
export class NavTitleComponent extends ComponentWithUnsubscriber implements OnInit {
  collapsed: boolean;
  
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