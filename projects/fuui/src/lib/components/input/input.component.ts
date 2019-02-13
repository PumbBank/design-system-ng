import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'fuui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() title: string = '';
  @Input() value: string = null;
  @Input() invalidHint: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

  valid: boolean = false;
  invalid: boolean = false;

  onInput(e: KeyboardEvent, value: string): void {
    this.value = value;
    this.valueChange.emit(this.value);
  }

  onFocus(e: Event) {
    this.focus.emit(e);
  }
}
