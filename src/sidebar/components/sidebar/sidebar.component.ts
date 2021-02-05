import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  OnInit,
  HostBinding,
  AfterContentInit,
  ContentChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { NavContentComponent } from '../nav-content/nav-content.component';

@Component({
  selector: 'mill-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges, AfterContentInit {
  scrolled: boolean = false;

  // @HostBinding('class') readonly hostClass: string = 'sidebar';
  // @HostBinding('class.sidebar_collapsed') get collapsedClass(): boolean { return this.collapsed; }
  @HostBinding('style.width') width: string = 'fit-content';
  @ContentChild(NavContentComponent) navContent: NavContentComponent;

  @Input() collapsed: boolean = false;
  @Input() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() logo: string;
  @Input() version: string = 'v3.4.2';

  constructor(
    private _sidebarController: SidebarController,
    private _cdr: ChangeDetectorRef
  ) { super(); }

  ngAfterContentInit(): void {
    if (!!this.navContent) {
      this.width = '100%';
    }
  }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.collapsed) {
    //   this._sidebarController.collapsed$;
    // }
  }

  onScroll(e: Event): void {
    this.scrolled = (e.target as HTMLElement).scrollTop > 0;
  }

  collapsedToggle(): boolean {
    return this._sidebarController.collapsedToggle();
  }

  private bindCollapsedWithController(): void {
    this.collapsed = this._sidebarController.collapsed$.value;
    this._sidebarController.collapsed$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((collapsed: boolean) => {
        this.collapsed = collapsed;
        this._cdr.detectChanges();
        this.collapsedChange.emit(collapsed);
      });
  }
}
