import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TabItemComponent } from './tab-content/tab-item.component';


@Component({
  selector: 'mill-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements AfterContentInit, AfterViewInit {

  /** Create unique id */
  static tabsId = 0;

  /** Get tab components */
  @ContentChildren(TabItemComponent) components: QueryList<TabItemComponent>;

  /** Get query list from labels */
  @ViewChildren('elements') elements: QueryList<ElementRef>;

  @Input() public type = 'basic' || 'ios';
  @Input() public disabled = false;

  public id = `mill-tabs-${TabsComponent.tabsId}`;
  public barWidth: number;
  public barPosition: number;
  public selectedTabIndex = 0;

  constructor(private cd: ChangeDetectorRef) {
    TabsComponent.tabsId++;
  }

  ngAfterViewInit(): void {
    // Update View Bar
    if (this._isBasic()) {
      this._updateBar();
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit(): void {
    this._registerTabs();

    this.components.changes.subscribe(() => {
      this._registerTabs();

      if (this._isBasic()) {
        this._updateBar();
      }
    })
  }

  /** Set selected state for tab content */
  public onClick(event, id): void {
    event.stopPropagation();

    this._barOptions(event.target.offsetLeft, event.target.offsetWidth);
    this.components.toArray().forEach(item => item.selected = item.id === id);
  }

  private _registerTabs(): void {
    // Set selected for the first element if no one is selected
    this.components.first.selected = !this.components.some(i => i.selected);

    // Update tab id's
    this.components.forEach((item, index) => {
      if (!item.id) {
        item.id = `${this.id}-${index}`
      }
      if (item.selected) {
        this.selectedTabIndex = index;
      }
    });
  }

  /** Update styles for label bar */
  private _updateBar(): void {
    if (this.selectedTabIndex > -1) {
      const element = this.elements.toArray()[this.selectedTabIndex];
      this._barOptions(element.nativeElement.offsetLeft, element.nativeElement.offsetWidth);
    }
  }

  /** Styles for label bar */
  private _barOptions(left, width): void {
    this.barPosition = left;
    this.barWidth = width;
  }

  private _isBasic(): boolean {
    return this.type === 'basic';
  }
}
