import { Component, Input, Output, EventEmitter } from '@angular/core';

const DEFAULT_LENGTH = 4;
const DEFAULT_PATTERN = /\d/;
const BACKSPACE_KEY = 'Backspace';

const LEFT_KEY = 'ArrowLeft';
const RIGHT_KEY = 'ArrowRight';

@Component({
  selector: 'mill-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.scss']
})
export class PinInputComponent {
  charsArray: string[] = new Array(DEFAULT_LENGTH).fill('');

  focused: boolean = false;
  focusedIndex: number = 0;

  @Input() invalid: boolean = false;
  @Input() errorMessage: string = '';
  @Input() disable: boolean = false;

  @Input() pattern: RegExp = DEFAULT_PATTERN;

  @Input()
  set length(value: number) {
    const delta = value - this.length;

    if (delta > 0) {
      this.charsArray.push(...new Array(delta).fill(''));
    } else if (delta < 0) {
      this.charsArray.splice(this.length + delta, Math.abs(delta));
    }
  }


  get length(): number {
    return this.charsArray.length;
  }

  @Input()
  set value(value: string) {
    const valueStr = String(value);
    this.charsArray.forEach((item: any, index: number) => {
      const char = valueStr[index] || '';
      if (this.pattern.test(char)) {
        this.charsArray[index] = char;
      } else {
        this.charsArray[index] = '';
      }
    });
  }

  get value(): string {
    return this.charsArray.join('');
  }

  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();
  @Output() enter: EventEmitter<any> = new EventEmitter<any>();

  handleInput(e: KeyboardEvent): void {
    if (this.disable) {
      return;
    }
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

        this.charsArray[this.focusedIndex] = '';
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
          this.enter.emit({value: this.value, charsArray: this.charsArray});
        }
    }

    e.stopPropagation();
    e.preventDefault();
  }

  onCeilClick(index: number): void {
    this.focusedIndex = index;
    while (this.focusedIndex > 0 && this.charsArray[this.focusedIndex - 1] === '') {
      this.focusedIndex--;
    }
  }

  onFocus(): void {
    // this.focusedIndex = 0;
    this.focused = true;
  }

  onBlur(): void {
    this.focused = false;
  }

  trackByFn(index: number): number {
    return index;
  }
}
