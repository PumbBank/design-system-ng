import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs, object, boolean, select, radios } from "@storybook/addon-knobs";
import { TableModule } from './table.module';
import { action } from '@storybook/addon-actions';
import { TableOverview } from './examples/table-overview/table-overview.component';

const tableStories = storiesOf('Table', module);
tableStories.addDecorator(withKnobs);

const data = [{
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
}];

const dataBig = [{
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

const dataModel = [{
  fieldName: 'name',
  title: 'Name',
}, {
  fieldName: 'age',
  title: 'Age',
}, {
  fieldName: 'job',
  title: 'Profession',
}];

const dataModelWithSort = [{
  fieldName: 'name',
  title: 'Name',
  sortable: true,
}, {
  fieldName: 'age',
  title: 'Age',
  sortable: true,
}, {
  fieldName: 'job',
  title: 'Profession',
  sortable: true,
}];

const dataModelWithFilter = [{
  fieldName: 'name',
  title: 'Name',
  filterable: true,
}, {
  fieldName: 'age',
  title: 'Age',
  filterable: false,
}, {
  fieldName: 'job',
  title: 'Profession',
  filterable: true,
}];

const dataModelWithSortAndFilter = [{
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

tableStories.add('Overview', () => ({
  moduleMetadata: {
    declarations: [TableOverview],
    imports: [TableModule],
  },
  props: {
    data: object('data', data),
    dataBig: object('dataBig', dataBig),
    dataModel: object('model of data', dataModel),
    dataModelWithSort: object('model of data with sort', dataModelWithSort),
    dataModelWithFilter: object('model of data with filter', dataModelWithFilter),
    dataModelWithSortAndFilter: object('model of data with sort and filter', dataModelWithSortAndFilter),
    selectedRows: action('selected rows'),
    paginator: boolean('paginator', false)
  },
  template: `
      <table-overview [data]="data" [dataBig]="dataBig" [dataModel]="dataModel" [dataModelWithSort]="dataModelWithSort" [dataModelWithFilter]="dataModelWithFilter" [dataModelWithSortAndFilter]="dataModelWithSortAndFilter"></table-overview>
    `
}));

// tableStories.add('simple', () => ({
// 	moduleMetadata: {
// 		imports: [TableModule],
// 	},
// 	props: {
// 		data: object('data', dataBig),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//     paginator: boolean('paginator', false)
// 	},
// 	template: `
//       <mill-table fixedHeader="true" [data]="data" [dataModel]="dataModel" (selectedRows)="selectedRows($event)" [paginator]="paginator"></mill-table>
//     `
// }));
//
// tableStories.add('complex', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     type: radios('types', {normal: 'normal', zebra: 'zebra'}, 'normal'),
//     style: radios('styles', {normal: 'normal', small: 'small', large: 'large', round: 'round'}, 'normal'),
//     selectInput: radios('select input', {checkbox: 'checkbox', radio: 'radio', none: null}, 'checkbox'),
//     data: object('data', dataBig),
//     dataModel: object('model of data', dataModelWithSortAndFilter),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table fixedHeader="true" [data]="data" [dataModel]="dataModel" [selectInput]="selectInput" [paginator]="true" [paginatorShowCount]="[4, 8, 12, 16, 20]" [tableStyle]="style" [tableType]="type" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('sortable', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModelWithSort),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('filterable', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModelWithFilter),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('with paginator', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', dataBig),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [paginator]="true" [paginatorShowCount]="[5, 10, 15]" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('with checkbox', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [selectInput]="'checkbox'" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('with radio', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [selectInput]="'radio'" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('large style', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [tableStyle]="'large'" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('zebra type', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModel),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [tableType]="'zebra'" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
//
// tableStories.add('small style with zebra type', () => ({
//   moduleMetadata: {
//     imports: [TableModule],
//   },
//   props: {
//     data: object('data', data),
//     dataModel: object('model of data', dataModelWithSort),
//     selectedRows: action('selected rows'),
//   },
//   template: `
//       <mill-table [data]="data" [dataModel]="dataModel" [tableStyle]="'small'" [tableType]="'zebra'" (selectedRows)="selectedRows($event)"></mill-table>
//     `
// }));
