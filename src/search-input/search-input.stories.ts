import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { SearchInputModule } from './search-input.module';
import { SearchInputOverviewComponent } from './examples/search-input-overview/search-input-overview.component';
import { IconsModule } from '../icons/icons.module';

const data = [
  {name: 'Евгений', surname: 'Александрович'},
  {name: 'Игорь', surname: 'Андреевич'},
  {name: 'Андрей', surname: 'Андреевич'},
  {name: 'Дмитрий'},
  {name: 'Роман'},
  {name: 'Алексей'}
];

export default {
  title: 'Компоненти/Search input',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      SearchInputOverviewComponent
    ],
    imports: [
      SearchInputModule,
      IconsModule
    ],
  },
  props: {
    width: number('width', 200),
    array: object('names', data),
    status: boolean('disabled?', false),
    ng: text('text', ''),
  },
  template: `
      <search-input-overview [list]="array" [disabled]="status" [(ngModel)]="ng" [width]="width"></search-input-overview>
  	`
});
