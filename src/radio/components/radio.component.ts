import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioChange } from './radio-change.class';

@Component({
  selector: 'radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['./radio.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioComponent,
      multi: true
    }
  ]
})

export class RadioComponent {
  /**
   * Used to dynamically create unique ids for the `Radio`.
   */
  static radioCount = 0;

  @Input() checked = false;

  @Input() name = '';

  @Input() disabled = false;
  /**
   * Sets the HTML required attribute
   */
  @Input() required = false;
  /**
   * The value of the `Radio`.
   */
  @Input() value = '';
  /**
   * The id for the `Radio`.
   */
  @Input() id = `radio-${RadioComponent.radioCount++}`;

  /**
   * Handler provided by the `RadioGroup` to bubble events up
   */
  radioChangeHandler = (event: RadioChange) => {};

  /**
   * Synchronizes with the `RadioGroup` in the event of a changed `Radio`.
   * Emits the changes of both the `RadioGroup` and `Radio`.
   */
  onChange(event: Event) {
    event.stopPropagation();
    this.checked = (event.target as HTMLInputElement).checked;
    // const radioEvent = new RadioChange(this, this.value);
    // this.change.emit(radioEvent);
    // this.radioChangeHandler(radioEvent);
  }

  onClick(event) {
    if (event && !this.disabled) {
      this.checked = true;
    }
  }

  /**
   * Method called by `RadioGroup` with a callback function to bubble `RadioChange` events
   * @param fn callback that expects a `RadioChange` as an argument
   */
  registerRadioChangeHandler(fn: (event: RadioChange) => void) {
    this.radioChangeHandler = fn;
  }
}
