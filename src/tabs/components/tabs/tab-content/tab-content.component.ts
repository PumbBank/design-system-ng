import { Component, Input } from '@angular/core';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-content.component.html',
	styleUrls: ['./tab-content.component.scss'],
	host: {
		'[class.tab_active]' : 'isSelected',
	}
})
export class TabContentComponent {

	@Input() public label: string;
	@Input() public id: number;
	@Input() public isSelected: boolean;

	constructor() {
	}

}
