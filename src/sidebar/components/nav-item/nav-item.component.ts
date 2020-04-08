import { Component, Input, Optional, ViewChild, ElementRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'mill-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
      })),
      state('out', style({
        opacity: '0',
        height: '0px',
      })),
      transition('in => out', animate('299ms ease-in-out')),
      transition('out => in', animate('299ms ease-in-out'))
    ])
  ]
})
export class NavItemComponent extends ComponentWithUnsubscriber implements AfterContentInit {
  private _active;

  @ContentChildren(NavItemComponent) componentContent: QueryList<NavItemComponent>;

  get withSubitems(): boolean {
    return this.componentContent && this.componentContent.length > 1;
  }

  isSubitem: boolean = false;

  collapsed: boolean;
  expanded: boolean;
  helpMenuOpen: string;

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

  ngAfterContentInit(): void {
    this.markChildMenuItemsAsSubitem();
  }

  expand() {
    if (!this.withSubitems) { return; }
    this.expanded = !this.expanded;
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


  private markChildMenuItemsAsSubitem() {
    this.componentContent
      .filter(item => item !== this)
      .forEach(item => {
        item.isSubitem = true;
      });
  }
}