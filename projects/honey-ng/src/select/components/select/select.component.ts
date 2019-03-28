import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent<T = any> implements OnInit {

  @Input() selected: T;
  @Output() selectedChange: EventEmitter<T> = new EventEmitter<T>();

  selectedCaption: string;
  active: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  setSelected(option: T, caption: string): void {
    this.selected = option;
    this.selectedCaption = caption;
    this.selectedChange.emit(option);
  }

  open(): void {
    this.active = true;
  }

  close(): void {
    this.active = false;
  }
}
