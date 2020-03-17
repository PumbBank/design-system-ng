import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { TabItemBase, TabsBase } from '../../../tabs';
import { animatedTab } from '../../../tabs.animation';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-item.component.html',
	host: {
		'class': 'tab-item',
	},
  animations: [animatedTab.tabAnimation, animatedTab.contentAnimation]
})
export class TabItemComponent extends TabItemBase implements OnInit, OnDestroy {

  public tabPosition: 'left' | 'right' | 'center';

  @Input() public set position(position: number) {
    this._tabPositionIndex = position;
    this._setTabPosition();
  };

  private _tabPositionIndex: number;

  private _setTabPosition() {
    if (this._tabPositionIndex < 0) {
      this.tabPosition = 'left'
    } else if (this._tabPositionIndex > 0) {
      this.tabPosition = 'right'
    } else {
      this.tabPosition = 'center'
    }
  }

	constructor(private _tabs: TabsBase, private _cd: ChangeDetectorRef) {
		super();
	}

	@HostBinding('class.tab-item_active') get selected(): boolean {
	  return this.id === this._tabs.selectedTabId;
  }

	ngOnInit() {
    this._tabs.registerTabItem(this);
    this._tabs.selectedTabId === this.id ? this.tabPosition = 'center' : null;
	}

	ngOnDestroy() {
		this._tabs.unregisterTabItem(this);
	}

}

