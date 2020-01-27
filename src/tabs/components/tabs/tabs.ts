import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';

export abstract class TabsBase {
  @Input() public type: 'basic' | 'ios' = 'basic';
  @Input() public disabled = false;
  public tabItemId = 0;
  public tabItems: BehaviorSubject<TabItemBase[]> = new BehaviorSubject<TabItemBase[]>([]);
  public selectedTabId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public selectedLabel: HTMLElement;

  abstract registerTabItem(item: TabItemBase): void;
  abstract unregisterTabItem(item: TabItemBase): void;
}

export abstract class TabItemBase {
  @Input() public id: string;
  @Input() public label: string;
}

