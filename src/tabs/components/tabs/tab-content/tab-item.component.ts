import { Component, Input } from '@angular/core';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-item.component.html',
	host: {
	  'class' : 'tab-item',
		'[class.tab-item_active]' : 'selected',
	}
})
export class TabItemComponent {
	@Input() public label: string;
	@Input() public id: string;
	@Input() public selected: boolean;
}
