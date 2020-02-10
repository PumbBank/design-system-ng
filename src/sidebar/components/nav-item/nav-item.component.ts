import { Component, Input, Optional } from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mill-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  host: {
    '[class.nav-item_active]': 'active',
    '[class.nav-item_collapsed]': 'collapsed'
  }
})
export class NavItemComponent extends ComponentWithUnsubscriber {
  private _active;

  collapsed: boolean;

  @Input() icon: string;

  @Input()
  public set active(value: any) {
    this._active = value === 'true' || value === true;
  }
  public get active() {
    return this._active;
  }

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