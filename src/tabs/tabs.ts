import { BehaviorSubject, fromEvent } from 'rxjs';
import { AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';


export abstract class TabItemBase {
  @Input() public id: string;
  @Input() public label: string;
  public labelElement: ElementRef;
  public inView: boolean;
  @Input() public position: number;
}

export abstract class TabsItems {
  public tabItemCount = 0;
  public tabItems: BehaviorSubject<TabItemBase[]> = new BehaviorSubject<TabItemBase[]>([]);
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

export abstract class TabsPagination extends TabsItems implements AfterViewInit {

  @Input() hideControls: boolean;

  @ViewChild('wrapper', {static: true}) public wrapper: ElementRef;
  @ViewChild('labelWrapper', {static: true}) public labelWrapper: ElementRef;

  public overflow: boolean;

  public disableAfter: boolean;
  public disableBefore: boolean;

  get scrollOffset(): number {
    return this._scrollOffset;
  };

  set scrollOffset(value: number) {
    this._scroll(value);
  }

  private _scrollOffset = 0;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.overflow = this._checkOverflow();
        this._checkLabelInView();

        if (!this.overflow) {
          this.scrollOffset = 0;
        }
      });

    this.overflow = this._checkOverflow();
    this._checkLabelInView();
    this._checkScrollControls();
  }

  private _checkOverflow(): boolean {
    const el = this.wrapper.nativeElement;
    const elArr = this.tabItems.getValue();

    let childrenWidth = 0;

    for (let i = 0; i < elArr.length; i++) {
      childrenWidth += elArr[i].labelElement.nativeElement.offsetWidth;
    }

    return el.offsetWidth < childrenWidth;
  }

  private _checkScrollControls(): void {
    if (!this.overflow) {
      this.disableAfter = this.disableBefore = true;
    } else {
      this.disableBefore = this.scrollOffset === 0;
      this.disableAfter = this.scrollOffset === this._maxScrollLength();
    }
  }

  public scrollHeader(direction: 'left' | 'right') {
    const items = this.tabItems.getValue();

    if (direction === 'right') {
      for (let i = items.length - 1; i > 0; i--) {
        if (items[i].inView === true) {
          if (i !== items.length - 1) {
            this.scrollTo(items[i + 1].labelElement.nativeElement);
            break;
          }
        }
      }
    } else if (direction === 'left') {
      for (let i = 0; i < items.length; i++) {
        if (items[i].inView === true) {
          if (i === 0) {
            this.scrollOffset = 0;
          } else {
            this.scrollTo(items[i - 1].labelElement.nativeElement);
            break;
          }
        }
      }
    }

    this._checkLabelInView();
  }

  public scrollTo(label: HTMLElement) {
    const {offsetWidth, offsetLeft} = label;
    const wrapperWidth = this.wrapper.nativeElement.offsetWidth;

    const labelStartPosition = offsetLeft;
    const labelEndPosition = labelStartPosition + offsetWidth;

    const beforeLabelPosition = this.scrollOffset;
    const afterLabelPosition = this.scrollOffset + wrapperWidth;

    const needOverflow = 48;

    if (labelStartPosition < beforeLabelPosition) {
      this.scrollOffset -= beforeLabelPosition - labelStartPosition + needOverflow
    } else if (labelEndPosition > afterLabelPosition) {
      this.scrollOffset += labelEndPosition - afterLabelPosition + needOverflow;
    }
  }

  private _scroll(value: number) {
    const maxScroll = this._maxScrollLength();
    this._scrollOffset = Math.max(0, Math.min(maxScroll, value));
    this._checkScrollControls();
  }

  private _checkLabelInView() {
    if (!this.overflow) {
      return;
    }

    this.tabItems.getValue().forEach(i => {
      const {offsetWidth, offsetLeft} = i.labelElement.nativeElement;
      const offsetView = offsetLeft + offsetWidth;

      i.inView = !(offsetLeft < this.scrollOffset || (offsetView > (this.wrapper.nativeElement.offsetWidth + this.scrollOffset)));
    });
  }

  private _maxScrollLength() {
    return this.labelWrapper.nativeElement.scrollWidth - this.wrapper.nativeElement.offsetWidth + 48
  }

  public getTransformStyle() {
    return `translateX(-${this.scrollOffset}px)`;
  }

}

export abstract class TabsBase extends TabsPagination {
  @Input() public type: 'basic' | 'ios' = 'basic';
  @Input() public fullWidth: boolean;
  @Input() public disabled: boolean;

  public set selectedTabId(id: string) {
    if (id) {
      this._selectedTabId = id;

      const tabItems = this.tabItems.getValue();

      let active = -1;

      for (let i = 0; i < tabItems.length; i++) {
        tabItems[i].position = -1;

        if (tabItems[i].id === id) {
          active = i;
        }

        if (active > -1) {
          tabItems[i].position = (active === i) ? 0 : 1
        }
      }

    }
  }

  public get selectedTabId(): string {
    return this._selectedTabId;
  }
  private _selectedTabId: string;

  public set selectedLabel(label: HTMLElement) {
    if (label) {
      this._selectedLabel = label;

      if (this.overflow) {
        this.scrollTo(label);
      }
    }
  }
  public get selectedLabel(): HTMLElement {
    return this._selectedLabel
  }
  private _selectedLabel: HTMLElement;
}
