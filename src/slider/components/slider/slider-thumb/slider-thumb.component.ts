import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { SliderSettingsInterface, ThumbNameEnum } from '../slider.component';

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

	@Input() thumbName: ThumbNameEnum;
	@Input() config: SliderSettingsInterface;
	@Input() value: string;
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

	public isSelected(): boolean {
		return this.thumbName === this.config.selectedThumb.name;
	}

	public isLastSelected(): boolean {
		return this.thumbName === this.config.lastSelected;
	}

	public isHidden(): boolean {
		return this.thumbName === this.config.hiddenTooltip;
	}

	public calculateDif(): string {
		return `translate(${this.config[this.thumbName]}%, 0px)`;
	}

}
