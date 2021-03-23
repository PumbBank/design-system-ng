import {
  Component,
  AfterContentInit,
  ContentChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  HostBinding,
  Renderer2,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ComponentWithUnsubscriber } from '../../../utils';
import { NavContentHeadComponent } from '../nav-content-head/nav-content-head.component';
import { takeUntil } from 'rxjs/operators';
import { SidebarController } from '../../services/sidebar-cotroller.service';
@Component({
  selector: 'nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavContentComponent extends ComponentWithUnsubscriber implements AfterContentInit, OnInit {

  @ContentChild(NavContentHeadComponent) contentHead: NavContentHeadComponent;
  @ViewChild('contenPlace') contenPlace: ElementRef;
  @HostBinding('class.nav-content_collapsed') get collapsedClass(): boolean { return !this.collapsed; }

  @HostListener('scroll', ['$event'])
    onScrollw(e) {
      this.onScroll(e);

    }

  @Output() scrollNavContent: EventEmitter<{scrollEvent: Event, contentHead: NavContentHeadComponent}> =
    new EventEmitter<{scrollEvent: Event, contentHead: NavContentHeadComponent}>();

  isContentHead: boolean;
  collapsed: boolean;
  constructor(private _sidebarController: SidebarController,
    private _cdr: ChangeDetectorRef,
    private _renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  ngAfterContentInit(): void {
    if (!!this.contentHead) this.isContentHead = true;
  }

  onScroll(e: Event) {
    if (!this.contentHead) {
      return;
    }

    const target = <HTMLTextAreaElement>e.target;
    this._renderer.setStyle(this.contentHead.el.nativeElement, 'transform', 'scale(' + (1 - (target.scrollTop * 0.2 / 100))+')' );
    this._renderer.setStyle(this.contentHead.el.nativeElement, 'opacity', 1 - (target.scrollTop * 2 / 100));

    this.scrollNavContent.next({scrollEvent: e, contentHead: this.contentHead});
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
