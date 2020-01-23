import { BehaviorSubject } from 'rxjs';

export abstract class TabsBase {
  type: string;
  tabItems: BehaviorSubject<TabItemBase[]>;
  selectedLabel: HTMLElement;
  selectedTabId: BehaviorSubject<string>;
}

export abstract class TabItemBase {
  id: string;
}

