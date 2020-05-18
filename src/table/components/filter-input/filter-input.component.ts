import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'table-filter',
  }
})
export class FilterInputComponent {

  public active: boolean;
  public filled: boolean;
  public inputValue = new FormControl();

  @Output() public value: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.active = false;
    }
  }

  @HostBinding('class.table-filter_active') get activeClass() {
    return this.active
  }

  @HostBinding('class.table-filter_filled') get activeFilled() {
    return this.filled
  }

  constructor(private _elementRef: ElementRef, private _cd: ChangeDetectorRef) {
    this.inputValue.valueChanges.subscribe(value => {
      this.value.emit(value);
      this.filled = !!value;
    });
  }

  public onFocus(): void {
    this.active = true;
    this._cd.detectChanges()
  }

  public clearInput(): void {
    this.inputValue.setValue(null);
  }
}
