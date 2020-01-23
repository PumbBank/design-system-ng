import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { TabsBase } from '../tabs';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
	selector: 'tab-label',
	templateUrl: './tab-label.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'(click)': 'onClick()',
	},
})
export class TabLabelComponent {

	@Input()
	set relatedTab(tabItem: TabItemComponent) {
		if (tabItem) {
			this._relatedTab = tabItem;
			if (tabItem.id === this._tabs.selectedTabId.getValue()) {
				this._tabs.selectedLabel = this._el.nativeElement;
			}
		}
	}

	get relatedTab(): TabItemComponent {
		return this._relatedTab;
	}

	private _relatedTab: TabItemComponent;
	
	constructor(
		private _el: ElementRef,
		private _tabs: TabsBase
	) {}

	public onClick() {
		this._tabs.selectedTabId.next(this.relatedTab.id);
		this._tabs.selectedLabel = this._el.nativeElement;
	}
}
