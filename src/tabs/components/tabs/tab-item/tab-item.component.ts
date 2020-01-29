import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TabItemBase, TabsBase } from '../../../tabs';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-item.component.html',
	host: {
		'class': 'tab-item',
	}
})
export class TabItemComponent extends TabItemBase implements OnInit, OnDestroy {

	constructor(private _tabs: TabsBase) {
		super();
	}

	@HostBinding('class.tab-item_active') get selected(): boolean {
	  return this.id === this._tabs.selectedTabId.getValue();
  }

	ngOnInit() {
    this._tabs.registerTabItem(this);
	}

	ngOnDestroy() {
		this._tabs.unregisterTabItem(this);
	}
}

