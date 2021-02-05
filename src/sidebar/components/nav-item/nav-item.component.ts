import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent extends ComponentWithUnsubscriber implements OnInit, AfterContentInit, AfterViewInit {
  private _active: boolean | string;

  @ContentChildren(NavItemComponent) componentContent: QueryList<NavItemComponent>;

  get withSubitems(): boolean {
    return this.componentContent && this.componentContent.length > 1;
  }

  get collapsed$(): boolean {
    return this._sidebarController?.collapsed$?.value;
  }

  isSubItem: boolean = false;

  collapsed: boolean;
  expanded: boolean;
  helpMenuOpen: string;

  @Input() icon: string;

  @Input()
  public set active(value: boolean | string) {
    this._active = value === 'true' || value === true;
  }
  public get active(): boolean | string {
    return this._active;
  }

  constructor(
    private _sidebarController: SidebarController,
    private _cdr: ChangeDetectorRef
  ) { super(); }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  ngAfterContentInit(): void {
    this.markChildMenuItemsAsSubItem();
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
  }

  expand(): void {
    if (!this.withSubitems) { return; }
    this.expanded = !this.expanded;
  }

  private bindCollapsedWithController(): void {
    if (!this._sidebarController) { return; }

    this.collapsed = this._sidebarController.collapsed$.value;
    this._sidebarController.collapsed$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((collapsed: boolean) => {
        this.collapsed = collapsed;
        this._cdr.markForCheck();
      });
  }


  private markChildMenuItemsAsSubItem(): void {
    this.componentContent
      .filter(item => item !== this)
      .forEach(item => {
        item.isSubItem = true;
      });
    this._cdr.markForCheck();
  }
}
