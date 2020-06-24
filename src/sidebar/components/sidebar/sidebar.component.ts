import { Component, Input, OnChanges, SimpleChanges, EventEmitter, OnInit, HostBinding, Host } from '@angular/core';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { takeUntil } from 'rxjs/operators';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';

@Component({
  selector: 'mill-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    SidebarController
  ],
})
export class SidebarComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges {
  scrolled: boolean = false;

  @HostBinding('class') readonly hostClass: string = 'sidebar';
  @HostBinding('class.sidebar_collapsed') get collapsedClass(): boolean { return this.collapsed; }

  @Input() collapsed: boolean = false;
  @Input() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() logo: string;
  @Input() version: string = 'v3.4.2';

  constructor(
    public sidebarController: SidebarController
  ) { super(); }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.collapsed) {
    //   this.sidebarController.collapsed$;
    // }
  }

  onScroll(e: Event): void {
    this.scrolled = (e.target as HTMLElement).scrollTop > 0;
  }

  collapsedToggle(): boolean {
    return this.sidebarController.collapsedToggle();
  }

  private bindCollapsedWithController(): void {
    this.collapsed = this.sidebarController.collapsed$.value;
    this.sidebarController.collapsed$
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((collapsed: boolean) => {
        this.collapsed = collapsed;
        this.collapsedChange.emit(collapsed);
      });
  }
}
