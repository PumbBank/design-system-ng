import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TabItemBase, TabsBase } from './tabs';


@Component({
	selector: 'mill-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [{provide: TabsBase, useExisting: TabsComponent}]
})
export class TabsComponent extends TabsBase {

  @Input() public set selected(value: string) {
    if (value) {
      this.selectedTabId.next(value);
    }
  }

  public registerTabItem(tab: TabItemBase): void {
    this.tabItems.getValue().push(tab);

	  if (!tab.id) {
      tab.id = `${this.tabItemId++}`;
    }
  }

  public unregisterTabItem(tab: TabItemBase): void {
    this.tabItems.next(this.tabItems.getValue().filter(i => i !== tab));
  }

  public barStyles() {
    if (this.selectedLabel) {
      return {left: this.selectedLabel.offsetLeft + 'px', width: this.selectedLabel.offsetWidth + 'px'};
    }

    return {left: '0px', width: '0px'};
  }
}
