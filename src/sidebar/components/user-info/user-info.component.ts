import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  HostBinding,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { SidebarController } from '../../services/sidebar-cotroller.service';
import { ComponentWithUnsubscriber } from '../../../utils/component-with-unsubscriber';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [
    trigger('collapsing', [
      state('collapsed', style({ height: '0px', width: '0px', border: '0px transparent solid' })),
      state('uncollapsed', style({ height: '*', width: '232px' })),
      transition('collapsed <=> uncollapsed', [
        animate('299ms ease')
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent extends ComponentWithUnsubscriber implements OnInit, OnChanges {
  avatarStyle: SafeStyle;

  @HostBinding('class.nav-item_collapsed') get collapsedClass(): boolean { return this.collapsed; }
  @HostBinding('@collapsing') get animation(): string { return this.collapsed ? 'collapsed' : 'uncollapsed'; }

  @Input() avatar: string;
  @Input() username: string;
  @Input() additional: string;

  collapsed: boolean;

  constructor(
    private _sidebarController: SidebarController,
    private _sanitizer: DomSanitizer,
    private _cdr: ChangeDetectorRef
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
    this.avatarStyle = this._sanitizer
      .bypassSecurityTrustStyle(`background-image: url('${this.avatar}')`);
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
}
