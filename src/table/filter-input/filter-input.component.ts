import { Component, ElementRef, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'table-filter',
    '[class.table-filter_active]' : 'active'
  }
})
export class FilterInputComponent {

  public active = false;
  public inputValue = new FormControl();

  @Output() public value: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.active = false;
    }
  }

  constructor(private _elementRef: ElementRef) {
    this.inputValue.valueChanges.subscribe(value => this.value.emit(value));
  }

  public onFocus(): void {
    this.active = true;
  }

  public clearInput(): void {
    this.inputValue.setValue(null);
  }
}
