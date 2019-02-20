import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class FuuiInput {
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

    renderer.addClass(this.wrapper, 'fuui-input');
    renderer.addClass(input, 'fuui-input__input');
    renderer.addClass(this.caption, 'fuui-input__caption');

    input.addEventListener('input', () => {
      this.value.next(this.input.value);
      this.updateCaptionState();
    });

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
      this.renderer.addClass(this.wrapper, 'fuui-input_warn');
    } else {
      this.renderer.removeClass(this.wrapper, 'fuui-input_warn');
    }
  }

  private updateCaptionState(): void {
    if (this.input.value) {
      this.renderer.addClass(this.wrapper, 'fuui-input_filled');
    } else {
      this.renderer.removeClass(this.wrapper, 'fuui-input_filled');
    }
  }


  private watchInputValueChanges(): void {
    this.input.addEventListener('input', () => {
      this.value.next(this.input.value);
      this.updateCaptionState();
    });
  }
}
