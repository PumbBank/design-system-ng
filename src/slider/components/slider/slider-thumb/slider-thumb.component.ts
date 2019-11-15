import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { SliderConfigInterface, ThumbNameEnum } from '../slider.component';

interface EventOutputInterface {
	event: Event;
	target: ThumbNameEnum;
}

@Component({
	selector: 'slider-thumb',
	templateUrl: './slider-thumb.component.html',
	host: {
		'[tabIndex]': '0',
	}
})
export class SliderThumbComponent implements OnInit{

	/** Thumb name (min or max value) */
	@Input() thumbName: ThumbNameEnum;

	/** Slider config */
	@Input() config: SliderConfigInterface;

	/** Real value for view */
	@Input() value: string;

	/** Output event (mousedown or touchstart) */
	@Output() eventOutput: EventEmitter<EventOutputInterface> = new EventEmitter<EventOutputInterface>();

	constructor() {
	}

	ngOnInit() {
	}

	@HostListener('mousedown', ['$event'])
	onMouseDown(event: MouseEvent): void {
		const obj = {
			event: event,
			target: this.thumbName
		};
		console.log(obj);
		this.eventOutput.emit(obj);
	}

	@HostListener('touchstart', ['$event'])
	onTouchStart(event: TouchEvent) : void {
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
		return `translate(${this.config[this.thumbName]}%, 0px)`;
	}

}
