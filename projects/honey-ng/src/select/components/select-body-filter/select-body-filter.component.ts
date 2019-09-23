import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IDataSource, IOption } from '../../public_api';
import { SelectComponent } from '../select/select.component';
import { FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hn-select-body-filter',
  templateUrl: './select-body-filter.component.html',
  styleUrls: ['./select-body-filter.component.scss']
})
export class SelectBodyFilterComponent<T = any> implements OnInit {
  private unsubscriber: Subject<void> = new Subject<void>();

  @Input()
  placeholder: string = 'Find...';

  @Input()
  dataSource: IDataSource<any>;

  options: IOption<T>[];

  filterControl = new FormControl('');

  @ViewChild('input') inputElement: ElementRef;

  constructor(
    private selectComponent: SelectComponent<T>
  ) { }

  ngOnInit() {
    this.selectComponent.addToogleInterceptor((nextActive: boolean) => {
      this.updateOptions();
      return Promise.resolve();
    });

    this.selectComponent.active$
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((active) => {
        if (active) {
          setTimeout(() => {
            this.inputElement.nativeElement.focus();
          });
        }
      });

    this.filterControl.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
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

    this.baseInit();
  }

  async baseInit(): Promise<void> {
    this.options = await this.dataSource.search('');
  }

  updateOptions(): void {
    this.dataSource.search(this.filterControl.value)
      .then((options) => this.options = options);
  }
}
