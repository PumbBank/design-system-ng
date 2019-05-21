import { async } from '@angular/core/testing';
import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { IDataSource, IOption } from '../../public_api';
import { SelectComponent } from '../select/select.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  filterForm = new FormGroup({
    filterField: new FormControl('')
  });

  constructor(private selectComponent: SelectComponent<T>) { }

  ngOnInit() {

    this.filterForm.valueChanges.pipe().subscribe(
      async (val) => {

        this.options = await this.dataSource.search(val.filterField);

      }
    );

    this.selectComponent.eventHookPush(
      async (val: string): Promise<void> => {
        const option: IOption<string> = await this.dataSource.get(val);
        if (option) {
          this.selectComponent.registrateOption(option.key, option.value);
        }
        return Promise.resolve();
      }
    );
  }
}
