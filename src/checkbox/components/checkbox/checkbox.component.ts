import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

/**
 * Defines the set of states for a checkbox component.
 */
export enum CheckboxState {
  Init,
  Indeterminate,
  Checked,
  Unchecked
}

/**
 * Used to emit changes performed on checkbox components.
 */
export class CheckboxChange {
  /**
   * Contains the `Checkbox` that has been changed.
   */
  source: CheckboxComponent;
  /**
   * The state of the `Checkbox` encompassed in the `CheckboxChange` class.
   */
  checked: boolean;
}

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['./checkbox.scss']
})

export class CheckboxComponent implements AfterViewInit {
  /**
   * Variable used for creating unique ids for checkbox components.
   */
  static checkboxCount = 0;

  /**
   * Set to `true` for a disabled checkbox.
   */
  @Input() disabled = false;
  /**
   * Set to `true` to hide the checkbox labels.
   */
  @Input() hideLabel = false;
  /**
   * The unique id for the checkbox component.
   */
  @Input() id = `checkbox-${CheckboxComponent.checkboxCount}`;
  /**
   * Reflects the required attribute of the `input` element.
   */
  @Input() required: boolean;

  /**
   * Reflects whether the checkbox state is indeterminate.
   */
  get indeterminate() {
    return this._INDETERMINATE;
  }

  /**
   * Set the checkbox's indeterminate state to match the parameter and transition the view to reflect the change.
   */
  @Input() set indeterminate(indeterminate: boolean) {
    const changed = this._INDETERMINATE !== indeterminate;
    this._INDETERMINATE = indeterminate;

    if (changed) {
      this.transitionCheckboxState(CheckboxState.Indeterminate);
    } else {
      this.transitionCheckboxState(this.checked ? CheckboxState.Checked : CheckboxState.Unchecked);
    }

    this.indeterminateChange.emit(this._INDETERMINATE);
  }

  /**
   * Returns value `true` if state is selected for the checkbox.
   */
  get checked() {
    return this._CHECKED;
  }

  /**
   * Updating the state of a checkbox to match the state of the parameter passed in.
   */
  @Input() set checked(checked: boolean) {
    if (checked !== this.checked) {
      if (this._INDETERMINATE) {
        Promise.resolve().then(() => {
          this._INDETERMINATE = false;
          this.indeterminateChange.emit(this._INDETERMINATE);
        });
      }
      this._CHECKED = checked;
      this.changeDetectorRef.markForCheck();
    }
  }

  /**
   * Emits event notifying other classes when a change in state occurs on a checkbox after a click.
   */
  @Output() changeEventEmitter = new EventEmitter<CheckboxChange>();
  /**
   * Emits event notifying other classes when a change in state occurs specifically on an indeterminate checkbox.
   */
  @Output() indeterminateChange = new EventEmitter<boolean>();

  /**
   * Set to `true` if the input checkbox is selected (or checked).
   */
  _CHECKED = false;
  /**
   * Set to `true` if the input checkbox is in state indeterminate.
   */
  _INDETERMINATE = false;

  currentCheckboxState: CheckboxState = CheckboxState.Init;

  /**
   * Maintains a reference to the view DOM element of the `Checkbox`.
   */
  @ViewChild('inputCheckbox', { static: true }) inputCheckbox: ElementRef;

  /**
   * Creates an instance of `Checkbox`.
   */
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    CheckboxComponent.checkboxCount++;
  }

  /**
   * Toggle the selected state of the checkbox.
   */
  public toggle() {
    this.checked = !this.checked;
  }

  /**
   * Executes on the event of a change within `Checkbox` to block propagation.
   */
  onChange(event) {
    event.stopPropagation();
  }

  /**
   * Handles click events on the `Checkbox` and emits changes to other classes.
   */
  onClick(event) {
    if (event && !this.disabled) {
      this.toggle();
      this.transitionCheckboxState(this._CHECKED ? CheckboxState.Checked : CheckboxState.Unchecked);
      this.emitChangeEvent();
    }
  }

  /**
   * Called when checkbox is blurred. Needed to properly implement `ControlValueAccessor`.
   */

  /**
   * Handles changes between checkbox states.
   */
  transitionCheckboxState(newState: CheckboxState) {
    const oldState = this.currentCheckboxState;

    // Indeterminate has to be set always if it's transitioned to
    // checked has to be set before indeterminate or it overrides
    // indeterminate's dash
    if (newState === CheckboxState.Indeterminate) {
      this.checked = false;
      this.inputCheckbox.nativeElement.indeterminate = true;
    }

    if (oldState === newState) {
      return;
    }

    this.currentCheckboxState = newState;
  }

  /**
   * Creates instance of `CheckboxChange` used to propagate the change event.
   */
  emitChangeEvent() {
    const event = new CheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this.changeEventEmitter.emit(event);
  }

  /**
   * Updates the checkbox if it is in the indeterminate state.
   */
  ngAfterViewInit() {
    if (this.indeterminate) {
      this.inputCheckbox.nativeElement.indeterminate = true;
      this.checked = false;
    }
  }
}

