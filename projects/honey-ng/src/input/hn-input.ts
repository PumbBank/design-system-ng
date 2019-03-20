import { Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CleanFunction = (inputValue: string) => string;

const DEFAULT_CLEN_FUNCTION = (inputValue: string): string => inputValue;

export class HnInput {
  wrapper: HTMLElement;
  caption: HTMLElement;

  value: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private input: HTMLInputElement,
    private renderer: Renderer2,
    private cleanFunction: CleanFunction = DEFAULT_CLEN_FUNCTION
  ) {
    this.createDom();
    this.updateCaptionState();
    this.watchInputValueChanges();
    this.watchTouches();
    this.watchValidationChangesByClassName();
  }

  registerOnChange(fn: Function) {
    this.onChangeCallback = fn;
    fn(this.input.value);
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }

  writeValue(value: any) {
    const cleanValue = this.cleanFunction(value);

    if (cleanValue !== value) {
      this.onChangeCallback(cleanValue);
    }

    this.input.value = cleanValue;
    this.updateCaptionState();
  }

  onChangeCallback: Function = () => { };
  onTouchedCallback: Function = () => { };

  private updateValidationState(invalid: boolean = false): void {
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
      const cleanValue = this.cleanFunction(this.input.value);

      if (this.input.value !== cleanValue) {
        this.input.value = cleanValue;
      }

      this.onChangeCallback(cleanValue);
      this.updateCaptionState();
    });
  }

  private watchValidationChangesByClassName(): void {
    const observer = new MutationObserver(() => {
      this.updateValidationState(this.input.classList.contains('ng-invalid') && this.input.classList.contains('ng-touched'));
    });

    observer.observe(this.input, { attributes: true });
  }

  private watchTouches(): void {
    this.input.addEventListener('blur', () => {
      this.onTouchedCallback();
    });
  }

  private createDom(): void {
    this.caption = this.renderer.createElement('div');
    this.wrapper = this.renderer.createElement('label');

    const captionText = this.renderer.createText(this.input.getAttribute('placeholder') || '');

    this.renderer.insertBefore(this.input.parentElement, this.wrapper, this.input);
    this.renderer.appendChild(this.wrapper, this.caption);
    this.renderer.appendChild(this.wrapper, this.input);
    this.renderer.appendChild(this.caption, captionText);

    this.renderer.addClass(this.wrapper, 'hn-input');
    this.renderer.addClass(this.input, 'hn-input__input');
    this.renderer.addClass(this.caption, 'hn-input__caption');
  }
}
