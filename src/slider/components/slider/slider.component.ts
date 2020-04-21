import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  EventOutputInterface, KeyCodeEnum,
  ResultInterface,
  SliderConfigInterface,
  SliderTypeEnum,
  ThumbNameEnum
} from '../../slider';


const GRAY_20 = '#E1E1E8';

@Component({
  selector: 'mill-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit, OnChanges, ControlValueAccessor {

  /** Type of slider can be "basic", "double" or "step" */
  @Input() public type?: SliderTypeEnum = SliderTypeEnum.basic;

  /** Disable state for slider */
  @Input() public disabled = false;

  /** Minimum slider value */
  @Input()
  get minValue(): number {
    return this._minValue;
  }

  set minValue(value: number) {
    this._minValue = this._toNumber(value);
  }

  private _minValue: number;

  /** Maximum slider value */
  @Input()
  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(value: number) {
    this._maxValue = this._toNumber(value);
  }

  private _maxValue: number;

  /** Starting value for the max value */
  @Input()
  get startMax(): number {
    return this._startMax;
  }

  set startMax(value: number) {

    this._startMax = this._toNumber(value);

    if (this._startMax !== null) {

      if (this._startMax > this.maxValue) {
        console.warn(`[Mill Slider] The start max value cannot be greater than the max value`);
        this._startMax = this.maxValue;
      }

      if (this.getType() === SliderTypeEnum.step) {
        if (this._rangeFirstArray.length === 0) {
          this._setRangeArray().then(() => {
            this.sliderConfig[ThumbNameEnum.maxValue] = this._calcStepValue(this._toPercent(this._startMax));
            this._startMax = this._calcNumber(ThumbNameEnum.maxValue);
            this.form.get(ThumbNameEnum.maxValue).setValue(this._startMax);
          });
        } else {
          this.sliderConfig[ThumbNameEnum.maxValue] = this._calcStepValue(this._toPercent(this._startMax));
          this._startMax = this._calcNumber(ThumbNameEnum.maxValue);
        }
      } else {
        this.sliderConfig[ThumbNameEnum.maxValue] = this._toPercent(this._startMax);
      }

      this.form.get(ThumbNameEnum.maxValue).setValue(this._startMax);
    }
  }

  private _startMax?: number;

  /** Starting value for the min value */
  @Input()
  get startMin(): number {
    return this._startMin;
  }

  set startMin(value: number) {

    this._startMin = this._toNumber(value);

    if (this._startMin !== null && this.getType() === SliderTypeEnum.double) {

      if (this.startMax && this._startMin > this.startMax) {
        console.warn(`[Mill Slider] The start min value cannot be greater than the start max value`);
        this._startMin = this.startMax;
      }

      this.sliderConfig[ThumbNameEnum.minValue] = this._toPercent(this._startMin);
      this.form.get(ThumbNameEnum.minValue).setValue(this._startMin);
    }
  }

  private _startMin?: number;

  /** Number of steps for slider with type "step" */
  @Input()
  get step(): number {
    return this._step;
  }

  set step(value: number) {

    this._step = this._toNumber(value);

    if (this._step !== null) {
      if (this._step < 2) {
        this._step = 2;
        console.warn(`[Mill Slider] The step must be greater than 2`);
      } else if (this._step > 50) {
        this._step = 50;
        console.warn(`[Mill Slider] The step cannot be more than 50`);
      }

      this._setRangeArray().then();
    }

  }

  private _step?: number;

  /** Output result */
  // tslint:disable-next-line:no-output-native
  @Output('result') public valueChanged: EventEmitter<ResultInterface> = new EventEmitter<ResultInterface>();

  /** Slider form group for values */
  public form: FormGroup;

  /** Enum for slider type */
  public sliderType = SliderTypeEnum;

  /** Enum for thumb names */
  public thumbName = ThumbNameEnum;

  /** Init slider config */
  public sliderConfig: SliderConfigInterface = {
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
  private _eventSubscriptions$: Subscription[] = [];

  /** Reference to the slider content */
  @ViewChild('sliderContent', {static: true}) private _sliderContent: ElementRef;

  /** Slider content width */
  private _sliderWidth: number;

  /** The result of moving thumb */
  private _moveCounter = 0;

  /** Arrays of steps */
  private _rangeFirstArray = [];
  private _rangeSecondArray = [];

  constructor(
    private _fb: FormBuilder,
    private _cd: ChangeDetectorRef
  ) {
    this.form = this._fb.group({
      minValue: [{value: this.minValue, disabled: false}, null],
      maxValue: [{value: this.maxValue, disabled: false}, null],
    });
  }

  ngOnChanges(): void {
    this._validateSlider();
    this._calcValue();
  }

  ngOnInit(): void {
    this._validateSlider();
    this._getSliderContentWidth();
  }

  /** Control value accessor methods */
  writeValue(value: ResultInterface) {

    if (value && Object.keys(value).length > 0) {

      const result: ResultInterface = {};

      if ('maxValue' in value) {

        result.maxValue = this._toNumber(value.maxValue);

        if (result.maxValue !== null) {

          if (result.maxValue > this.maxValue) {
            console.warn(`[Mill Slider] The new value cannot be greater than the max value`);
            result.maxValue = this.maxValue;
          }

          if (this.getType() === SliderTypeEnum.step && this.step > 0) {
            this.sliderConfig[ThumbNameEnum.maxValue] = this._calcStepValue(this._toPercent(result.maxValue));
            result.maxValue = this._calcNumber(ThumbNameEnum.maxValue);
          } else {
            this.sliderConfig[ThumbNameEnum.maxValue] = this._toPercent(result.maxValue);
          }

          if (result.maxValue < this.minValue || result.maxValue < this._startMin) {
            this.sliderConfig[ThumbNameEnum.minValue] = this._toPercent(result.maxValue);
          }

        }

      }

      if ('minValue' in value) {

        if (this.getType() === SliderTypeEnum.double) {

          result.minValue = this._toNumber(value.minValue);

          if (result.minValue !== null) {

            if (result.minValue > result.maxValue) {
              console.warn(`[Mill Slider] The min value cannot be greater than the max value`);
              result.minValue = result.maxValue;
            }

            if (result.minValue < this.minValue) {
              console.warn(`[Mill Slider] The new value cannot be less than the min value`);
              result.minValue = this.minValue;
            }

            this.sliderConfig[ThumbNameEnum.minValue] = this._toPercent(result.minValue);
          }

        } else {
          this.sliderConfig[ThumbNameEnum.minValue] = 0;
          result.minValue = this.minValue;
        }

      }

      this.form.patchValue(result);
      this._validateSlider();
      this._checkTooltip();
    }

  }

  private _onTouched: any = () => {
  }

  public registerOnChange(fn): void {
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(fn);
  }

  public registerOnTouched(fn): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('window:resize')
  public onResize(): void {
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
          this.sliderConfig.selectedThumb.name = null;
          break;
        case 'focus':
          this._setSelectedThumb(eventOutput.target);
          break;
      }

      this._onTouched();
    }
  }

  /** Push event from slider thumb */
  private _addEvent(eventName): void {

    const event$: Subscription = fromEvent(window, eventName, {passive: eventName !== 'mousemove'}).subscribe(
      event => {

        if (event) {
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
            this.sliderConfig.selectedThumb.name = null;
            this._clearEvents();
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

  /** Setting basic options for the selected thumb */
  private _setSelectedThumb(thumbName: ThumbNameEnum, event?): void {

    if (this.disabled) {
      return;
    }

    this.sliderConfig.selectedThumb.name = thumbName;
    this.sliderConfig.selectedThumb.value = this.sliderConfig[thumbName];
    this.sliderConfig.lastSelected = thumbName;

    if (event) {
      this.sliderConfig.selectedThumb.position = this._isTouch(event)
      && event.touches
      && event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;
    }

    // Check if we need to hide one of the tooltips (just for UI)
    if (this.getType() === SliderTypeEnum.double) {
      this._checkTooltip();
    }

  }

  /** Mouse/touch move event */
  public onMove(event): void {

    if (!this._sliderWidth) {
      this._getSliderContentWidth();
    }

    // Get X position for our touch or cursor
    const eventX = this._isTouch(event) && event.touches && event.touches.length > 0 ? (event.touches[0].pageX || event.changedTouches[0].pageX) : event.pageX;

    // Position difference calculation
    this._moveCounter = eventX - this.sliderConfig.selectedThumb.position;

    // Calculation of position as a percentage
    const result = this.sliderConfig.selectedThumb.value + Math.round(this._moveCounter / Math.round(this._sliderWidth / 100));

    this._updateValue(result);
  }

  /** Key down event */
  public onKeyDown(event): void {
    if (event.key === KeyCodeEnum.keyLeft || event.key === KeyCodeEnum.keyRight) {
      const value = this.sliderConfig[this.sliderConfig.selectedThumb.name];
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

    this._cd.markForCheck();
  }

  /** Calculate UI thumb position */
  private _calcViewValue(value): void {
    if (value || value === 0) {
      if (this.sliderConfig.selectedThumb.name === ThumbNameEnum.minValue) {
        if (value < 1) {
          this.sliderConfig[ThumbNameEnum.minValue] = 0;
        } else if (value > this.sliderConfig[ThumbNameEnum.maxValue]) {
          this.sliderConfig[ThumbNameEnum.minValue] = this.sliderConfig[ThumbNameEnum.maxValue];
        } else {
          this.sliderConfig[ThumbNameEnum.minValue] = value;
        }

      } else if (this.sliderConfig.selectedThumb.name === ThumbNameEnum.maxValue) {
        if (value > 100) {
          this.sliderConfig[ThumbNameEnum.maxValue] = 100;
        } else if (value < this.sliderConfig[ThumbNameEnum.minValue]) {
          this.sliderConfig[ThumbNameEnum.maxValue] = this.sliderConfig[ThumbNameEnum.minValue];
        } else {
          this.sliderConfig[ThumbNameEnum.maxValue] = value;
        }
      }
    }
  }

  /** Set array of numbers for slider with step type */
  private _setRangeArray() {
    this._rangeFirstArray = [];
    this._rangeSecondArray = [];

    const value = 100 / this.step;

    let count = 0;

    for (let i = 0; i < this.step; i++) {
      this._rangeFirstArray.push(count);
      count = count + value;
      this._rangeSecondArray.push(count);
    }

    return new Promise((resolve) => resolve());
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

    result[ThumbNameEnum.minValue] = this._calcNumber(ThumbNameEnum.minValue);
    result[ThumbNameEnum.maxValue] = this._calcNumber(ThumbNameEnum.maxValue);

    this.form.patchValue(result);
    this.valueChanged.emit(result);
  }

  /** Calculate UI percent value */
  private _calcNumber(thumb): number {
    const calcValue = this.maxValue - this.minValue;
    return Math.round(this.minValue + calcValue / 100 * this.sliderConfig[thumb]);
  }

  /** Check if active thumb is close to another thumb, hide another */
  private _checkTooltip(): void {
    if (this.sliderConfig[ThumbNameEnum.maxValue] - this.sliderConfig[ThumbNameEnum.minValue] < 20) {
      if (this.sliderConfig.selectedThumb.name === ThumbNameEnum.minValue) {
        this.sliderConfig.hiddenTooltip = ThumbNameEnum.maxValue;
      } else {
        this.sliderConfig.hiddenTooltip = ThumbNameEnum.minValue;
      }
    } else {
      this.sliderConfig.hiddenTooltip = null;
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
      return `repeating-linear-gradient(to right, ${GRAY_20}, ${GRAY_20} ${(100 / this.step) - 1}%, transparent ${(100 / this.step) - 1}%, transparent ${100 / this.step}%)`;
    }
    return GRAY_20;
  }

  /** Return css style for the filled track */
  public getTrackFillStyle(): string {
    return `translate(${this.sliderConfig[ThumbNameEnum.minValue]}%, 0px)
				scale3d(${(this.sliderConfig[ThumbNameEnum.maxValue] - this.sliderConfig[ThumbNameEnum.minValue]) / 100}, 1, 1)`;
  }


  /** Validate slider min, max value */
  private _validateSlider(): void {

    if (this.getType() !== SliderTypeEnum.double) {
      this.sliderConfig[ThumbNameEnum.minValue] = 0;
      this.form.get(ThumbNameEnum.minValue).setValue(this.minValue);
    }

    if (this.minValue > this.maxValue) {
      this.minValue = this.maxValue;
      console.warn(`[Mill Slider] The min value cannot be greater than the max value`);
    }

  }

  /** Convert value to percent */
  private _toPercent(value: number): number {
    return 100 / ((this.maxValue - this.minValue) / (value - this.minValue));
  }

  /** Convert value to number */
  private _toNumber = (value: any): number => {

    if (!isNaN(value)) {
      return parseInt(value, null);
    }

    console.warn(`[Mill Slider] ${value} is not a number`);
    return null;
  }

  /** Check if event is touch event */
  private _isTouch = (event): boolean => {
    return event.type[0] === 't';
  }

}
