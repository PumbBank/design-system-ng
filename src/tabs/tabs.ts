import { BehaviorSubject, fromEvent } from 'rxjs';
import { AfterViewInit, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

export abstract class TabItemBase {
  @Input() public id: string;
  @Input() public label: string;
  @Input() public icon: string;
  @Input() public position: number;
  @Input() public selected: boolean;
  public labelElement: ElementRef;
  public inView: boolean;
}

export abstract class TabsItems {
  public tabItems: BehaviorSubject<TabItemBase[]> = new BehaviorSubject<TabItemBase[]>([]);
  public tabItemCount: number = 0;

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

const SCROLL_OVERFLOW = 48;

export abstract class TabsPagination extends TabsItems implements AfterViewInit {
  private _scrollOffset: number = 0;

  @Input() hideControls: boolean;
  @ViewChild('wrapper', {static: true}) public wrapper: ElementRef;
  @ViewChild('labelWrapper', {static: true}) public labelWrapper: ElementRef;

  public overflow: boolean;
  public disableAfter: boolean;
  public disableBefore: boolean;

  get scrollOffset(): number {
    return this._scrollOffset;
  }

  set scrollOffset(value: number) {
    this._scroll(value);
  }

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this._checkOverflow();
        this.checkLabelInView();

        if (!this.overflow) {
          this.scrollOffset = 0;
        }
      });

    this._checkOverflow();
    this.checkLabelInView();
    this._checkScrollControls();
  }

  private _checkOverflow(): void {
    const el = this.wrapper.nativeElement;
    const elArr = this.tabItems.getValue();

    let childrenWidth = 0;

    for (const item of elArr) {
      childrenWidth += item.labelElement.nativeElement.offsetWidth;
    }

    this.overflow = el.offsetWidth < childrenWidth;
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
          }
          break;
        }
      }
    }

    this.checkLabelInView();
  }

  public scrollTo(label: HTMLElement) {
    const {offsetWidth, offsetLeft} = label;
    const wrapperWidth = this.wrapper.nativeElement.offsetWidth;

    const labelStartPosition = offsetLeft;
    const labelEndPosition = labelStartPosition + offsetWidth;

    const beforeLabelPosition = this.scrollOffset;
    const afterLabelPosition = this.scrollOffset + wrapperWidth;

    if (labelStartPosition < beforeLabelPosition) {
      this.scrollOffset -= beforeLabelPosition - labelStartPosition + SCROLL_OVERFLOW;
    } else if (labelEndPosition > afterLabelPosition) {
      this.scrollOffset += labelEndPosition - afterLabelPosition + SCROLL_OVERFLOW;
    }
  }

  private _scroll(value: number) {
    const maxScroll = this._maxScrollLength();
    if (maxScroll - value <= 10) {
      value = maxScroll;
    }
    this._scrollOffset = Math.max(0, Math.min(maxScroll, value));
    this._checkScrollControls();
  }

  public checkLabelInView() {
    if (!this.overflow) {
      return;
    }

    this.tabItems.getValue().forEach(i => {
      const {offsetWidth, offsetLeft} = i.labelElement.nativeElement;
      const offsetView = offsetLeft + offsetWidth;

      i.inView = !(offsetLeft < this.scrollOffset ||
        (offsetView > (this.wrapper.nativeElement.offsetWidth + this.scrollOffset)));
    });
  }

  private _maxScrollLength() {
    return this.labelWrapper.nativeElement.scrollWidth - this.wrapper.nativeElement.offsetWidth + SCROLL_OVERFLOW;
  }

  public getTransformStyle() {
    return `translateX(-${this.scrollOffset}px)`;
  }

}

export abstract class TabsBase extends TabsPagination implements OnInit {
  private _selectedTabId: string;
  private _selectedLabel: HTMLElement;

  @Input() public type: 'basic' | 'ios' = 'basic';
  @Input() public fullWidth: boolean;
  @Input() public disabled: boolean;

  public set selectedTabId(id: string) {
    if (id) {
      this._selectedTabId = id;
      this._setItemsPosition(id);
    }
  }

  public get selectedTabId(): string {
    return this._selectedTabId;
  }

  public set selectedLabel(label: HTMLElement) {
    if (label) {
      this._selectedLabel = label;

      if (this.overflow) {
        this.scrollTo(label);
        this.checkLabelInView();
      }
    }
  }

  public get selectedLabel(): HTMLElement {
    return this._selectedLabel;
  }


  ngOnInit(): void {
    this.tabItems.pipe(
      debounceTime(100)
    ).subscribe(() => {
      this._setItemsPosition();
    });
  }

  private _setItemsPosition(id: string = this.selectedTabId) {
    const items = this.tabItems.getValue();

    let active = -1;

    for (let [index, item] of items.entries()) {
      item.position = -1;

      if (id) {
        if (item.id === id) {
          active = index;
        }
      } else {
        if (item.selected) {
          active = index;
        }
      }

      if (active > -1) {
        item.position = (active === index) ? 0 : 1;
      }
    }
  }
}
