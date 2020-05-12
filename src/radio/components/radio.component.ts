import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mill-radio',
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
   * Set to `true` to hide the checkbox labels.
   */
  @Input() hideLabel = false;
  /**
   * The id for the `Radio`.
   */
  @Input() id = `radio-${RadioComponent.radioCount++}`;
  /**
   * Attribute indicates how radio button can be sequential navigated with keyboard (usually Tab button).
   * '0' value means that the element should be focusable in sequential keyboard navigation,
   * but its order is defined by the document's source order.
   */
  @Input() tabindex = 0;

  /**
   * Synchronizes with the `RadioGroup` in the event of a changed `Radio`.
   * Emits the changes of both the `RadioGroup` and `Radio`.
   */
  onChange(event: Event) {
    event.stopPropagation();
    this.checked = (event.target as HTMLInputElement).checked;
  }

  onClick(event) {
    if (event && !this.disabled) {
      this.checkboxStateToggle();
    }
  }

  /**
   * Handles keyup events on the `Radio` with space bar and emits changes to other classes.
   */
  onKeyup(event) {
    if (event && event.keyCode === 32) {
      this.checkboxStateToggle();
    }
  }

  /**
   * Toggle state of radio button
   */
  checkboxStateToggle() {
    this.checked = true;
  }
}
