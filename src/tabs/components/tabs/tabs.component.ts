import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TabsBase } from '../../tabs';


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

  public barStyles(): {left: string, width: string} {
    if (this.selectedLabel) {
      return {left: this.selectedLabel.offsetLeft + 'px', width: this.selectedLabel.offsetWidth + 'px'};
    }

    return {left: '0px', width: '0px'};
  }
}
