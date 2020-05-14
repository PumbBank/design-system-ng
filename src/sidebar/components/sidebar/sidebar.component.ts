import { Component, Input, OnChanges, SimpleChanges, EventEmitter, OnInit } from '@angular/core';
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
  host: {
    class: 'sidebar',
    '[class.sidebar_collapsed]': 'collapsed'
  }
})
export class SidebarComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges {
  scrolled = false;

  @Input() collapsed = true;
  @Input() collapsedChange = new EventEmitter<boolean>();

  @Input() logo: string;
  @Input() version: string = 'v3.4.2';

  constructor(
    public sidebarController: SidebarController
  ) { super(); }

  ngOnInit(): void {
    this.bindCollapsedWithController();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.collapsed) {
      this.sidebarController.collapsed$
    }
  }

  onScroll(e: Event) {
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