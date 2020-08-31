import {AfterViewInit, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

export interface ScrollOverflowInterface {
  wrapper: ElementRef;
  itemsWrapper: ElementRef;
  scrollOverflow?: number;
}

export interface ScrollItemInterface {
  element: HTMLElement;
  inView: boolean;
}

export interface ScrollControlsInterface {
  disableLeft: boolean;
  disableRight: boolean;
}

export class ScrollOverflow {
  private destroy$: Subject<null> = new Subject<null>();

  private _scrollOffset: number = 0;
  private _scrollOverflow: number = 0;

  private _scrollable: boolean;

  get scrollable(): boolean {
    return this._scrollable;
  }

  set scrollable(value: boolean) {
    this._scrollable = value;
  }

  private wrapper: ElementRef;
  private itemsWrapper: ElementRef;

  private _items: BehaviorSubject<ScrollItemInterface[]> = new BehaviorSubject<ScrollItemInterface[]>([]);

  set items(value: ScrollItemInterface[]) {
    this._items.next(value);
  }

  public emitScrollTranslate: EventEmitter<string> = new EventEmitter<string>();
  public emitScrollControls: EventEmitter<ScrollControlsInterface> = new EventEmitter<ScrollControlsInterface>();

  get scrollOffset(): number {
    return this._scrollOffset;
  }

  set scrollOffset(value: number) {
    this._scroll(value);
  }

  constructor() {
  }

  public init(options: ScrollOverflowInterface): void {
    this.wrapper = options?.wrapper;
    this.itemsWrapper = options?.itemsWrapper;
    this._scrollOverflow = options.scrollOverflow;


    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this._checkOverflow();
        this._checkLabelInView();

        if (!this.scrollable) {
          this.scrollOffset = 0;
        }
      });

    this._checkOverflow();
    this._checkLabelInView();
    this._checkScrollControls();

    this._items
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._checkOverflow();
        this._checkLabelInView();
        this._checkScrollControls();
      });

  }

  public destroy(): void {
    this.wrapper = this.itemsWrapper = this._items = this._scrollOverflow = null;
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onScroll(direction: 'left' | 'right'): void {
    const items = this._items.getValue();

    if (direction === 'right') {
      for (let i = items.length - 1; i > 0; i--) {
        if (items[i].inView === true) {
          if (i !== items.length - 1) {
            this.scrollTo(items[i + 1].element);
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
            this.scrollTo(items[i - 1].element);
          }
          break;
        }
      }
    }

    this._checkLabelInView();
  }

  public scrollTo(element: HTMLElement): void {
    const {offsetWidth, offsetLeft}: {offsetWidth: number, offsetLeft: number} = element;
    const wrapperWidth = this.wrapper.nativeElement.offsetWidth;

    const labelStartPosition = offsetLeft;
    const labelEndPosition = labelStartPosition + offsetWidth;

    const beforeLabelPosition = this.scrollOffset;
    const afterLabelPosition = this.scrollOffset + wrapperWidth;

    if (labelStartPosition < beforeLabelPosition) {
      this.scrollOffset -= beforeLabelPosition - labelStartPosition + this._scrollOverflow;
    } else if (labelEndPosition > afterLabelPosition) {
      this.scrollOffset += labelEndPosition - afterLabelPosition + this._scrollOverflow;
    }

    this.emitScrollTranslate.emit(this._getTransformStyle());
  }


  private _checkLabelInView(): void {
    if (!this.scrollable) {
      return;
    }

    this._items.getValue().forEach(i => {
      const {offsetWidth, offsetLeft}: {offsetWidth: number, offsetLeft: number} = i.element;
      const offsetView = offsetLeft + offsetWidth;

      i.inView = !(offsetLeft < this.scrollOffset ||
        (offsetView > (this.wrapper.nativeElement.offsetWidth + this.scrollOffset)));
    });
  }

  private _getTransformStyle(): string {
    return `translateX(-${this.scrollOffset}px)`;
  }

  private _scroll(value: number): void {
    const maxScroll = this._maxScrollLength();
    if (maxScroll - value <= 10) {
      value = maxScroll;
    }
    this._scrollOffset = Math.max(0, Math.min(maxScroll, value));
    this._checkScrollControls();
    this.emitScrollTranslate.emit(this._getTransformStyle());
  }

  private _checkOverflow(): void {
    const el = this.wrapper.nativeElement;

    let childrenWidth = 0;

    for (const item of this._items.getValue()) {
      childrenWidth += item.element.offsetWidth;
    }

    this.scrollable = el.offsetWidth < childrenWidth;
  }

  private _checkScrollControls(): void {
    const controls: ScrollControlsInterface = {
      disableLeft: true,
      disableRight: true
    };

    if (this.scrollable) {
      controls.disableLeft = this.scrollOffset === 0;
      controls.disableRight = this.scrollOffset === this._maxScrollLength();
    }

    this.emitScrollControls.emit(controls);
  }

  private _maxScrollLength(): number {
    return this.itemsWrapper.nativeElement.scrollWidth - this.wrapper.nativeElement.offsetWidth + this._scrollOverflow;
  }
}
