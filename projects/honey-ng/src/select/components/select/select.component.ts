import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { ErrorMessageHelper } from './../../../utils/error-message.helper';

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
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  private _writedTmp: string;

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

  @Input() selected: string;
  @Input() errors: ValidationErrors | null = null;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  active: boolean = false;

  constructor(private element: ElementRef, private changeDetector: ChangeDetectorRef) {
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

   setSelected(option: string): void {
    this._writedTmp = undefined;
    // this.selected = option;
    Promise.all(this.writeValueInterceptors.map(fn => fn(option))).then(() => {
      if (!this.options.has(option)) {
        this.selected = null;
        this.onChange(null);
        this.selectedChange.emit(option);
      } else {
        this.selected = option;
        this.onChange(this.selected);
        this.selectedChange.emit(option);
      }
    });
  }

  toggle(): void {
    this.errorsUpdateText();
    this.active = !this.active;
  }

  close(): void {
    this.active = false;
  }


  writeValue(value: any): void {
    this._writedTmp = value;

    Promise.all(this.writeValueInterceptors.map(fn => fn(value))).then(() => {
      if (!this.options.has(value)) {
        this.selected = null;
        this.onChange(null);
      } else {
        this.selected = value;
      }
    });
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
