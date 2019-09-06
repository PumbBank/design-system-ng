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
  @Input() placeholder: string = '';
  @Input() filter: boolean = false;
  @Input() headerTemplate: any;

  get active(): boolean {
    return this.selectComponent.active;
  }

  get filled(): boolean {
    return (typeof this.selected !== 'undefined' && this.selected !== null);
  }

  get selectedCaption(): string {
    return this.selectComponent.selectedCaption;
  }

  get selected(): T {
    return this.selectComponent.selected;
  }

  get useTemplate(): boolean {
    return !!this.selectComponent.selected && !!this.headerTemplate;
  }

  get errors(): boolean {
    return this.selectComponent.isInvalid;
  }

  get errorText(): string {
    return this.selectComponent.errorsText();
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
