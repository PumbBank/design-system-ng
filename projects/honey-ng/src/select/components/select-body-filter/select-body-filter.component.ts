import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IDataSource, IOption } from '../../public_api';
import { SelectComponent } from '../select/select.component';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hn-select-body-filter',
  templateUrl: './select-body-filter.component.html',
  styleUrls: ['./select-body-filter.component.scss']
})
export class SelectBodyFilterComponent<T = any> implements OnInit, OnDestroy {

  @Input()
  placeholder: string = 'Find...';

  @Input()
  dataSource: IDataSource<any>;

  options: IOption<T>[];

  filterControl = new FormControl('');
  subscription: Subscription;
  constructor(private selectComponent: SelectComponent) { }

  ngOnInit() {

    this.subscription = this.filterControl.valueChanges.pipe().subscribe(
      async (val) => {
        this.options = await this.dataSource.search(val);
      }
    );

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
