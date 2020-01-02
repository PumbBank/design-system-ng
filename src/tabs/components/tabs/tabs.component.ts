import {
	AfterContentInit,
	AfterViewInit,
	Component,
	ContentChildren, ElementRef,
	Input,
	OnInit,
	QueryList,
	ViewChildren
} from '@angular/core';
import { TabContentComponent } from './tab-content/tab-content.component';

enum TypeEnum {
	basic = 'basic',
	ios = 'ios'
}

@Component({
	selector: 'mill-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit {

	/** Get content from child ng-content */
	@ContentChildren(TabContentComponent) components: QueryList<TabContentComponent>;

	/** Get query list from labels */
	@ViewChildren('elements') elements: QueryList<ElementRef>;

	@Input() public type: TypeEnum = TypeEnum.basic;
	@Input() public isDisabled = false;
	@Input() public isFullWidth = false;
	@Input() public animationDuration = '400ms';

	public barWidth: number;
	public barPosition: number;

	/** Observe active element changing */
	private _activeEl: MutationObserver;

	constructor() {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {

		/** Init mutation observer */
		this._activeEl = new MutationObserver((mutations: MutationRecord[])=> {
			mutations.forEach(m => {
				const target = m.target as HTMLElement;
				// Set position and width for list bar
				if (target.classList.contains('tabs-basic__item_active')) {
					this.barOptions(target.offsetLeft, target.offsetWidth);
				}
			})
		});

		/** Get native element */
		this.elements.toArray().forEach(el => {
			const nativeEl = el.nativeElement;

			if (nativeEl.classList.contains('tabs-basic__item_active')) {
				this.barOptions(nativeEl.offsetLeft, nativeEl.offsetWidth);
			}

			// Set observer on each label
			this._activeEl.observe(nativeEl, {
				attributes: true,
			})

		});

	}

	ngAfterContentInit(): void {

		const components = this.components.toArray();
		const isSelected = components.some(i => i.isSelected);

		// Update component variables
		components.forEach((item, index) => {

			if (!item.id) {
				item.id = index;
			}

			if ('isSelected' in item) {
				item.isSelected = true;
			}

			if (!isSelected) {
				components[0].isSelected = true;
			}

		});

	}

	/** Set selected state for tab content */
	public onClick(id): void {
		this.components.toArray().forEach(item => item.isSelected = item.id === id);
	}

	/** Styles for label bar */
	public barOptions(left, width): void {
		this.barPosition = left;
		this.barWidth = width;
	}


	public getBaseClass(): string {
		return this.type === TypeEnum.basic ? 'basic' : 'ios';
	}

	public getTabClass(): string {
		let className = '';
		let type = this.getBaseClass();

		className += `tabs-${type}`;

		if (this.isDisabled) className += ' ' + `tabs-${type}_disabled`;
		if (this.isFullWidth) className += ' ' + `tabs-${type}_full-width`;

		return className;
	}

	public getHeaderClass(): string {
		return `tabs-${this.getBaseClass()}__header`;
	}

	public getItemClass(selected): string {

		let className = '';
		let type = this.getBaseClass();

		className += `tabs-${type}__item`;

		if (selected) className += ' ' + `tabs-${type}__item_active`;

		return className;
	}

}
