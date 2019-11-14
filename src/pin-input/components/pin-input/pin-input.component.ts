import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LENGTH = 4;
const DEFAULT_PATTERN = /\d/;
const BACKSPACE_KEY = 'Backspace';

const LEFT_KEY = 'ArrowLeft';
const RIGHT_KEY = 'ArrowRight';

@Component({
	selector: 'mill-pin-input',
	templateUrl: './pin-input.component.html',
	styles: [`

		.pin-input__input::selection {
			background: transparent !important;
		}

		.pin-input__ceil_focused {
			border: 2px solid #6D6D7A;
			line-height: 60px;
			box-sizing: border-box;
		}


		.pin-input__input {
			opacity: 0;
			width: 0px;
			height: 0px;
		}
	`]
})
export class PinInputComponent {
	charsArray = new Array(DEFAULT_LENGTH).fill('');

	focused = false;
	focusedIndex = 0;

	@Input() invalid: boolean = false;
	@Input() errorMessage: string = '';

	@Input()
	pattern: RegExp = DEFAULT_PATTERN;

	@Input()
	set length(value: number) {
		const delta = value - this.length;

		if (delta > 0) {
			this.charsArray.push(...new Array(delta).fill(''));
		} else if (delta < 0) {
			this.charsArray.splice(this.length + delta, Math.abs(delta));
		}
	};


	get length(): number {
		return this.charsArray.length;
	}

	@Input()
	set value(value: string) {
		const valueStr = new String(value);
		this.charsArray.forEach((item: any, index: number) => {
			const char = valueStr[index] || '';
			if (this.pattern.test(char)) {
				this.charsArray[index] = char;
			} else {
				this.charsArray[index] = '';
			}
		})
	}

	get value(): string {
		return this.charsArray.join('');
	}

	@Output() valueChanges = new EventEmitter<string>();
	@Output() enter = new EventEmitter<any>();

	handleInput(e: KeyboardEvent): void {

		switch (e.key) {
			case LEFT_KEY:
				this.focusedIndex = this.focusedIndex > 0 ? this.focusedIndex - 1 : 0;
				break;
			case RIGHT_KEY:
				this.focusedIndex = this.focusedIndex < this.length - 1 ? this.focusedIndex + 1 : this.length - 1;
				break;
			case BACKSPACE_KEY:
				if (!this.charsArray[this.focusedIndex]) {
					this.focusedIndex--;
					if (this.focusedIndex < 0) {
						this.focusedIndex = 0;
					}
				}

				this.charsArray[this.focusedIndex] = ''
				this.valueChanges.emit(this.value);
				break;

			default:
				if (this.focusedIndex > -1 && this.focusedIndex < this.length) {
					const char = e.key.trim();

					if (char.length === 1 && this.pattern.test(char)) {
						this.charsArray[this.focusedIndex] = char;
						this.valueChanges.emit(this.value);
						this.focusedIndex++;
					}
				}

				if (this.focusedIndex >= this.length && this.value.length === this.length) {
					this.enter.emit({ value: this.value, charsArray: this.charsArray });
				}
		}

		e.stopPropagation();
		e.preventDefault();
	}

	onCeilClick(index: number) {
		this.focusedIndex = index;
		while (this.focusedIndex > 0 && this.charsArray[this.focusedIndex - 1] === '') {
			this.focusedIndex--;
		}
	}

	onFocus() {
		// this.focusedIndex = 0;
		this.focused = true;
	}

	onBlur() {
		this.focused = false;
	}


	trackByFn(index: number) {
		return index;
	}
}
