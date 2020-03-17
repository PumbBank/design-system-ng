import { AfterViewInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { TabsBase } from '../../../tabs';
import { TabItemComponent } from '../tab-item/tab-item.component';


@Component({
	selector: 'tab-label',
	templateUrl: './tab-label.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'(click)': 'onClick()',
	},
})
export class TabLabelComponent implements AfterViewInit {

	@Input()
	set relatedTab(tabItem: TabItemComponent) {
		if (tabItem) {
			this._relatedTab = tabItem;
			tabItem.labelElement = this._el;
		}
	}

	get relatedTab(): TabItemComponent {
		return this._relatedTab;
	}

	private _relatedTab: TabItemComponent;

	constructor(
		private _el: ElementRef,
    private _tabs: TabsBase,
	) {}

  ngAfterViewInit(): void {
    if (this.relatedTab.id === this._tabs.selectedTabId) {
      this._tabs.selectedLabel = this._el.nativeElement;
    }
  }

  public onClick() {
		this._tabs.selectedTabId = this.relatedTab.id;
		this._tabs.selectedLabel = this._el.nativeElement;
	}

}
