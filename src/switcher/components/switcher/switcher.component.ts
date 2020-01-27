import {
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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'mill-switcher',
	templateUrl: './switcher.component.html',
  styleUrls: [ './switcher.scss' ],
  encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitcherComponent),
			multi: true,
		}
	]
})
export class SwitcherComponent implements OnInit, OnChanges, ControlValueAccessor {

	/** Active state for switcher */
	@Input() public active = false;

	/** Disable state for switcher */
	@Input() public disabled = false;

	/** Output */
	@Output('value') public statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	/** Reference to the switcher */
	@ViewChild('switcher', {static: true})
	private _switcher: ElementRef;

	/** Switcher width */
	private _switcherWidth: number;

	/** The maximum possible position in px*/
	private _maxPositionPx: number;

	/** Current position in px */
	public positionPx: number;

	/** The result of moving  */
	private _moveCounter: number;

	/** Current target position */
	private _targetPosition: number;

	/** Flag if switcher was moved */
	private _isMoved = false;

	/** Object of observables with event binding  */
	private _eventSubscriptions$: Subscription[] = [];

	constructor() {
	}

	ngOnChanges(): void {
		this._checkPosition();
	}

	ngOnInit(): void {
		this._setSwitcherWidth();
	}

	/** Control value accessor methods */
	writeValue(value: boolean) {
		this.active = value;
		this._checkPosition();
		this.statusChange.emit(this.active);
	}

	private _onChange: any = () => {
	};

	registerOnChange(fn): void {
		this._onChange = fn;
	}

	registerOnTouched(fn): void {
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	/** Events from switcher circle */
	public onEvent(eventOutput): void {

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

	/** Push event from slider thumb */
	private _addEvent(eventName): void {
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

					if (this._isMoved) {
						this._onMoveEnd();
					} else {
						this.onClick();
					}

				}

			},
			error => console.log(error),
		);

		this._eventSubscriptions$.push(event$);
	}

	private _clearEvents(): void {
		this._eventSubscriptions$.forEach(sub => sub.unsubscribe());
		this._eventSubscriptions$ = [];
	}

	public onClick(event?): void {

	  if (event && event.target !== this._switcher.nativeElement) return;

		if (this.disabled) return;

		this.active = !this.active;
		this._checkPosition();

		this._onChange(this.active);
		this.statusChange.emit(this.active);
	}

	public onMove(event): void {

		this._isMoved = true;

		// Get X position for our touch or cursor
		const eventX = this._isTouch(event) && event.touches && event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;

		// Position difference calculation
		this._moveCounter = eventX - this._targetPosition;

		this._calcViewValue(this._moveCounter);

	}

	/** Setting start position for switcher circle */
	public _setBasicPosition(event): void {
		if (this.disabled) return;

		this._targetPosition = (this._isTouch(event)  ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX);

		if (this.active) {
			this._targetPosition = this._targetPosition - this._maxPositionPx
		}

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

	/** Set switcher max position in px */
	private setMaxPosition(switcherCircleWidth): void {
		this._maxPositionPx = this._switcherWidth - switcherCircleWidth;
		this._checkPosition();
	}

	/** Calculate UI button position */
	private _calcViewValue(value): void {
		if (value || value === 0) {
			if (value > this._maxPositionPx) {
				this.positionPx = this._maxPositionPx;
			}
			else if (value < 0) {
				this.positionPx = 0;
			}
			else {
				this.positionPx = value;
			}
		}
		this._checkActiveState();
	}

	/** Calculate new switcher values */
	private _onMoveEnd(): void {

		if (this.disabled) return;

		if (this.positionPx >= this._maxPositionPx / 2) {
			this.active = true;
			this.positionPx = this._maxPositionPx;
		} else if (this.positionPx < this._maxPositionPx / 2) {
			this.active = false;
			this.positionPx = 0;
		}

		this._isMoved = false;

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
	private _isTouch = (event): boolean => {
		return event.type[0] === 't';
	};

	/** Return UI position */
	public calculatePosition(): string {
		return `translate(${this.positionPx}px, 0px)`;
	}

}
