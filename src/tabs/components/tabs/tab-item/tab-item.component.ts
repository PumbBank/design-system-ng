import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TabItemBase, TabsBase } from '../../../tabs';
import { animatedTab } from '../../../tabs.animation';

@Component({
  selector: 'mill-tab',
  templateUrl: './tab-item.component.html',
  animations: [animatedTab.tabAnimation, animatedTab.contentAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabItemComponent extends TabItemBase implements OnInit, OnDestroy {
  private _tabPositionIndex: number;
  public tabPosition: 'left' | 'right' | 'center';

  @Input()
  public set position(position: number) {
    this._tabPositionIndex = position;
    this._setTabPosition();
  }

  @HostBinding('class.tab-item') public cssTabItem: boolean = true;
  @HostBinding('class.tab-item_active') get selected(): boolean {
    return this.id === this._tabs.selectedTabId;
  }

  constructor(private _tabs: TabsBase, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this._tabs.registerTabItem(this);
    if (this._tabs.selectedTabId === this.id) {
      this.tabPosition = 'center';
    }
  }

  ngOnDestroy(): void {
    this._tabs.unregisterTabItem(this);
  }

  private _setTabPosition(): void {
    if (this._tabPositionIndex < 0) {
      this.tabPosition = 'left';
    } else if (this._tabPositionIndex > 0) {
      this.tabPosition = 'right';
    } else {
      this.tabPosition = 'center';
    }
    this._cdr.markForCheck();
  }

}

