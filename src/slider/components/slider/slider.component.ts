import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNumber } from 'util';
import { Subscription, fromEvent, BehaviorSubject } from 'rxjs';


export interface SliderSettingsInterface {
	minValue: number;
	maxValue: number;
	lastSelected: ThumbNameEnum;
	hiddenTooltip: ThumbNameEnum;
	selectedThumb: ThumbInterface;
}

interface ThumbInterface {
	name: string;
	value: number;
	position: number;
}

export interface ResultInterface {
	minValue?: number;
	maxValue?: number;
}

export enum ThumbNameEnum {
	minValue = 'minValue',
	maxValue = 'maxValue',
}

enum sliderType {
	basic = 'basic',
	double = 'double',
	step = 'step',
}

@Component({
	selector: 'mill-slider',
	templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit, OnChanges {

	// Input Values
	@Input()
	get minValue(): number { return this._minValue };
	set minValue(value: number) {
		this._minValue = this._parseInput(value);
	}
	private _minValue: number;

	@Input()
	get maxValue(): number { return this._maxValue };
	set maxValue(value: number) {
		this._maxValue = this._parseInput(value);
	}
	private _maxValue: number;

	@Input()
	get step(): number { return this._step }
	set step(value: number) {
		this._step = this._parseInput(value);
	}
	private _step?: number;

	@Input() public type?: sliderType = sliderType.basic;
	@Input() public disabled = false;

	// Output
	@Output() public valueChanged: EventEmitter<ResultInterface> = new EventEmitter<ResultInterface>();

	// Init
	private canInit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isSliderInit: boolean;
	public form: FormGroup;

	// Slider settings
	public sliderType = sliderType;
	public thumbName = ThumbNameEnum;

	private _sliderSettings: SliderSettingsInterface = {
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

	private _eventSubscriptions: Subscription[] = [];

	// Calculation
	@ViewChild('sliderContent', {static: true})
	private sliderContent: ElementRef;
	private _startArea: number;
	private _widthArea: number;
	private _moveCounter = 0;
	private _rangeFirstArray = [];
	private _rangeSecondArray = [];

	// Errors
	private _errorMessage: string;
	private _errorState = {
		hasMaxNumber: {
			valid: false,
			message: `Max number is NaN or undefined`
		},
		hasMinNumber: {
			valid: false,
			message: `Min number is NaN or undefined`
		},
		rangeMinMax: {
			valid: false,
			message: `Min number is bigger than max number`
		},
		availableStepNumber: {
			valid: false,
			message: `Step can be only number between 2 and 50`
		},
	};

	constructor(private _fb: FormBuilder) {

		this.form = this._fb.group({
			minValue: [{value: this.minValue, disabled: false}, null],
			maxValue: [{value: this.maxValue, disabled: false}, null],
		});

		this.canInit.subscribe(result => {
			this.isSliderInit = result;

			if (!result) return;

			this._setSliderArea();
			if (this.getType() === sliderType.step) {
				this._setRangeArray();
			}

		});

	}

	ngOnInit(): void {
		this.canSliderInit();
	}

	ngOnChanges(): void {
		console.log(this.step);
		this.canSliderInit();
		if (this.canInit.getValue()) {
			this._onChangeCalc();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this._setSliderArea();
	}

	/*
	*
	*	Init and error check
	*
	*/

	private _getEvent(eventOutput): void {
		const isTouch = this._isTouch(eventOutput.event);
		const moveEventName = isTouch ? 'touchmove' : 'mousemove';
		const endEventMove = isTouch ? 'touchend' : 'mouseup';

		this._addEvent(moveEventName);
		this._addEvent(endEventMove);

		if (isTouch) {
			this._addEvent('touchcancel');
		}

		this._setSelectedThumb(eventOutput.target, eventOutput.event);
	}

	private _addEvent(eventName): void {
		const event: Subscription = fromEvent(document.body, eventName).subscribe(
			event => {
				if (eventName === 'mousemove') {
					event.preventDefault();
				}

				// console.log('eventName: ', eventName, ' value: ', event);
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

	public canSliderInit(): void {

		this._errorState.hasMinNumber.valid = isNumber(this.minValue) && this.minValue >= 0;
		this._errorState.hasMaxNumber.valid = isNumber(this.maxValue) && this.maxValue >= 0;

		this._errorState.rangeMinMax.valid = this.minValue <= this.maxValue;

		if (this.getType() === sliderType.step) {
			this._errorState.availableStepNumber.valid = isNumber(this.step) && this.step >= 2 && this.step <= 50;
		}
		else {
			this._errorState.availableStepNumber.valid = true;
		}

		let valid;

		for (const key in this._errorState) {
			if (this._errorState.hasOwnProperty(key) && !this._errorState[key].valid) {
				valid = false;
				this._errorMessage = this._errorState[key].message;
				break;
			}
			valid = true;
		}

		this.canInit.next(valid);
	}

	/*
	*
	*	Thumb methods
	*
    */

	public onFocus(thumbName: ThumbNameEnum): void {
		this._setSelectedThumb(thumbName);
	}

	public onBlur(): void {
		this._sliderSettings.selectedThumb.name = null;
	}

	private _setSelectedThumb(thumbName: ThumbNameEnum, event?): void {

		if (this.disabled) return;

		this._sliderSettings.selectedThumb.name = thumbName;
		this._sliderSettings.selectedThumb.value = this._sliderSettings[thumbName];
		this._sliderSettings.lastSelected = thumbName;

		if (event) {
			this._sliderSettings.selectedThumb.position = this._isTouch(event) ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;
		}

	}

	/*
	*
	*	Change events
	*
	*/

	public onMove(event): void {
		const eventX = this._isTouch(event) && event.touches && event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;
		this._moveCounter = eventX - this._sliderSettings.selectedThumb.position;
		const result = this._sliderSettings.selectedThumb.value + Math.round(this._moveCounter / Math.round(this._widthArea / 100));

		this._updateValue(result);
	}

	public onKeyDown(event): void {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			const value = this._sliderSettings[this._sliderSettings.selectedThumb.name];
			this._updateValue(value, event.key);
		}
	}

	private _updateValue(value, key?: string): void {
		if (key) {
			const step = this.getType() === sliderType.step ? 100 / this.step : 1;

			value = key && key === 'ArrowRight' ? value + step : value - step;
		}

		if (this.getType() === sliderType.step) {
			value = this._calcStepValue(value);
		}

		this._calcViewValue(value);
		this._calcValue();
		this._checkTooltip();

		this._outputResult();
	}

	/*
	*
	* Calculation
	*
	*/

	// Calculate value for slider with step type
	private _calcStepValue(value): number {
		for (let i = 0; i < this.step; i++) {
			if (value >= this._rangeFirstArray[i] && value <= this._rangeSecondArray[i]) {
				return Math.round(value > ((this._rangeFirstArray[i] + this._rangeSecondArray[i]) / 2) ? this._rangeSecondArray[i] : this._rangeFirstArray[i]);
			}
		}
	}

	// Set array of numbers for slider with step type
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

	// Calculate UI thumb position
	private _calcViewValue(value): void {
		if (value || value === 0) {
			if (this._sliderSettings.selectedThumb.name === ThumbNameEnum.minValue) {
				if (value < 1) {
					this._sliderSettings[ThumbNameEnum.minValue] = 0;
				}
				else if (value > this._sliderSettings[ThumbNameEnum.maxValue]) {
					this._sliderSettings[ThumbNameEnum.minValue] = this._sliderSettings[ThumbNameEnum.maxValue];
				}
				else {
					this._sliderSettings[ThumbNameEnum.minValue] = value;
				}

			}
			else if (this._sliderSettings.selectedThumb.name === ThumbNameEnum.maxValue) {
				if (value > 100) {
					this._sliderSettings[ThumbNameEnum.maxValue] = 100;
				}
				else if (value < this._sliderSettings[ThumbNameEnum.minValue]) {
					this._sliderSettings[ThumbNameEnum.maxValue] = this._sliderSettings[ThumbNameEnum.minValue];
				}
				else {
					this._sliderSettings[ThumbNameEnum.maxValue] = value;
				}
			}
		}
	}

	// Set slider position
	private _setSliderArea(): void {
		this._startArea = Math.ceil(this.sliderContent.nativeElement.getBoundingClientRect().left);
		this._widthArea = this.sliderContent.nativeElement.getBoundingClientRect().width;
	}

	// Calculate new slider values
	private _calcValue(): void {
		const result = {};
		result[this._sliderSettings.selectedThumb.name] = this._calcNumber(this._sliderSettings.selectedThumb.name);
		this.form.patchValue(result);
	}

	// Calculate new slider values with new inputs
	private _onChangeCalc(): void {
		const result = {};

		if (this.getType() === sliderType.double) {
			result[ThumbNameEnum.minValue] = this._calcNumber(ThumbNameEnum.minValue);
			result[ThumbNameEnum.maxValue] = this._calcNumber(ThumbNameEnum.maxValue);
		}
		else {
			// this._sliderSettings[ThumbNameEnum.minValue] = 0;
			result[ThumbNameEnum.minValue] = 0;
			result[ThumbNameEnum.maxValue] = this._calcNumber(ThumbNameEnum.maxValue);
		}

		this.form.patchValue(result);
	}

	// Calculate UI percent value
	private _calcNumber(thumb): number {
		const calcValue = this.maxValue - this.minValue;
		return Math.round(this.minValue + calcValue / 100 * this._sliderSettings[thumb]);
	}


	/*
	*
	*	Output result
	*
	*/

	private _outputResult(): void {
		const obj: ResultInterface = {};

		if (this.getType() === this.sliderType.basic) {
			obj.maxValue = this.form.value[ThumbNameEnum.maxValue];
		}
		else if (this.getType() === this.sliderType.step) {
			obj.maxValue = this.form.value[ThumbNameEnum.maxValue];
		}
		else if (this.getType() === this.sliderType.double) {
			this.form.value[ThumbNameEnum.minValue] ? obj.minValue = this.form.value[ThumbNameEnum.minValue] : obj.minValue = this.minValue;
			this.form.value[ThumbNameEnum.maxValue] ? obj.maxValue = this.form.value[ThumbNameEnum.maxValue] : obj.maxValue = this.maxValue;
		}

		this.valueChanged.emit(obj);
	}

	/*
	*
	* UI methods
	*
	*/

	public getValue(fieldName): string {
		return this.form.value[fieldName];
	}

	public getType(): sliderType {
		return this.type;
	}

	public getBaseTrackStyle(): string {

		if (this.getType() === sliderType.step) {
			return `repeating-linear-gradient(to right, #E1E1E8, #E1E1E8 ${(100 / this.step) - 1}%, #fff ${(100 / this.step) - 1}%, #fff ${100 / this.step}%)`;
		}

		return '#E1E1E8';
	}

	public getTrackFillStyle(): string {
		// tslint:disable-next-line:max-line-length
		return `translate(${this._sliderSettings[ThumbNameEnum.minValue]}%, 0px) scale3d(${(this._sliderSettings[ThumbNameEnum.maxValue] - this._sliderSettings[ThumbNameEnum.minValue]) / 100}, 1, 1)`;
	}

	public getErrorMessage(): string {
		return this._errorMessage;
	}

	// UI tooltip
	private _checkTooltip(): void {
		if (this._sliderSettings[ThumbNameEnum.maxValue] - this._sliderSettings[ThumbNameEnum.minValue] < 20) {
			if (this._sliderSettings.selectedThumb.name === ThumbNameEnum.minValue) {
				this._sliderSettings.hiddenTooltip = ThumbNameEnum.maxValue;
			}
			else if (this._sliderSettings.selectedThumb.name === ThumbNameEnum.maxValue) {
				this._sliderSettings.hiddenTooltip = ThumbNameEnum.minValue;
			}
		}
		else {
			this._sliderSettings.hiddenTooltip = null;
		}
	}

	private _parseInput = (value): number => {
		if (!isNaN(value)) {
			return parseInt(value, null);
		}
		return value;
	};

	private _isTouch = (event): boolean => {
		return event.type[0] === 't';
	};

}
