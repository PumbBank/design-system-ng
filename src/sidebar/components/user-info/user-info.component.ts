import { Component, Input, OnInit, SimpleChanges, OnChanges, Optional } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { SidebarController } from '../../../sidebar/services/sidebar-cotroller.service';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  host: {
    '[class.uesr-info_collapsed]': 'collapsed',
    '[@collapsing]': 'collapsed ? "collapsed" : "uncollapsed"'
  },
  animations: [
    trigger('collapsing', [
      state('collapsed', style({ height: '0px', width: '0px', border: '0px transparent solid' })),
      state('uncollapsed', style({ height: '*', width: '232px' })),
      transition('collapsed <=> uncollapsed', [
        animate('299ms ease')
      ])
    ])
  ]
})
export class UserInfoComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges {
  avatarStyle: SafeStyle;

  @Input() avatar: string;
  @Input() username: string;
  @Input() additional: string;

  collapsed: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    @Optional() public sidebarController: SidebarController
  ) { super(); }

  ngOnInit(): void {
    this.updateAvatarStyle();
    this.bindCollapsedWithController();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.avatar) {
      this.updateAvatarStyle();
    }
  }

  private updateAvatarStyle(): void {
    this.avatarStyle = this.sanitizer
      .bypassSecurityTrustStyle(`background-image: url('${this.avatar}')`);
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
