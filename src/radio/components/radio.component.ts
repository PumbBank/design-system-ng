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
  static radioCount: number = 0;

  @Input() checked: boolean = false;

  @Input() name: string = '';

  @Input() disabled: boolean = false;
  /**
   * Sets the HTML required attribute
   */
  @Input() required: boolean = false;
  /**
   * The value of the `Radio`.
   */
  @Input() value: string = '';
  /**
   * Set to `true` to hide the checkbox labels.
   */
  @Input() hideLabel: boolean = false;
  /**
   * The id for the `Radio`.
   */
  @Input() id: string = `radio-${RadioComponent.radioCount++}`;
  /**
   * Attribute indicates how radio button can be sequential navigated with keyboard (usually Tab button).
   * '0' value means that the element should be focusable in sequential keyboard navigation,
   * but its order is defined by the document's source order.
   */
  @Input() tabindex: number = 0;

  /**
   * Synchronizes with the `RadioGroup` in the event of a changed `Radio`.
   * Emits the changes of both the `RadioGroup` and `Radio`.
   */
  onChange(event: Event): void {
    event.stopPropagation();
    this.checked = (event.target as HTMLInputElement).checked;
  }

  onClick(event: Event): void {
    if (event && !this.disabled) {
      this.checkboxStateToggle();
    }
  }

  /**
   * Handles keyup events on the `Radio` with space bar and emits changes to other classes.
   */
  onKeyup(event: KeyboardEvent): void {
    if (event && event.code === 'Space') {
      this.checkboxStateToggle();
    }
  }

  /**
   * Toggle state of radio button
   */
  checkboxStateToggle(): void {
    this.checked = true;
  }
}
