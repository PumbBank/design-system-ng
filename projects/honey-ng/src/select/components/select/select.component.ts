import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'hn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T = any> implements OnInit {

  @Input() selected: T;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit() {
  }

  setSelected(option: T): void {
    this.selected = option;
    this.selectedChange.emit(option);
  }
}
