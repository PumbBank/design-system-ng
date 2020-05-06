import { Renderer2, OnChanges, SimpleChanges, Input, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RequirebleComponent } from '../../utils/abstract-requireble';
import { ErrorMessageHelper } from '../../utils/error-message.helper';


export type CleanFunction = (inputValue: any) => string;

const DEFAULT_CLEAN_FUNCTION = (inputValue: any): string => inputValue;

export class MillInput extends RequirebleComponent implements OnChanges, OnDestroy {

  constructor(
    private input: HTMLInputElement,
    public renderer: Renderer2,
  ) {
    super();
    this.createDom();
    this.watchInputValueChanges();
    this.watchTouches();
    this.watchValidationChangesByClassName();
    this.errorsUpdateText();
    this.watchValidationMessageChanges();
  }
  private invalid: boolean;
  private touched: boolean;

  protected cleanFunction: CleanFunction = DEFAULT_CLEAN_FUNCTION;

  @Input() errors: ValidationErrors | null = null;
  @Input() valid: string | boolean = null;
  @Input() caption = '';
  @Input() icon: string;
  @Input() cleanup = false;

  wrapperElement: HTMLElement;
  captionElement: HTMLElement;
  bodyElement: HTMLElement;
  entranceElement: HTMLElement;
  footerElement: HTMLElement;
  msgWrapperElement: HTMLElement;
  msgIconElement: HTMLElement;
  msgTextElement: HTMLElement;
  iconElement: HTMLElement;
  iconCleanupElement: HTMLElement;

  value: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  validationStateObserver: MutationObserver;
  messagePresentationObserver: MutationObserver;

  onChangeCallback: (cleanValue: string) => void;
  onTouchedCallback: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors || changes.valid) {
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
    this.messagePresentationObserver.disconnect();
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChangeCallback = fn;
    setTimeout(() => fn(this.input.value));
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedCallback = fn;
  }

  writeValue(value: any) {
    const cleanValue = this.cleanFunction(value);

    if (cleanValue !== value) {
      this.onChangeCallback(cleanValue);
    }

    this.input.value = cleanValue;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.input, 'disabled', isDisabled);
    isDisabled
      ? this.renderer.addClass(this.wrapperElement, 'input_disabled')
      : this.renderer.removeClass(this.wrapperElement, 'input_disabled');
  }

  private updateValidationState(invalid: boolean = false): void {
    this.invalid = invalid;
  }

  private updateTouchedState(touched: boolean = false): void {
    if (touched) {
      this.touched = true;
      return;
    }
    this.touched = false;
  }


  private watchInputValueChanges(): void {
    this.input.addEventListener('input', () => {
      const cleanValue = this.cleanFunction(this.input.value);

      if (this.input.value !== cleanValue) {
        this.input.value = cleanValue;
      }

      this.onChangeCallback(cleanValue);

      this.checkVisibilityCleanupIcon();
    });
  }

  private checkVisibilityCleanupIcon() {
    if (this.cleanup && this.input.value.length > 0) {
      if (!this.wrapperElement.classList.contains('input__btnCleanup') && !this.input.classList.contains('input__input-cleanup')) {
        this.renderer.addClass(this.wrapperElement, 'input__btnCleanup');
        this.renderer.addClass(this.input, 'input__input-cleanup');
        this.setBtnCleanup();
      }
    } else if (this.wrapperElement.classList.contains('input__btnCleanup') && this.input.classList.contains('input__input-cleanup')) {
      this.renderer.removeClass(this.wrapperElement, 'input__btnCleanup');
      this.renderer.removeClass(this.input, 'input__input-cleanup');
    }
  }

  private watchClickCleanupInput(): void {
    this.iconCleanupElement.addEventListener('click', () => {
      this.input.value = '';
      this.checkVisibilityCleanupIcon();
    });
  }

  private watchValidationChangesByClassName(): void {
    this.validationStateObserver = new MutationObserver(() => {
      this.updateValidationState(this.input.classList.contains('ng-invalid'));
      this.updateTouchedState(this.input.classList.contains('ng-touched'));
      this.errorsUpdateText();
    });

    this.validationStateObserver.observe(this.input, { attributeFilter: ['class'], attributes: true });
  }

  private watchValidationMessageChanges(): void {
    this.messagePresentationObserver = new MutationObserver(() => {
      this.updateMessagePresentation();
    });

    this.messagePresentationObserver.observe(
      this.msgTextElement,
      { characterData: false, attributes: false, childList: true, subtree: false }
    );
  }

  private updateMsgTextStyles() {
    if (this.touched && this.invalid) {
      this.renderer.removeClass(this.wrapperElement, 'input_valid');
      this.renderer.addClass(this.wrapperElement, 'input_error');

      this.renderer.removeClass(this.msgIconElement, 'icon_info');
      this.renderer.removeClass(this.msgIconElement, 'icon_valid');
      this.renderer.addClass(this.msgIconElement, 'icon_warning');

    } else if (this.valid) {
      this.renderer.removeClass(this.wrapperElement, 'input_error');
      this.renderer.addClass(this.wrapperElement, 'input_valid');


      this.renderer.removeClass(this.msgIconElement, 'icon_info');
      this.renderer.addClass(this.msgIconElement, 'icon_valid');
      this.renderer.removeClass(this.msgIconElement, 'icon_warning');
    } else {
      this.renderer.removeClass(this.wrapperElement, 'input_warning');
      this.renderer.removeClass(this.wrapperElement, 'input_valid');
      this.renderer.addClass(this.wrapperElement, 'input_info');

      this.renderer.addClass(this.msgIconElement, 'icon_info');
      this.renderer.removeClass(this.msgIconElement, 'icon_valid');
      this.renderer.removeClass(this.msgIconElement, 'icon_warning');
    }
  }

  private updateMessagePresentation(): void {
    if (this.errors && this.touched) {
      this.renderer.appendChild(this.footerElement, this.msgWrapperElement);
    } else if (this.valid && this.valid !== 'true' && this.valid !== true) {
      this.renderer.appendChild(this.footerElement, this.msgWrapperElement);
    } else {
      try {
        this.renderer.removeChild(this.footerElement, this.msgWrapperElement);
      } catch (e) { }
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
      this.renderer.appendChild(this.entranceElement, this.iconElement);
    } else {
      this.renderer.removeChild(this.entranceElement, this.iconElement);
    }
  }

  private setBtnCleanup(): void {

    this.renderer.addClass(this.iconCleanupElement, 'icon');
    this.renderer.addClass(this.iconCleanupElement, 'input__icon');

    this.renderer.addClass(this.iconCleanupElement, 'icon_circle-close');
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
    this.renderer.addClass(this.entranceElement, 'input__entrance');
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
    this.setCleanupIcon();
  }

  private setCleanupIcon() {
    this.iconCleanupElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.entranceElement, this.iconCleanupElement);
    this.watchClickCleanupInput();
  }

  private errorsUpdateText() {
    if (this.errors && this.touched) {
      this.msgTextElement.innerText = this.errors && this.touched ? ErrorMessageHelper.getMessage(this.errors) : '';
    } else if (!!this.valid && this.valid !== 'true' && this.valid !== true) {
      this.msgTextElement.innerText = this.valid as string;
    } else {
      this.msgTextElement.innerText = '123';
    }
    this.updateMessagePresentation();
    this.updateMsgTextStyles();
  }

  private captionUpdateText() {
    this.captionElement.innerText = `${this.caption}${this.required ? '' : ''}`;
    if (this.required) {
      this.renderer.addClass(this.wrapperElement, 'input_required');
    } else {
      this.renderer.removeClass(this.wrapperElement, 'input_required');
    }
  }
}

