import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { IDataSource, IOption } from '../../public_api';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'hn-select-body-filter',
  templateUrl: './select-body-filter.component.html',
  styleUrls: ['./select-body-filter.component.scss']
})
export class SelectBodyFilterComponent<T = any> implements OnInit {

  @Input()
  placeholder: string = '';

  @Input()
  dataSource: IDataSource<any>;

  @Output()
  options: IOption<any>[];

  filled: boolean = false;

  constructor(private selectComponent: SelectComponent<T>) { }

  ngOnInit() {
    this.selectComponent.writeValueInterceptor.push(
      async (val: string): Promise<void> => {
        return new Promise (async (resolve: Function, reject: Function) => {

          const option: IOption<string> = await this.dataSource.get(val);
          if (option) {
            this.selectComponent.registrateOption(option.key, option.value);
          }
          resolve();
        });
      }
    );
    this.onValueChange('');
  }

  async onValueChange(value: string) {
    this.options = await this.dataSource.search(value);
    this.filled = !!value;
  }
}
