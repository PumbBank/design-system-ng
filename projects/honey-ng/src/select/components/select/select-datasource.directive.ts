import { Directive, Input, OnInit, Output } from "@angular/core";
import { IDataSource, IOption } from 'honey-ng/honey-ng';
import { SelectComponent } from './../select/select.component';

@Directive({
  selector: 'hn-select[dataSource]',
  exportAs: 'dataSource'
})
export class DataSourceDirecvite<T = any> implements OnInit {

  @Input()
  dataSource: IDataSource<any>;

  public options: IOption<T>[];

  constructor(private selectComponent: SelectComponent<T>) { }

  ngOnInit() {
    this.getOptions();

    this.selectComponent.addWriteValueInterceptor(
      async (val: string): Promise<void> => {
        const option: IOption<string> = await this.dataSource.get(val);
        if (option) {
          this.selectComponent.registrateOption(option.key, option.value);
        }
        return Promise.resolve();
      }
    );
  }

  private async getOptions(): Promise<void> {
    this.options = await this.dataSource.search('');
    return Promise.resolve();
  }
}
