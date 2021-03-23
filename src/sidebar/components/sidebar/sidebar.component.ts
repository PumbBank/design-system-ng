import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  OnInit,
  HostBinding,
  AfterContentInit,
  ContentChild, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { ComponentWithUnsubscriber } from '../../../utils';
import { NavContentComponent } from '../nav-content/nav-content.component';
import { NavContentHeadComponent } from '../nav-content-head/nav-content-head.component';

const MAX_WIDTH_PHONE = 767;
const MAX_WIDTH_TABLET = 1023;

@Component({
  selector: 'mill-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges, AfterContentInit {
  scrolled: boolean = false;
  get isWidthTabletPhone() {
    return window.innerWidth <= MAX_WIDTH_TABLET;
  }
  // @HostBinding('class') readonly hostClass: string = 'sidebar';
  // @HostBinding('class.sidebar_collapsed') get collapsedClass(): boolean { return this.collapsed; }
  @HostBinding('style.width') width: string = 'fit-content';
  @ContentChild(NavContentComponent) navContent: NavContentComponent;
  @ViewChild('burger') burger: ElementRef;

  @Input() collapsed: boolean = false;
  @Input() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() logo: string;
  @Input() version: string = 'v3.4.2';

  constructor(
    private _sidebarController: SidebarController,
    private _cdr: ChangeDetectorRef,
    private _renderer: Renderer2
  ) { super(); }

  ngAfterContentInit(): void {
    if (!!this.navContent) {
      this.width = '100%';
    }

    this.navContent.scrollNavContent.subscribe((e: { scrollEvent: Event, contentHead: NavContentHeadComponent }) => {
      this.burgerShiftWhenScrolling(e);
    });
  }

  ngOnInit(): void {
    this.setCollapsedState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.collapsed) {

    }
  }

  onScroll(e: Event): void {
    this.scrolled = (e.target as HTMLElement).scrollTop > 0;
  }

  collapsedToggle(): boolean {
    this.burgerTransformAfterCollapsed(this.collapsed);
    return this._sidebarController.collapsedToggle();
  }

  private burgerShiftWhenScrolling(e: { scrollEvent: Event, contentHead: NavContentHeadComponent }) {
    const target = <HTMLTextAreaElement>e.scrollEvent.target;
    const headHeight = e.contentHead.el.nativeElement.clientHeight;

    if (window.innerWidth > MAX_WIDTH_PHONE &&
      window.innerWidth <= MAX_WIDTH_TABLET &&
      target.scrollTop > (headHeight - 50)) {
      this._renderer.setStyle(this.burger.nativeElement, 'transform', 'translateX(10px)');
    } else if (window.innerWidth > MAX_WIDTH_PHONE &&
      window.innerWidth <= MAX_WIDTH_TABLET &&
      target.scrollTop <= (headHeight - 50)) {
      this._renderer.setStyle(this.burger.nativeElement, 'transform', 'translateX(0)');
    }
  }

  private setCollapsedState() {
    if (this.isWidthTabletPhone) {
      this._sidebarController.collapsed$.next(true);
      this.bindCollapsedWithController();
    } else {
      this._sidebarController.collapsed$.next(this.collapsed);
      this.bindCollapsedWithController();
    }
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

  private burgerTransformAfterCollapsed(collapsed: boolean) {
    if (collapsed) {
      this._renderer.addClass(this.burger.nativeElement, 'reset-translate');
    } else {
      this._renderer.removeClass(this.burger.nativeElement, 'reset-translate');
    }
  }
}
