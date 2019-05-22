import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { ErrorMessageHelper } from 'projects/honey-ng/src/utils/error-message.helper';

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
export class SelectComponent<T = any> implements ControlValueAccessor, AfterContentInit {
  private _writedTmp: T;

  get selectedCaption(): string {
    return this.options.get(this.selected);
  }
  private options: Map<any, string> = new Map<any, string>();
  private writeValueInterceptors: ((value: string) => Promise<void>)[] = [];

  get touched(): boolean {
    return this.element.nativeElement.classList.contains('ng-touched');
  }

  get isErrors(): boolean {
    return this.element.nativeElement.classList.contains('ng-invalid');
  }

  @Input() selected: T;
  @Input()
  errors: ValidationErrors | null = null;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();
  active: boolean = false;


  constructor(private element: ElementRef) { }

  ngAfterContentInit(): void {
    if (this._writedTmp) {
      this.setSelected(this._writedTmp);
    }
  }

  addWriteValueInterceptor( funct: (value: string) => Promise<void>): void {
    this.writeValueInterceptors.push(funct);
  }

  setSelected(option: T): void {
    this._writedTmp = undefined;
    this.selected = option;
    this.selectedChange.emit(option);
    this.onChange(this.selected);
  }

  open(): void {
    this.errorsUpdateText();
    this.active = true;
  }

  toggle(): void {
    this.errorsUpdateText();
    this.active = !this.active;
  }

  close(): void {
    this.active = false;
  }

  async writeValue(value: any): Promise<void> {
    await Promise.all(this.writeValueInterceptors.map(fn => fn(value)));

    if (!this.options.has(value)) {
      this._writedTmp = value;
      this.selected = null;
      this.onChange(null);
    } else {
      this.selected = value;
    }
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn) {
    fn(this.selected);
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
    // this.touched = true;
  }

}
