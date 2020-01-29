import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';

export abstract class TabsBase {
  @Input() public type: 'basic' | 'ios' = 'basic';
  @Input() public disabled = false;
  public tabItemCount = 0;
  public tabItems: BehaviorSubject<TabItemBase[]> = new BehaviorSubject<TabItemBase[]>([]);
  public selectedTabId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public selectedLabel: HTMLElement;

  public registerTabItem(tab: TabItemBase): void {
    this.tabItems.getValue().push(tab);

    if (!tab.id) {
      tab.id = `${this.tabItemCount++}`;
    }
  }
  public unregisterTabItem(tab: TabItemBase): void {
    this.tabItems.next(this.tabItems.getValue().filter(i => i !== tab));
  }
}

export abstract class TabItemBase {
  @Input() public id: string;
  @Input() public label: string;
}

