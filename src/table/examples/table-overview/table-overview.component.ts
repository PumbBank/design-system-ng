import { Component, Input } from '@angular/core';
import { TableStyleEnum, TableTypeEnum } from '../../table';

@Component({
  selector: 'table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class TableOverview {
  @Input() public type: TableTypeEnum;
  @Input() public style: TableStyleEnum;
  @Input() public selectInput: 'checkbox' | 'radio';
  @Input() public fixedHeader: boolean;
  @Input() public darkHeader: boolean;

  @Input() set filter(value: boolean) {
    this.dataModel.forEach(m => m.filterable = value)
  }

  public data = [{
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 22,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 45,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 22,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 45,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 22,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 45,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 22,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 45,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 22,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }];
  public dataModel = [{
    fieldName: 'name',
    title: 'Name',
    filterable: true,
    sortable: true,
  }, {
    fieldName: 'age',
    title: 'Age',
    filterable: false,
    sortable: true,
  }, {
    fieldName: 'job',
    title: 'Profession',
    filterable: true,
    sortable: true,
  }];
}
