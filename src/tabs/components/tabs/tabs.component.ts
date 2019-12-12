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
import { TabContentComponent } from './tab/tab-content.component';

enum TypeEnum {
	basic = 'normal',
	ios = 'ios'
}

@Component({
	selector: 'mill-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit {

	@ContentChildren(TabContentComponent) components: QueryList<TabContentComponent>;
	@ViewChildren('elements') elements: QueryList<ElementRef>;

	@Input() public type: TypeEnum = TypeEnum.basic;
	@Input() public isDisabled = false;
	@Input() public isFullWidth = false;

	public barWidth: number;
	public barPosition: number;

	private _activeEl: MutationObserver;

	constructor() {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {

		this._activeEl = new MutationObserver((mutations: MutationRecord[])=> {
			mutations.forEach(m => {
				const target = m.target as HTMLElement;
				if (target.classList.contains('tabs__itm_active')) {
					this.barOptions(target.offsetLeft, target.offsetWidth);
				}
			})
		});

		this.elements.toArray().forEach(el => {
			const nativeEl = el.nativeElement;

			if (nativeEl.classList.contains('tabs__itm_active')) {
				this.barOptions(nativeEl.offsetLeft, nativeEl.offsetWidth);
			}

			this._activeEl.observe(nativeEl, {
				attributes: true,
			})

		});

	}

	ngAfterContentInit(): void {

		this.components.toArray().forEach((item, index) => {

			const isSelected = 'isSelected' in item;

			if (!item.id) {
				item.id = index;
			}

			if (!isSelected) {
				if (index === 0) {
					item.isSelected = true;
				}
			}

		});

	}

	public onClick(id): void {
		this.components.toArray().forEach(item => item.isSelected = item.id === id);
	}

	public barOptions(left, width): void {
		this.barPosition = left;
		this.barWidth = width;
	}

	public isIos(): boolean {
		return this.type === TypeEnum.ios;
	}

	public getTabClass(): string {
		let className = '';
		let type = this.isIos() ? 'ios' : 'basic';

		className += `tabs-${type}`;

		if (this.isDisabled) className += ' ' + `tabs-${type}_disabled`;
		if (this.isFullWidth) className += ' ' + `tabs-${type}_full-width`;

		return className;
	}

}
