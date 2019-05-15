import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { IDataSource, IOption } from '../../public_api';

@Component({
  selector: 'hn-select-body-filter',
  templateUrl: './select-body-filter.component.html',
  styleUrls: ['./select-body-filter.component.scss']
})
export class SelectBodyFilterComponent implements OnInit {

  @Input()
  placeholder: string = '';

  @Input()
  dataSource: IDataSource<any>;

  @Output()
  options: IOption<any>[];

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.onValueChange('');
  }

  onValueChange(value: string) {
    this.options = this.dataSource.search(value);

  }
}
