import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { ErrorMessageHelper } from './../../../utils/error-message.helper';
import { RequirebleComponent } from 'projects/honey-ng/src/utils/abstract-requireble';

@Component({
  selector: 'hn-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T = any> extends RequirebleComponent implements ControlValueAccessor, AfterContentInit {
  private _writedTmp: T;

  get selectedCaption(): string {
    return this.options.get(this.selected);
  }
  private options: Map<any, string> = new Map<any, string>();
  private writeValueInterceptors: ((value: string) => Promise<void>)[] = [];

  get touched(): boolean {
    return this.element.nativeElement.classList.contains('ng-touched');
  }

  get isInvalid(): boolean {
    return this.element.nativeElement.classList.contains('ng-invalid');
  }

  @Input() selected: T;
  @Input() errors: ValidationErrors | null = null;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();

  active: boolean = false;

  constructor(private element: ElementRef, private changeDetector: ChangeDetectorRef) {
    super();
    changeDetector.detectChanges();
  }

  ngAfterContentInit(): void {
    if (this._writedTmp) {
      this.setSelected(this._writedTmp);
    }
  }

  addWriteValueInterceptor(fn: (value: string) => Promise<void>): void {
    this.writeValueInterceptors.push(fn);
  }

  async setSelected(option: T): Promise<void> {
    this._writedTmp = undefined;
    // this.selected = option;
    await this.writeValue(option);
    this.selectedChange.emit(option);
    this.onChange(this.selected);
  }

  toggle(): void {
    this.errorsUpdateText();
    this.active = !this.active;
  }

  close(): void {
    this.active = false;
  }


  async writeValue(value: any): Promise<void> {
    this._writedTmp = value;

    await Promise.all(this.writeValueInterceptors.map(fn => fn(value)));

    if (!this.options.has(value)) {
      this.selected = null;
      this.onChange(null);
    } else {
      this.selected = value;
    }

    return Promise.resolve();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  registrateOption(value: any, caption: string) {
    this.options.set(value, caption);
  }

  destroyOption(value: any) {
    if (this.selected !== value) {
      this.options.delete(value);
    }
  }

  errorsText(): string {
    return this.errors ? ErrorMessageHelper.getMessage(this.errors) : '';
  }

  private errorsUpdateText() {
    if (!this.options.has(this.selected)) {
      this.selected = null;
    }
    this.onTouched();
  }

}
