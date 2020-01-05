import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'switcher-circle',
	templateUrl: './switcher-circle.component.html',
  styleUrls: [ './../switcher.scss' ]
})
export class SwitcherCircleComponent implements OnInit {

	/** Output event (mousedown or touchstart) */
	@Output() eventOutput: EventEmitter<object> = new EventEmitter<object>();

	/** Output circle width */
	@Output() circleWidth: EventEmitter<number> = new EventEmitter<number>(true);

	/** Reference to the switcher circle */
	@ViewChild('switcherCircle', {static: true})
	private _switcherCircle: ElementRef;

	constructor() {
	}

	ngOnInit() {
		this.circleWidth.emit(this._switcherCircle.nativeElement.getBoundingClientRect().width);
	}

	/** Event listeners */
	@HostListener('touchstart', ['$event'])
	@HostListener('mousedown', ['$event'])
	private _onEvent (e: any): void {
		const obj = {
			event: e,
		};
		this.eventOutput.emit(obj);
	}

}
