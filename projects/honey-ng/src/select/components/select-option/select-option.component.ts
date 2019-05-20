import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { IOption, IDataSource } from '../../models/data-source';

@Component({
  selector: 'hn-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent<T = any> implements OnInit, OnDestroy {
  @Input() value: T;
  @Input() caption: string;
  @ViewChild('option') optionElementRef: ElementRef;

  get selected(): T {
    return this.selectComponent.selected;
  }

  constructor(
    private selectComponent: SelectComponent<T>
  ) { }

  ngOnInit() {
    this.selectComponent.registrateOption(this.value, this.caption || this.optionElementRef.nativeElement.innerText);
  }

  ngOnDestroy() {
    this.selectComponent.destroyOption(this.value);
  }

  onClick() {
    this.selectComponent.setSelected(this.value);
    this.selectComponent.close();
  }
}
