import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class HnInput {
  wrapper: HTMLElement;
  caption: HTMLElement;

  value: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private input: HTMLInputElement, private renderer: Renderer2) {
    this.caption = renderer.createElement('div');
    this.wrapper = renderer.createElement('label');

    const captionText = renderer.createText(input.getAttribute('placeholder') || '');

    renderer.insertBefore(input.parentElement, this.wrapper, input);
    renderer.appendChild(this.wrapper, this.caption);
    renderer.appendChild(this.wrapper, input);
    renderer.appendChild(this.caption, captionText);

    renderer.addClass(this.wrapper, 'hn-input');
    renderer.addClass(input, 'hn-input__input');
    renderer.addClass(this.caption, 'hn-input__caption');

    this.watchInputValueChanges();
    this.updateCaptionState();
  }

  writeValue(value: any) {
    this.input.value = value;
    this.value.next(this.input.value);
    this.updateCaptionState();
  }

  updateValidationState(invalid: boolean = false): void {
    if (invalid) {
      this.renderer.addClass(this.wrapper, 'hn-input_warn');
    } else {
      this.renderer.removeClass(this.wrapper, 'hn-input_warn');
    }
  }

  private updateCaptionState(): void {
    if (this.input.value) {
      this.renderer.addClass(this.wrapper, 'hn-input_filled');
    } else {
      this.renderer.removeClass(this.wrapper, 'hn-input_filled');
    }
  }


  private watchInputValueChanges(): void {
    this.input.addEventListener('input', () => {
      this.value.next(this.input.value);
      this.updateCaptionState();
    });
  }
}
