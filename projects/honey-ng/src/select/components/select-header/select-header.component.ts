import { Component, OnInit, Input } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'hn-select-header',
  templateUrl: './select-header.component.html',
  styleUrls: ['./select-header.component.scss']
})
export class SelectHeaderComponent<T = any> implements OnInit {
  @Input() caption: string = 'Select';

  get filled(): boolean {
    return typeof this.selected !== 'undefined' && this.selected !== null;
  }

  get selected(): T {
    return this.selectComponent.selected;
  }

  constructor(
    private selectComponent: SelectComponent<T>
  ) { }

  ngOnInit() {
  }

  showOptons() {

  }
}
