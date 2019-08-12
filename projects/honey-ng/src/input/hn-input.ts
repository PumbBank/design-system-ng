import { Renderer2, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessageHelper } from '../utils/error-message.helper';
import { ValidationErrors } from '@angular/forms';

export type CleanFunction = (inputValue: any) => string;

const DEFAULT_CLEN_FUNCTION = (inputValue: any): string => inputValue;

export class HnInput implements OnChanges, OnDestroy {

  protected cleanFunction: CleanFunction = DEFAULT_CLEN_FUNCTION;

  @Input() errors: ValidationErrors | null = null;
  @Input() caption: string = '';
  @Input() icon: string;

  wrapperElement: HTMLElement;
  captionElement: HTMLElement;
  bodyElement: HTMLElement;
  entranceElement: HTMLElement;
  footerElement: HTMLElement;
  msgWrapperElement: HTMLElement;
  msgIconElement: HTMLElement;
  msgTextElement: HTMLElement;
  iconElement: HTMLElement;

  value: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  validationStateObserver: MutationObserver;
  messagePresantationObserver: MutationObserver;

  constructor(
    private input: HTMLInputElement,
    private renderer: Renderer2,
  ) {
    this.createDom();
    this.watchInputValueChanges();
    this.watchTouches();
    this.watchValidationChangesByClassName();
    this.errorsUpdateText();
    this.watchValidationMessageChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors) {
      this.errorsUpdateText();
    }
    if (changes.caption) {
      this.captionUpdateText();
    }
    if (changes.icon) {
      this.updateIcon();
    }
  }

  ngOnDestroy(): void {
    this.validationStateObserver.disconnect();
    this.messagePresantationObserver.disconnect();
  }

  registerOnChange(fn: Function) {
    this.onChangeCallback = fn;
    setTimeout(() => fn(this.input.value));
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
  }

  onChangeCallback: Function = () => { };
  onTouchedCallback: Function = () => { };

  private updateValidationState(invalid: boolean = false): void {
    if (invalid) {
      this.renderer.addClass(this.wrapperElement, 'input_error');

    } else {
      this.renderer.removeClass(this.wrapperElement, 'input_error');
    }
  }

  private watchInputValueChanges(): void {
    this.input.addEventListener('input', () => {
      const cleanValue = this.cleanFunction(this.input.value);

      if (this.input.value !== cleanValue) {
        this.input.value = cleanValue;
      }

      this.onChangeCallback(cleanValue);
    });
  }

  private watchValidationChangesByClassName(): void {
    this.validationStateObserver = new MutationObserver(() => {
      this.updateValidationState(this.input.classList.contains('ng-invalid') && this.input.classList.contains('ng-touched'));
    });

    this.validationStateObserver.observe(this.input, { attributes: true });
  }

  private watchValidationMessageChanges(): void {
    this.messagePresantationObserver = new MutationObserver(() => {
      this.updateMessagePresentation(this.errors);
    });

    this.messagePresantationObserver.observe(
      this.msgTextElement,
      { characterData: false, attributes: false, childList: true, subtree: false }
    );
  }

  private updateMessagePresentation(errors): void {
    if (errors) {
      this.renderer.appendChild(this.footerElement, this.msgWrapperElement);
    } else {
      this.renderer.removeChild(this.footerElement, this.msgWrapperElement);
    }
  }

  private updateIcon(): void {
    if (this.icon) {
      this.iconElement.classList.forEach((cl) => {
        if (cl.match(/icon_/)) {
          this.renderer.removeClass(this.iconElement, cl);
        }
      });

      this.renderer.addClass(this.iconElement, 'icon_' + this.icon);
      this.renderer.appendChild(this.bodyElement, this.iconElement);
    } else {
      this.renderer.removeChild(this.bodyElement, this.iconElement);
    }
  }

  private watchTouches(): void {
    this.input.addEventListener('blur', () => {
      this.onTouchedCallback();
    });
  }

  private createDom(): void {
    this.wrapperElement = this.renderer.createElement('label');
    this.captionElement = this.renderer.createElement('div');
    this.bodyElement = this.renderer.createElement('div');
    this.entranceElement = this.renderer.createElement('div');
    this.footerElement = this.renderer.createElement('div');
    this.msgWrapperElement = this.renderer.createElement('div');
    this.msgIconElement = this.renderer.createElement('div');
    this.msgTextElement = this.renderer.createElement('div');
    this.iconElement = this.renderer.createElement('div');

    this.renderer.insertBefore(this.input.parentElement, this.wrapperElement, this.input);
    this.renderer.appendChild(this.wrapperElement, this.captionElement);
    this.renderer.appendChild(this.wrapperElement, this.bodyElement);
    this.renderer.appendChild(this.wrapperElement, this.footerElement);

    this.renderer.appendChild(this.bodyElement, this.entranceElement);
    this.renderer.appendChild(this.entranceElement, this.input);

    this.renderer.appendChild(this.msgWrapperElement, this.msgIconElement);
    this.renderer.appendChild(this.msgWrapperElement, this.msgTextElement);

    this.renderer.addClass(this.wrapperElement, 'input');
    this.renderer.addClass(this.captionElement, 'input__label');
    this.renderer.addClass(this.bodyElement, 'input__body');
    this.renderer.addClass(this.entranceElement, 'input__enterence');
    this.renderer.addClass(this.input, 'input__input');
    this.renderer.addClass(this.footerElement, 'input__footer');
    this.renderer.addClass(this.msgWrapperElement, 'control-message');
    this.renderer.addClass(this.msgWrapperElement, 'input__control-message');
    this.renderer.addClass(this.msgIconElement, 'control-message__icon');
    this.renderer.addClass(this.msgIconElement, 'icon');
    this.renderer.addClass(this.msgIconElement, 'icon_info');
    this.renderer.addClass(this.msgTextElement, 'control-message__text');
    this.renderer.addClass(this.iconElement, 'icon');
    this.renderer.addClass(this.iconElement, 'input__icon');
  }

  private errorsUpdateText() {
    this.msgTextElement.innerText = this.errors ? ErrorMessageHelper.getMessage(this.errors) : '';
  }

  private captionUpdateText() {
    this.captionElement.innerText = this.caption || '';
  }
}
