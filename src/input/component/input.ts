import {
  Renderer2,
  OnChanges,
  SimpleChanges,
  Input,
  OnDestroy,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ValidationErrors, FormGroupDirective } from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { RequirebleComponent, ErrorMessageHelper } from '../../utils';
import { takeUntil } from 'rxjs/operators';
import { AutocompleteComponent } from '../../autocomplete/components/autocomplete/autocomplete.component';
import { DomService } from '../../utils/services/dom.service';
import { IDataAutocomplete } from '../../autocomplete/models/data-autocomplete';

type ValidationErrorsType = ValidationErrors;

export type CleanFunction = (inputValue: any) => string;

const DEFAULT_CLEAN_FUNCTION = (inputValue: any): string => inputValue;

export class MillInput extends RequirebleComponent implements AfterContentInit, OnChanges, OnDestroy {

  private invalid: boolean;
  private dirty: boolean;
  private destroyed$: Subject<void> = new Subject<void>();

  private messageSource$: BehaviorSubject<string> = new BehaviorSubject('');
  currentInputValue: Observable<string> = this.messageSource$.asObservable();

  constructor(
    public input: HTMLInputElement,
    public renderer: Renderer2,
    public parentForm: FormGroupDirective,
    public domService?: DomService
  ) {
    super();
    this.createDom();
    this.watchInputValueChanges();
    this.watchTouches();
    this.watchValidationChangesByClassName();
    this.errorsUpdateText();
    this.watchValidationMessageChanges();

    this.watchFormSubmit();
  }

  protected cleanFunction: CleanFunction = DEFAULT_CLEAN_FUNCTION;

  @Input() errors: ValidationErrorsType | null = null;
  @Input() valid: string | boolean = null;
  @Input() caption: string = '';
  @Input() prefix: string;
  @Input() icon: string;
  @Input() cleanup: boolean = false;
  @Input() autocompleteDataSource: IDataAutocomplete | Array<string>;
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() cleanupClick: EventEmitter<void> = new EventEmitter<void>();

  wrapperElement: HTMLElement;
  captionElement: HTMLElement;
  bodyElement: HTMLElement;
  entranceElement: HTMLElement;
  footerElement: HTMLElement;
  prefixElement: HTMLElement;
  msgWrapperElement: HTMLElement;
  msgIconElement: HTMLElement;
  msgTextElement: HTMLElement;
  iconElement: HTMLElement;
  iconCleanupElement: HTMLElement;

  loaderWrap: HTMLElement;
  loader: HTMLElement;

  value: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  validationStateObserver: MutationObserver;
  messagePresentationObserver: MutationObserver;

  onChangeCallback: (cleanValue: string) => void;
  onTouchedCallback: () => void;
  onUpdateIconCallback: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.errors || changes.valid) {
    //   this.errorsUpdateText();
    // }

    if (changes.valid) {
      this.errorsUpdateText();
    }
    if (changes.caption) {
      this.captionUpdateText();
    }
    if (changes.icon) {
      this.updateIcon();
    }
    if (changes.prefix) {
      this.setPrefix();
    }
    if (changes.autocompleteDataSource) {
      this.setAutocomplete();
      this.setLoader();
    }
  }

  ngAfterContentInit(): void {
    this.errorsUpdateText();
    if (this.cleanup) this.checkVisibilityCleanupIcon();
  }

  ngOnDestroy(): void {
    this.validationStateObserver.disconnect();
    this.messagePresentationObserver.disconnect();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChangeCallback = fn;
    // setTimeout(() => fn(this.input.value));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  writeValue(value: any): void {
    const cleanValue = this.cleanFunction(value);

    if (cleanValue !== value && this.onChangeCallback) {
      this.onChangeCallback(cleanValue);
    }

    this.input.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.input, 'disabled', isDisabled);
    isDisabled
      ? this.renderer.addClass(this.wrapperElement, 'input_disabled')
      : this.renderer.removeClass(this.wrapperElement, 'input_disabled');
  }

  protected setBodyMinWidth(value: string): void {
    this.bodyElement?.style?.setProperty('min-width', value);
  }

  protected replaceIconToImage(src: string, width?: string, height?: string): void {
    if (!src) {
      this.renderer.removeClass(this.iconElement, 'icon__image');
      this.renderer.removeStyle(this.iconElement, 'width');
      this.renderer.removeStyle(this.iconElement, 'height');
      this.renderer.removeStyle(this.iconElement, 'background-image');
      this.renderer.removeStyle(this.iconElement, 'background-repeat');
      this.renderer.addClass(this.iconElement, 'icon');
      this.renderer.addClass(this.iconElement, 'input__icon');
      this.renderer.addClass(this.iconElement, 'icon_' + this.icon);
    } else {
      this.iconElement.classList.forEach((cl) => {
        if (cl.match(/icon_/)) {
          this.renderer.removeClass(this.iconElement, cl);
        }
      });
      this.renderer.removeClass(this.iconElement, 'icon');
      this.renderer.removeClass(this.iconElement, 'input__icon');
      this.renderer.addClass(this.iconElement, 'icon__image');
      this.renderer.setStyle(this.iconElement, 'background-image', `url('${src}')`);
      this.renderer.setStyle(this.iconElement, 'background-repeat', 'no-repeat');
      if (width) {
        this.renderer.setStyle(this.iconElement, 'width', width);
      }
      if (height) {
        this.renderer.setStyle(this.iconElement, 'height', height);
      }
    }
  }

  private updateValidationState(invalid: boolean = false): void {
    this.invalid = invalid;
  }

  private updateDirtyState(dirty: boolean = false): void {
    this.dirty = dirty;
  }

  private watchFormSubmit(): void {
    if (this.parentForm) {
      this.parentForm?.ngSubmit
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this.errorsUpdateText();
        });
    }
  }

  private watchInputValueChanges(): void {
    this.input.addEventListener('input', () => {
      const cleanValue = this.cleanFunction(this.input.value);

      if (this.input.value !== cleanValue) {
        this.input.value = cleanValue;
      }

      if (this.onChangeCallback) {
        this.onChangeCallback(cleanValue);
      }

      if (this.cleanup) this.checkVisibilityCleanupIcon();

      if (!!this.autocompleteDataSource) {
        this.messageSource$.next(this.input.value);
      }
    });
  }

  private checkVisibilityCleanupIcon(): void {
    if (this.input.value.length > 0) {
      if (!this.wrapperElement.classList.contains('input__btnCleanup')
        && !this.input.classList.contains('input__input-cleanup')) {
        this.renderer.addClass(this.wrapperElement, 'input__btnCleanup');
        this.renderer.addClass(this.input, 'input__input-cleanup');
        this.setBtnCleanup();
      }
    } else if (this.wrapperElement.classList.contains('input__btnCleanup')
      && this.input.classList.contains('input__input-cleanup')) {
      this.renderer.removeClass(this.wrapperElement, 'input__btnCleanup');
      this.renderer.removeClass(this.input, 'input__input-cleanup');
    }
  }

  private watchClickCleanupInput(): void {
    this.iconCleanupElement.addEventListener('click', () => {

      this.input.value = '';
      this.cleanupClick.next();
      if (!!this.autocompleteDataSource) {
        this.messageSource$.next('');
      }

      if (this.onChangeCallback) {
        this.onChangeCallback('');
      }
      this.checkVisibilityCleanupIcon();
    });
  }

  private watchValidationChangesByClassName(): void {
    this.validationStateObserver = new MutationObserver(() => {

      this.updateValidationState(this.input.classList.contains('ng-invalid'));
      this.updateDirtyState(this.input.classList.contains('ng-dirty'));
      // this.errorsUpdateText(); для теста валидации, возможно придется вернуть
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

  private updateMsgTextStyles(): void {

    if ((this.dirty && this.invalid) || (this.invalid && this.parentForm?.submitted)) {
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
      this.renderer.removeClass(this.wrapperElement, 'input_error');
      this.renderer.removeClass(this.wrapperElement, 'input_warning');
      this.renderer.removeClass(this.wrapperElement, 'input_valid');
      this.renderer.addClass(this.wrapperElement, 'input_info');

      this.renderer.addClass(this.msgIconElement, 'icon_info');
      this.renderer.removeClass(this.msgIconElement, 'icon_valid');
      this.renderer.removeClass(this.msgIconElement, 'icon_warning');
    }
  }

  private updateMessagePresentation(): void {
    if ((this.errors && this.dirty) || (this.errors && this.parentForm?.submitted)) {
      this.renderer.appendChild(this.footerElement, this.msgWrapperElement);
    } else if ((this.errors && !this.invalid)) {
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
      this.iconElement.addEventListener('click', () => this.iconClick.emit());

      this.renderer.addClass(this.iconElement, 'icon_' + this.icon);
      this.renderer.appendChild(this.entranceElement, this.iconElement);
    } else {
      this.renderer.removeChild(this.entranceElement, this.iconElement);
      this.iconElement.removeEventListener('click', () => this.iconClick.emit());
    }

    if (this.onUpdateIconCallback) {
      this.onUpdateIconCallback();
    }
  }

  private setBtnCleanup(): void {

    this.renderer.addClass(this.iconCleanupElement, 'icon');
    this.renderer.addClass(this.iconCleanupElement, 'input__icon');

    this.renderer.addClass(this.iconCleanupElement, 'icon_circle-close');
  }

  private watchTouches(): void {
    this.input.addEventListener('blur', () => {
      if (this.onTouchedCallback) {
        this.onTouchedCallback();
      }
      this.errorsUpdateText();
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

  private setCleanupIcon(): void {
    this.iconCleanupElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.entranceElement, this.iconCleanupElement);
    this.watchClickCleanupInput();
  }

  private setLoader(): void {

    this.loaderWrap = this.renderer.createElement('div');
    this.loader = this.renderer.createElement('div');
    this.renderer.appendChild(this.loaderWrap, this.loader);

    this.renderer.appendChild(this.entranceElement, this.loaderWrap);
  }

  private setLoaderState(isLoading: boolean): void {
    if (isLoading) {
      this.renderer.addClass(this.loaderWrap, 'loader-wrap');
      this.renderer.addClass(this.loader, 'loader');
      this.renderer.setStyle(this.iconElement, 'display', 'none');
      this.renderer.setStyle(this.iconCleanupElement, 'display', 'none');

    } else {
      this.renderer.removeClass(this.loaderWrap, 'loader-wrap');
      this.renderer.removeClass(this.loader, 'loader');
      this.renderer.removeStyle(this.iconElement, 'display');
      this.renderer.removeStyle(this.iconCleanupElement, 'display');
    }
  }

  private errorsUpdateText(): void {
    if ((this.errors && this.dirty) || (this.errors && this.parentForm?.submitted)) {
      this.msgTextElement.innerText =
        (this.errors && this.dirty) ||
          (this.errors && this.parentForm?.submitted)
          ? ErrorMessageHelper.getMessage(this.errors)
          : '';
    } else if ((this.errors && !this.invalid)) {
      this.msgTextElement.innerText = (this.errors && !this.invalid) ? ErrorMessageHelper.getMessage(this.errors) : '';
    } else if (!!this.valid && this.valid !== 'true' && this.valid !== true) {
      this.msgTextElement.innerText = this.valid as string;
    } else {
      // this.msgTextElement.innerText = '123';
    }
    this.updateMessagePresentation();
    this.updateMsgTextStyles();
  }

  private captionUpdateText(): void {
    this.captionElement.innerText = `${this.caption}${this.required ? '' : ''}`;
    if (this.required) {
      this.renderer.addClass(this.wrapperElement, 'input_required');
    } else {
      this.renderer.removeClass(this.wrapperElement, 'input_required');
    }
  }

  private setPrefix(): void {
    this.prefixElement = this.renderer.createElement('div');
    const prefixTextContainer = this.renderer.createElement('span');
    const prefixTextContent = this.renderer.createText(this.prefix);
    this.renderer.insertBefore(this.entranceElement, this.prefixElement, this.input);
    this.renderer.appendChild(prefixTextContainer, prefixTextContent);
    this.renderer.appendChild(this.prefixElement, prefixTextContainer);
    this.renderer.addClass(this.prefixElement, 'input__prefix');

    if (this.prefix === '+380') {
      this.renderer.addClass(this.input, 'input__input_prefixed');

    } else {
      this.renderer.addClass(this.input, 'input__input_prefixed-international');
    }
  }

  private setAutocomplete(): void {
    const setInputValueFn = (val: string) => {
      this.input.value = val;
    };

    const autocompleteComponentRef = this.domService.createComponent(AutocompleteComponent,
      {
        dataSource: this.autocompleteDataSource,
        currentInputValue: this.currentInputValue,
        callbackFnSetInputValue: setInputValueFn
      });
    this.domService.attachComponent(autocompleteComponentRef, this.wrapperElement);

    (autocompleteComponentRef.instance as AutocompleteComponent).loading.subscribe(
      (val) => this.setLoaderState(val)
    );
  }
}

