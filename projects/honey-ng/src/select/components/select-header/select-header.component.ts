import { ValidationErrors } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'hn-select-header',
  templateUrl: './select-header.component.html',
  styleUrls: ['./select-header.component.scss']
})
export class SelectHeaderComponent<T = any> implements OnInit {
  @Input() caption: string = 'Select';

  currentSelectedCaption: string;

  get filled(): boolean {
    if (this.currentSelectedCaption) {
      return true;
    }
    return typeof this.selected !== 'undefined' && this.selected !== null;
  }

  get selectedCaption(): string {
    if (this.selectComponent.selectedCaption) {
      this.currentSelectedCaption = this.selectComponent.selectedCaption;
    }
    return this.selectComponent.selectedCaption || this.currentSelectedCaption;
  }

  get selected(): T {
    return this.selectComponent.selected;
  }

  get errors(): boolean {
    return this.selectComponent.errors;
  }

  get touched(): boolean {
    return this.selectComponent.touched;
  }

  constructor(
    private selectComponent: SelectComponent<T>
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.selectComponent.toggle();
  }
}
