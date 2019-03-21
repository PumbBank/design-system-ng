import { Renderer2, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessageHelper } from '../utils/error-message.helper';
import { ValidationErrors } from '@angular/forms';

export type CleanFunction = (inputValue: string) => string;

const DEFAULT_CLEN_FUNCTION = (inputValue: string): string => inputValue;

export class HnInput implements OnChanges {
  @Input()
  errors: ValidationErrors | null = null;

  wrapperElement: HTMLElement;
  captionElement: HTMLElement;
  errorsElement: HTMLElement;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors) {
      this.errorsUpdateText();
    }
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
      this.renderer.addClass(this.wrapperElement, 'hn-input_warn');
    } else {
      this.renderer.removeClass(this.wrapperElement, 'hn-input_warn');
    }
  }

  private updateCaptionState(): void {
    if (this.input.value) {
      this.renderer.addClass(this.wrapperElement, 'hn-input_filled');
    } else {
      this.renderer.removeClass(this.wrapperElement, 'hn-input_filled');
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
    this.captionElement = this.renderer.createElement('div');
    this.wrapperElement = this.renderer.createElement('label');
    this.errorsElement = this.renderer.createElement('div');

    const captionText = this.renderer.createText(this.input.getAttribute('placeholder') || '');

    this.renderer.insertBefore(this.input.parentElement, this.wrapperElement, this.input);
    this.renderer.appendChild(this.wrapperElement, this.captionElement);
    this.renderer.appendChild(this.wrapperElement, this.input);
    this.renderer.appendChild(this.wrapperElement, this.errorsElement);
    this.renderer.appendChild(this.captionElement, captionText);

    this.renderer.addClass(this.wrapperElement, 'hn-input');
    this.renderer.addClass(this.input, 'hn-input__input');
    this.renderer.addClass(this.captionElement, 'hn-input__caption');
    this.renderer.addClass(this.errorsElement, 'hn-input__hint');
    this.renderer.addClass(this.errorsElement, 'hn-input__hint_warn');
  }

  private errorsUpdateText() {
    this.errorsElement.innerText = this.errors ? ErrorMessageHelper.getMessage(this.errors) : '';
  }
}
