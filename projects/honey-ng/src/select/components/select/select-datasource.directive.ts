import { Directive, Input, OnInit, Output } from '@angular/core';
import { IDataSource, IOption } from 'honey-ng/honey-ng';
import { SelectComponent } from './select.component';

@Directive({
  selector: 'hn-select[hnDataSource]',
  exportAs: 'hnDataSource'
})
export class DataSourceDirective<T = any> implements OnInit {

  @Input()
  hnDataSource: IDataSource<any>;

  public options: IOption<T>[];

  constructor(private selectComponent: SelectComponent<T>) { }

  ngOnInit() {
    this.getOptions();

    this.selectComponent.addWriteValueInterceptor(
      async (val: string): Promise<void> => {
        const option: IOption<string> = await this.hnDataSource.get(val);
        if (option) {
          this.selectComponent.registrateOption(option.key, option.value);
        }
        return Promise.resolve();
      }
    );
  }

  private async getOptions(): Promise<void> {
    this.options = await this.hnDataSource.search('');
    return Promise.resolve();
  }
}
