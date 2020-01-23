import { Component, Input, ViewEncapsulation } from '@angular/core';

import { TabItemComponent } from './tab-item/tab-item.component';
import { TabsBase } from './tabs';
import { BehaviorSubject } from 'rxjs';


@Component({
	selector: 'mill-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [{provide: TabsBase, useExisting: TabsComponent}]
})
export class TabsComponent implements TabsBase {

	@Input() public type: 'basic' | 'ios' = 'basic';
	@Input() public disabled = false;

	@Input() set selected(value: string) {
		if (value) {
			this.selectedTabId.next(value);
		}
	}

	public tabItems: BehaviorSubject<TabItemComponent[]> = new BehaviorSubject<TabItemComponent[]>([]);
	public selectedTabId: BehaviorSubject<string> = new BehaviorSubject<string>('0');
	public selectedLabel: HTMLElement;

	public barStyles() {
		if (this.selectedLabel) {
			return {'left': this.selectedLabel.offsetLeft + 'px', 'width': this.selectedLabel.offsetWidth + 'px'};
		}
		return {'left': '0px', 'width': '0px'};
	}
}
