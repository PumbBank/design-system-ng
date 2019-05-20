import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ValidationErrors } from '@angular/forms';

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
  private writeValueInterceptors: [];

  get selectedCaption(): string {
    return this.options.get(this.selected);
  }
  private options: Map<any, string> = new Map<any, string>();

  get touched(): boolean {
    return this.element.nativeElement.classList.contains('ng-touched');
  }

  get errors(): boolean {
    return this.element.nativeElement.classList.contains('ng-invalid');
  }

  @Input() selected: T;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();
  active: boolean = false;

  writeValueInterceptor: ((value: string) => Promise<void>)[] = [];

  constructor(private element: ElementRef) { }

  ngAfterContentInit(): void {
    if (this._writedTmp) {
      this.setSelected(this._writedTmp);
    }
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
    await Promise.all(this.writeValueInterceptor.map(fn => fn(value)));

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

  private errorsUpdateText() {
    if (!this.options.has(this.selected)) {
      this.selected = null;
    }
    this.onTouched();
    // this.touched = true;
  }
}
