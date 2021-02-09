import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'mill-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitcherComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitcherComponent implements OnInit, OnChanges, ControlValueAccessor {
  private _active: boolean = null;
  /** Reference to the switcher */
  @ViewChild('switcher', {static: true})
  private _switcher: ElementRef;
  /** Switcher width */
  private _switcherWidth: number;
  /** The maximum possible position in px */
  private _maxPositionPx: number;
  /** The result of moving */
  private _moveCounter: number;
  /** Current target position */
  private _targetPosition: number;
  /** Object of observables with event binding  */
  private _eventSubscriptions$: Subscription[] = [];
  /** Disable state for switcher */
  @Input() public disabled: boolean = false;
  /** Output */
    // tslint:disable-next-line:no-output-rename
  @Output('value') public statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Current position in px */
  public positionPx: number;
  /** Flag if switcher was moved */
  public isMoved: boolean = false;

  /** Active state for switcher */
  @Input()
  public set active(value: boolean | null) {
    this._active = value;
    this._cdr.markForCheck();
  }
  public get active(): boolean | null {
    return this._active;
  }

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._setSwitcherWidth();
  }

  ngOnChanges(): void {
    this._checkPosition();
  }

  /** Control value accessor methods */
  writeValue(value: boolean): void {
    this.active = value;
    this._checkPosition();
    this.statusChange.emit(this.active);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Events from switcher circle */
  public onEvent(eventOutput: any): void {

    if (eventOutput.event && eventOutput.event.type) {

      const isTouch = this._isTouch(eventOutput.event);
      const moveEventName = isTouch ? 'touchmove' : 'mousemove';
      const endEventMove = isTouch ? 'touchend' : 'mouseup';

      this._addEvent(moveEventName);
      this._addEvent(endEventMove);

      if (isTouch) {
        this._addEvent('touchcancel');
      }

      // Set basic position
      this._setBasicPosition(eventOutput.event);
    }
  }

  public onClick(): void {

    if (this.disabled || this.active === null) {
      return;
    }

    if (!this.isMoved) {
      this._toggleActive();
    }
    this.isMoved = false;
  }

  public onMove(event: any): void {

    this.isMoved = true;

    // Get X position for our touch or cursor
    const eventX = this._isTouch(event) && event.touches && event.touches.length > 0
      ? (event.touches[0].pageX || event.changedTouches[0].pageX)
      : event.pageX;

    // Position difference calculation
    this._moveCounter = eventX - this._targetPosition;

    this._calcViewValue(this._moveCounter);

  }

  /** Setting start position for switcher circle */
  public _setBasicPosition(event: any): void {
    if (this.disabled || this.active === null) {
      return;
    }

    this._targetPosition = (this._isTouch(event)
      ? (event.touches[0].pageX || event.changedTouches[0].pageX)
      : event.pageX);

    if (this.active) {
      this._targetPosition = this._targetPosition - this._maxPositionPx;
    }

  }

  /** Set switcher max position in px */
  public setMaxPosition(switcherCircleWidth: number): void {
    this._maxPositionPx = this._switcherWidth - switcherCircleWidth;
    this._checkPosition();
  }

  /** Return UI position */
  public calculatePosition(): string {
    return `translate(${this.positionPx}px, 0px)`;
  }

  private _onChange: any = () => {};

  /** Push event from slider thumb */
  private _addEvent(eventName: string): void {
    const event$: Subscription = fromEvent(window, eventName).subscribe(
      event => {

        event.stopPropagation();

        if (eventName === 'mousemove') {
          // Prevent from selecting anything else.
          event.preventDefault();
        }

        if (eventName === 'mousemove' || eventName === 'touchmove') {
          // Move event
          this.onMove(event);
        }

        const endEvents = ['mouseup', 'touchend', 'touchcancel'];
        if (endEvents.includes(eventName)) {
          this._clearEvents();
          if (this.isMoved) {
            this._onMoveEnd();
          }
        }
      },
      error => console.error(error),
    );

    this._eventSubscriptions$.push(event$);
  }

  private _clearEvents(): void {
    this._eventSubscriptions$.forEach(sub => sub.unsubscribe());
    this._eventSubscriptions$ = [];
  }

  private _toggleActive(): void {
    this.active = !this.active;
    this._checkPosition();

    this._onChange(this.active);
    this.statusChange.emit(this.active);
  }

  /** Check circle position in first start */
  private _checkPosition(): void {
    if (this.active) {
      this.positionPx = this._maxPositionPx;
    } else {
      this.positionPx = 0;
    }
  }

  /** Set switcher width */
  private _setSwitcherWidth(): void {
    this._switcherWidth = this._switcher.nativeElement.getBoundingClientRect().width;
  }

  /** Calculate UI button position */
  private _calcViewValue(value: number): void {
    if (value || value === 0) {
      if (value > this._maxPositionPx) {
        this.positionPx = this._maxPositionPx;
      } else if (value < 0) {
        this.positionPx = 0;
      } else {
        this.positionPx = value;
      }
    }
    this._checkActiveState();
  }

  /** Calculate new switcher values */
  private _onMoveEnd(): void {

    if (this.disabled || this.active === null) {
      return;
    }

    if (this.positionPx >= this._maxPositionPx / 2) {
      this.active = true;
      this.positionPx = this._maxPositionPx;
    } else if (this.positionPx < this._maxPositionPx / 2) {
      this.active = false;
      this.positionPx = 0;
    }

    this._onChange(this.active);
    this.statusChange.emit(this.active);
  }

  /** Check position while moving */
  private _checkActiveState(): void {
    if (this.positionPx >= this._maxPositionPx / 2) {
      this.active = true;
    } else if (this.positionPx < this._maxPositionPx / 2) {
      this.active = false;
    }
  }

  /** Check if event is touch event */
  private _isTouch = (event: any): boolean => {
    return event.type[0] === 't';
  }
}




