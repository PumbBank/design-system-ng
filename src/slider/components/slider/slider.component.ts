import {
	Component,
	ElementRef,
	EventEmitter, forwardRef,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';


/** Slider config interface */
export interface SliderConfigInterface {
	minValue: number;
	maxValue: number;
	lastSelected: ThumbNameEnum;
	hiddenTooltip: ThumbNameEnum;
	selectedThumb: ThumbInterface;
}

/** Slider thumb interface */
interface ThumbInterface {
	name: string;
	value: number;
	position: number;
}

/** Interface for result output */
export interface ResultInterface {
	minValue?: number;
	maxValue?: number;
}

/** Interface for thumb output */
export interface EventOutputInterface {
	event: Event | MouseEvent | TouchEvent;
	target: ThumbNameEnum;
}

/** Enum for thumb names */
export enum ThumbNameEnum {
	minValue = 'minValue',
	maxValue = 'maxValue',
}

/** Enum for slider type */
enum SliderTypeEnum {
	basic = 'basic',
	double = 'double',
	step = 'step',
}

/** Enum for keycodes */
enum KeyCodeEnum {
	keyLeft = 'ArrowLeft',
	keyRight = 'ArrowRight'
}

@Component({
	selector: 'mill-slider',
	templateUrl: './slider.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SliderComponent),
			multi: true,
		}
	]
})
export class SliderComponent implements OnInit, OnChanges, ControlValueAccessor {

	/** Minimum slider value. */
	@Input()
	get minValue(): number { return this._minValue };
	set minValue(value: number) {
		this._minValue = this._toNumber(value);
	}
	private _minValue: number;

	/** Maximum slider value. */
	@Input()
	get maxValue(): number { return this._maxValue };
	set maxValue(value: number) {
		this._maxValue = this._toNumber(value);
	}
	private _maxValue: number;

	/** Number of steps for slider with type "step" */
	@Input()
	get step(): number { return this._step }
	set step(value: number) {
		this._step = this._toNumber(value);
	}
	private _step?: number;

	@Input()
	get value(): number { return this._value }
	set value(value: number) {
		this._value = this._toNumber(value);
	}
	private _value?: number;

	/** Type of slider
	 * can be "basic", "double" or "step"
	 * */
	@Input() public type?: SliderTypeEnum = SliderTypeEnum.basic;

	/** Disable state for slider */
	@Input() public disabled = false;

	/** Output  */
	@Output() public valueChanged: EventEmitter<ResultInterface> = new EventEmitter<ResultInterface>();

	/** Slider form group for values */
	public form: FormGroup;

	/** Enum for slider type */
	public sliderType = SliderTypeEnum;

	/** Enum for thumb names */
	public thumbName = ThumbNameEnum;

	/** Init slider config */
	private _sliderConfig: SliderConfigInterface = {
		minValue: 0,
		maxValue: 100,
		lastSelected: null,
		hiddenTooltip: null,
		selectedThumb: {
			name: null,
			value: 0,
			position: 0,
		}
	};

	/** Object of observables with event binding  */
	private _eventSubscriptions: Subscription[] = [];

	/** Reference to the slider content */
	@ViewChild('sliderContent', {static: true}) private _sliderContent: ElementRef;

	/** Slider content width*/
	private _sliderWidth: number;

	/** The result of moving thumb */
	private _moveCounter = 0;

	/** Arrays of steps */
	private _rangeFirstArray = [];
	private _rangeSecondArray = [];

	constructor(private _fb: FormBuilder) {

		this.form = this._fb.group({
			minValue: [{value: this.minValue, disabled: false}, null],
			maxValue: [{value: this.maxValue, disabled: false}, null],
		});

	}

	ngOnChanges(): void {
		this._validateSlider();

		if (this.getType() === SliderTypeEnum.step) {
			this._setRangeArray();
		}
	}

	ngOnInit(): void {
		this._validateSlider();
		this._getSliderContentWidth();

		if (this.getType() === SliderTypeEnum.step) {
			this._setRangeArray();
		}

	}

	/** Control value accessor methods */
	writeValue() {}

	onTouched: any = () => {
	};

	registerOnChange(fn): void {
		this.form.valueChanges.subscribe(fn);
	}

	registerOnTouched(fn): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this._getSliderContentWidth();
	}

	/** Get event from slider thumb */
	public onEvent(eventOutput: EventOutputInterface): void {

		if (eventOutput.event && eventOutput.event.type) {
			switch (eventOutput.event.type) {
				case 'touchstart':
				case 'mousedown':
					const isTouch = this._isTouch(eventOutput.event);
					const moveEventName = isTouch ? 'touchmove' : 'mousemove';
					const endEventMove = isTouch ? 'touchend' : 'mouseup';

					this._addEvent(moveEventName);
					this._addEvent(endEventMove);

					if (isTouch) {
						this._addEvent('touchcancel');
					}

					// Set basic options for the selected thumb
					this._setSelectedThumb(eventOutput.target, eventOutput.event);

					break;
				case 'keydown':
					this.onKeyDown(eventOutput.event);
					break;
				case 'blur':
					this._sliderConfig.selectedThumb.name = null;
					break;
				case 'focus':
					this._setSelectedThumb(eventOutput.target);
					break;
			}
		}
	}

	/** Push event from slider thumb */
	private _addEvent(eventName): void {
		const event: Subscription = fromEvent(document.body, eventName).subscribe(
			event => {

				// Prevent from selecting anything else.
				if (eventName === 'mousemove') {
					event.preventDefault();
				}

				// Move event
				this.onMove(event);

				const endEvents = ['mouseup', 'touchend', 'touchcancel'];
				if (endEvents.includes(eventName)) {
					this._clearEvents();
				}

			},
			error => console.log(error),
		);

		this._eventSubscriptions.push(event);
	}

	private _clearEvents(): void {
		this._eventSubscriptions.forEach(sub => sub.unsubscribe());
		this._eventSubscriptions = [];
	}

	/** Setting basic options for the selected thumb */
	private _setSelectedThumb(thumbName: ThumbNameEnum, event?): void {

		if (this.disabled) return;

		this._sliderConfig.selectedThumb.name = thumbName;
		this._sliderConfig.selectedThumb.value = this._sliderConfig[thumbName];
		this._sliderConfig.lastSelected = thumbName;

		if (event) {
			this._sliderConfig.selectedThumb.position = this._isTouch(event)
				&& event.touches
				&& event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;
		}

	}

	/** Mouse/touch move event */
	public onMove(event): void {

		// Get X position for our touch or cursor
		const eventX = this._isTouch(event) && event.touches && event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;

		// Position difference calculation
		this._moveCounter = eventX - this._sliderConfig.selectedThumb.position;

		// Calculation of position as a percentage
		const result = this._sliderConfig.selectedThumb.value + Math.round(this._moveCounter / Math.round(this._sliderWidth / 100));

		this._updateValue(result);
	}

	/** Key down event */
	public onKeyDown(event): void {
		if (event.key === KeyCodeEnum.keyLeft || event.key === KeyCodeEnum.keyRight) {
			const value = this._sliderConfig[this._sliderConfig.selectedThumb.name];
			this._updateValue(value, event.key);
		}
	}

	/** One method for calculating values from movements or keys  */
	private _updateValue(value, eventKey?: string): void {

		// Check if event is keydown
		if (eventKey) {
			const step = this.getType() === SliderTypeEnum.step ? 100 / this.step : 1;
			value = eventKey && eventKey === KeyCodeEnum.keyRight ? value + step : value - step;
		}

		// Check if slider type is step
		if (this.getType() === SliderTypeEnum.step) {

			if (value < 0) {
				value = 0;
			} else if (value > 100) {
				value = 100;
			}

			value = this._calcStepValue(value);
		}

		// Calculate view for UI
		this._calcViewValue(value);

		// Calculate real value
		this._calcValue();

		// Check if we need to hide one of the tooltips (just for UI)
		if (this.getType() === SliderTypeEnum.double) {
			this._checkTooltip();
		}

	}

	/** Calculate UI thumb position */
	private _calcViewValue(value): void {
		if (value || value === 0) {
			if (this._sliderConfig.selectedThumb.name === ThumbNameEnum.minValue) {
				if (value < 1) {
					this._sliderConfig[ThumbNameEnum.minValue] = 0;
				}
				else if (value > this._sliderConfig[ThumbNameEnum.maxValue]) {
					this._sliderConfig[ThumbNameEnum.minValue] = this._sliderConfig[ThumbNameEnum.maxValue];
				}
				else {
					this._sliderConfig[ThumbNameEnum.minValue] = value;
				}

			}
			else if (this._sliderConfig.selectedThumb.name === ThumbNameEnum.maxValue) {
				if (value > 100) {
					this._sliderConfig[ThumbNameEnum.maxValue] = 100;
				}
				else if (value < this._sliderConfig[ThumbNameEnum.minValue]) {
					this._sliderConfig[ThumbNameEnum.maxValue] = this._sliderConfig[ThumbNameEnum.minValue];
				}
				else {
					this._sliderConfig[ThumbNameEnum.maxValue] = value;
				}
			}
		}
	}

	/** Set array of numbers for slider with step type */
	private _setRangeArray(): void {
		this._rangeFirstArray = [];
		this._rangeSecondArray = [];

		const value = 100 / this.step;

		let count = 0;

		for (let i = 0; i < this.step; i++) {
			this._rangeFirstArray.push(count);
			count = count + value;
			this._rangeSecondArray.push(count);
		}

	}

	/** Calculation value for the slider with step type */
	private _calcStepValue(value): number {
		for (let i = 0; i < this.step; i++) {
			// If value is between min and max values in step arrays
			if (value >= this._rangeFirstArray[i] && value <= this._rangeSecondArray[i]) {
				return Math.round(value > ((this._rangeFirstArray[i] + this._rangeSecondArray[i]) / 2) ? this._rangeSecondArray[i] : this._rangeFirstArray[i]);
			}
		}
	}

	/** Calculate slider real values */
	private _calcValue(): void {
		const result = {};

		if (this.getType() === SliderTypeEnum.double) {
			result[ThumbNameEnum.minValue] = this._calcNumber(ThumbNameEnum.minValue);
			result[ThumbNameEnum.maxValue] = this._calcNumber(ThumbNameEnum.maxValue);
		}
		else {
			this._sliderConfig[ThumbNameEnum.minValue] = 0;
			result[ThumbNameEnum.minValue] = 0;
			result[ThumbNameEnum.maxValue] = this._calcNumber(ThumbNameEnum.maxValue);
		}
		this.form.patchValue(result);
	}

	/** Calculate UI percent value */
	private _calcNumber(thumb): number {
		const calcValue = this.maxValue - this.minValue;
		return Math.round(this.minValue + calcValue / 100 * this._sliderConfig[thumb]);
	}

	/** Check if active thumb is close to another thumb, hide another */
	private _checkTooltip(): void {
		if (this._sliderConfig[ThumbNameEnum.maxValue] - this._sliderConfig[ThumbNameEnum.minValue] < 20) {
			if (this._sliderConfig.selectedThumb.name === ThumbNameEnum.minValue) {
				this._sliderConfig.hiddenTooltip = ThumbNameEnum.maxValue;
			}
			else if (this._sliderConfig.selectedThumb.name === ThumbNameEnum.maxValue) {
				this._sliderConfig.hiddenTooltip = ThumbNameEnum.minValue;
			}
		}
		else {
			this._sliderConfig.hiddenTooltip = null;
		}
	}

	/** Get slider content width*/
	private _getSliderContentWidth(): void {
		this._sliderWidth = this._sliderContent.nativeElement.getBoundingClientRect().width;
	}

	public getType(): SliderTypeEnum {
		return this.type;
	}

	/** Return css style for the base track */
	public getBaseTrackStyle(): string {
		if (this.getType() === SliderTypeEnum.step) {
			return `repeating-linear-gradient(to right, #E1E1E8, #E1E1E8 ${(100 / this.step) - 1}%, #fff ${(100 / this.step) - 1}%, #fff ${100 / this.step}%)`;
		}
		return '#E1E1E8';
	}

	/** Return css style for the filled track */
	public getTrackFillStyle(): string {
		return `translate(${this._sliderConfig[ThumbNameEnum.minValue]}%, 0px) 
				scale3d(${(this._sliderConfig[ThumbNameEnum.maxValue] - this._sliderConfig[ThumbNameEnum.minValue]) / 100}, 1, 1)`;
	}

	/** Validate slider min, max value and step */
	private _validateSlider(): void {

		if (this.minValue > this.maxValue) {
			this.minValue = this.maxValue;
			console.warn(`[Mill Slider] The min value cannot be greater than the max value`);
		}

		if (this.getType() === SliderTypeEnum.step) {
			if (this.step < 2) {
				this.step = 2;
				console.warn(`[Mill Slider] The step must be greater than 2`);
			} else if (this.step > 50) {
				this.step = 50;
				console.warn(`[Mill Slider] The step cannot be more than 50`)
			}
		}

	}

	/** Convert value to number */
	private _toNumber = (value: any): number => {
		if (!isNaN(value)) {
			return parseInt(value, null);
		}
		console.warn(`[Mill Slider] ${value} is not a number`);
		return 0;
	};

	/** Check if event is touch event */
	private _isTouch = (event): boolean => {
		return event.type[0] === 't';
	};

}
