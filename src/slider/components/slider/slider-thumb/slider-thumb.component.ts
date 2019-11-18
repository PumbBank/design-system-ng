import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { EventOutputInterface, SliderConfigInterface, ThumbNameEnum } from '../slider.component';

@Component({
	selector: 'slider-thumb',
	templateUrl: './slider-thumb.component.html',
	host: {
		'[tabIndex]': '0',
	}
})
export class SliderThumbComponent {

	/** Thumb name (min or max value) */
	@Input() thumbName: ThumbNameEnum;

	/** Slider config */
	@Input() config: SliderConfigInterface;

	/** Real value for view */
	@Input()
	get value(): string { return this._value };
	set value(value: string) {
		this._value = value[this.thumbName];
	}
	private _value: string;

	/** Output event (mousedown or touchstart) */
	@Output() eventOutput: EventEmitter<EventOutputInterface> = new EventEmitter<EventOutputInterface>();

	constructor() {
	}

	/** Event listeners */
	@HostListener('touchstart', ['$event'])
	@HostListener('mousedown', ['$event'])
	@HostListener('keydown', ['$event'])
	@HostListener('focus', ['$event'])
	@HostListener('blur', ['$event'])
	private _onEvent (event: any): void {
		const obj = {
			event: event,
			target: this.thumbName
		};
		this.eventOutput.emit(obj);
	}

	/** Is thumb selected */
	public isSelected(): boolean {
		return this.thumbName === this.config.selectedThumb.name;
	}

	/** Is thumb was selected previously */
	public isLastSelected(): boolean {
		return this.thumbName === this.config.lastSelected;
	}

	/** Is thumb hidden */
	public isHidden(): boolean {
		return this.thumbName === this.config.hiddenTooltip;
	}

	/** Calculate thumb UI position */
	public calculateDif(): string {
		return `translateX(-${100 - this.config[this.thumbName]}%)`;
	}

}
