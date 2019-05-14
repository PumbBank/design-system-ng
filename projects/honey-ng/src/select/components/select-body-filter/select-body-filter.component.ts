import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hn-select-body-filter',
  templateUrl: './select-body-filter.component.html',
  styleUrls: ['./select-body-filter.component.scss']
})
export class SelectBodyFilterComponent implements OnInit {

  @Input()
  placeholder: string = '';

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
