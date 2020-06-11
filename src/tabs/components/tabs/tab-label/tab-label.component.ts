import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { TabsBase } from '../../../tabs';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'tab-label',
  templateUrl: './tab-label.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabLabelComponent implements AfterViewInit {
  private _relatedTab: TabItemComponent;

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

  constructor(
    private _el: ElementRef,
    private _tabs: TabsBase
  ) {
  }

  ngAfterViewInit(): void {
    if (this.relatedTab.id === this._tabs.selectedTabId) {
      this._tabs.selectedLabel = this._el.nativeElement;
    }
  }

  @HostListener('click')
  public onClick(): void {
    this._tabs.selectedTabId = this.relatedTab.id;
    this._tabs.selectedLabel = this._el.nativeElement;
  }

}
