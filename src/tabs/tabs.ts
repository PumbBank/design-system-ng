import { AfterViewInit, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import {ScrollOverflow, ScrollControlsInterface} from '../utils';

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

export abstract class TabsPagination extends TabsItems implements AfterViewInit, OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();

  @Input() hideControls: boolean;
  @ViewChild('wrapper', {static: true}) public wrapper: ElementRef;
  @ViewChild('labelWrapper', {static: true}) public labelWrapper: ElementRef;

  protected scrollOverflow: ScrollOverflow;

  public scrollControls: ScrollControlsInterface = {
    disableLeft: true,
    disableRight: true
  };


  private _transformStyle: string;

  get transformStyle(): string {
    return this._transformStyle;
  }

  constructor() {
    super();

    this.scrollOverflow = new ScrollOverflow();
  }

  ngAfterViewInit(): void {
    this.scrollOverflow.emitScrollControls
      .subscribe(value => {
        this.scrollControls = value;
      });

    this.scrollOverflow.init({
      wrapper: this.wrapper,
      itemsWrapper: this.labelWrapper,
      scrollOverflow: SCROLL_OVERFLOW
    });

    this.scrollOverflow.items = this.tabItems.getValue().map(item => {
      return {
        element: item.labelElement.nativeElement,
        inView: false
      };
    });

    this.scrollOverflow.emitScrollTranslate
      .subscribe(value => this._transformStyle = value);


    // fromEvent(window, 'resize')
    //   .pipe(debounceTime(100), takeUntil(this._destroyed$))
    //   .subscribe(() => {
    //     this._checkOverflow();
    //     this.checkLabelInView();
    //
    //     if (!this.overflow) {
    //       this.scrollOffset = 0;
    //     }
    //   });

    // this._checkOverflow();
    // this.checkLabelInView();
    // this._checkScrollControls();
  }

  public onScroll(direction: 'left' | 'right'): void {
    this.scrollOverflow.onScroll(direction);
  }

  public ngOnDestroy(): void {
    this.scrollOverflow.destroy();
  }

}

export abstract class TabsBase extends TabsPagination implements OnInit, OnDestroy {
  private _unsubscribes$: Subject<void> = new Subject<void>();
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

      if (this.scrollOverflow.scrollable) {
        this.scrollOverflow.scrollTo(label);
      }
    }
  }

  public get selectedLabel(): HTMLElement {
    return this._selectedLabel;
  }

  ngOnInit(): void {
    this.tabItems.pipe(
      debounceTime(100),
      takeUntil(this._unsubscribes$)
    ).subscribe(() => {
      this._setItemsPosition();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._unsubscribes$.next();
    this._unsubscribes$.complete();
  }

  private _setItemsPosition(id: string = this.selectedTabId): void {
    const items = this.tabItems.getValue();

    let active = -1;

    for (const [index, item] of items.entries()) {
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
