import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
export class SelectComponent<T = any> implements ControlValueAccessor {
  private options: Map<any, string> = new Map<any, string>();

  @Input() selected: T;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();

  get selectedCaption(): string {
    return this.options.get(this.selected);
  }
  active: boolean = false;

  constructor() { }

  setSelected(option: T): void {
    this.selected = option;
    this.selectedChange.emit(option);
    this.onChange(this.selected);
  }

  open(): void {
    if (!this.options.has(this.selected)) {
      this.selected = null;
    }
    this.active = true;
    this.onTouched();
  }

  close(): void {
    this.active = false;
  }

  writeValue(value: any): void {
    if (!this.options.has(value)) {
      this.selected = null;
      this.onChange(null);
    } else {
     this.selected = value;
    }
  }

  onChange: any = () => {};
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
    this.options.delete(value);
  }
}
