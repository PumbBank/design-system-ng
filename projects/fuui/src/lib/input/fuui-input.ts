import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class FuuiInput {
  wrapper: HTMLElement;
  value$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private input: HTMLInputElement, private renderer: Renderer2) {
    const caption: HTMLElement = renderer.createElement('div');
    this.wrapper = renderer.createElement('label');
    const captionText = renderer.createText(input.getAttribute('placeholder') || '');

    renderer.insertBefore(input.parentElement, this.wrapper, input);
    renderer.appendChild(this.wrapper, caption);
    renderer.appendChild(this.wrapper, input);
    renderer.appendChild(caption, captionText);

    renderer.addClass(this.wrapper, 'fuui-input');
    renderer.addClass(input, 'fuui-input__input');
    renderer.addClass(caption, 'fuui-input__caption');

    input.addEventListener('input', () => {
      this.updateCaption();
    });
  }

  writeValue(value: any) {
    this.input.value = value;
    this.updateCaption();
    this.value$.next(this.input.value);
  }

  update(): void {
    this.updateCaption();
  }

  private updateCaption(): void {
    if (this.input.value) {
      this.renderer.addClass(this.wrapper, 'fuui-input_filled');
    } else {
      this.renderer.removeClass(this.wrapper, 'fuui-input_filled');
    }
  }
}
