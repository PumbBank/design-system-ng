import { RadioComponent } from './radio.component';

/**
 * Used to emit changes performed on a `Radio`.
 */
export class RadioChange {
  /**
   * Contains the `Radio` that has been changed.
   */
  source: RadioComponent | null;
  /**
   * The value of the `Radio` encompassed in the `RadioChange` class.
   */
  value: string;

  constructor(source: RadioComponent, value: string) {
    this.source = source;
    this.value = value;
  }
}
