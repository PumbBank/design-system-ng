import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { TabItemBase, TabsBase } from '../tabs';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-item.component.html',
	host: {
		'class': 'tab-item',
		'[class.tab-item_active]': 'id === _tabs.selectedTabId.getValue()'
	}
})
export class TabItemComponent extends TabItemBase implements OnInit, OnDestroy {

	@Input() public label: string;
	@Input() public id: string;

	constructor(
		private _el: ElementRef,
		private _tabs: TabsBase
	) {
		super();
	}

	ngOnInit() {
		this._tabs.tabItems.subscribe(item => {
			if (!this.id) {
				const index = item.indexOf(this);
				if (index !== -1) {
					this.id = index.toString();
				}
			}
		});

		const array = this._tabs.tabItems.getValue();
		array.push(this);
		this._tabs.tabItems.next(array);
	}

	ngOnDestroy() {
		this._tabs.tabItems.next(this._tabs.tabItems.getValue().filter(i => i.id !== this.id));
	}
}

