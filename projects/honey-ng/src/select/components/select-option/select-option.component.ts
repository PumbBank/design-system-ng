import { Component, OnInit, Input } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'hn-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent<T = any> implements OnInit {
  @Input() value: T;
  @Input() caption: string;

  get selected(): T {
    return this.selectComponent.selected;
  }

  constructor(
    private selectComponent: SelectComponent<T>
  ) { }

  ngOnInit() { }

  onClick() {
    this.selectComponent.setSelected(this.value, this.caption);
    this.selectComponent.close();
  }
}
