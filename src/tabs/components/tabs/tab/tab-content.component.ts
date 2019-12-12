import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
	selector: 'mill-tab',
	templateUrl: './tab-content.component.html',
	styleUrls: ['./tab-content.component.scss'],
	host: {
		'[class.tab_active]' : 'isSelected',
	}
})
export class TabContentComponent implements OnInit, AfterViewInit {

	@Input() public label: string;
	@Input() public template: TemplateRef<any>;
	@Input() public id: number;
	@Input() public isSelected: boolean;

	public element: ElementRef;

	constructor(private _elementRef: ElementRef) {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.element = this._elementRef;
	}

}
