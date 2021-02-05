import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils';
import { SidebarController } from '../..';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mill-nav-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./nav-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTitleComponent extends ComponentWithUnsubscriber implements OnInit {
  collapsed: boolean;

  @HostBinding('class.nav-item_collapsed') get collapsedClass(): boolean { return this.collapsed; }

  constructor(
    private _sidebarController: SidebarController,
    private _cdr: ChangeDetectorRef
  ) { super(); }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  private bindCollapsedWithController(): void {
    if (!this._sidebarController) {
      return;
    }

    this.collapsed = this._sidebarController.collapsed$.value;
    this._sidebarController.collapsed$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((collapsed: boolean) => {
        this.collapsed = collapsed;
        this._cdr.markForCheck();
      });
  }
}
