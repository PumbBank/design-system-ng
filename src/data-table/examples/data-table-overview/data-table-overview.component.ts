import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableSource } from '../../data-table-source';
import { MillSortDirective } from '../../mill-sort/mill-sort.directive';
import { MillPaginatorComponent } from '../../mill-paginator/mill-paginator.component';

const DATA: any[] = [
  {
    name: 'Jon',
    age: 28,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 42,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 36,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 45,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 21,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 12,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 38,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 49,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 18,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 16,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 48,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 77,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 11,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 29,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 9,
    job: 'Doctor',
  }, {
    name: 'Annie',
    age: 5,
    job: 'Doctor',
  }, {
    name: 'Fred',
    age: 99,
    job: 'Captain',
  }, {
    name: 'Jon',
    age: 86,
    job: 'Lawyer',
  }, {
    name: 'Andrew',
    age: 35,
    job: 'Programmer',
  }, {
    name: 'Annie',
    age: 32,
    job: 'Doctor',
  }
];

@Component({
  selector: 'data-table-overview',
  templateUrl: './data-table-overview.component.html',
  styleUrls: ['./data-table-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class DataTableOverviewComponent implements OnInit, AfterViewInit{
  public columns: string[] = ['name', 'age', 'job'];

  public dataSource: DataTableSource<any>;

  @ViewChild(MillSortDirective) sort: MillSortDirective;
  @ViewChild(MillPaginatorComponent) paginator: MillPaginatorComponent;

  constructor() {
    this.dataSource = new DataTableSource<any>(DATA);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
