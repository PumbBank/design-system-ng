import { storiesOf } from '@storybook/angular';
import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { SearchInputModule } from './search-input.module';

const searchStories = storiesOf('Search Input', module);
searchStories.addDecorator(withKnobs);

const data = [
  {name: 'Евгений', surname: 'Александрович'},
  {name: 'Игорь', surname: 'Андреевич'},
  {name: 'Андрей', surname: 'Андреевич'},
  {name: 'Дмитрий'},
  {name: 'Роман'},
  {name: 'Алексей'}
];

searchStories.add('search input', () => ({
  moduleMetadata: {
    imports: [SearchInputModule],
  },
  props: {
    width: number('width', 200),
    array: object('names', data),
    status: boolean('disabled?', false),
    ng: text('text', ''),
  },
  template: `
      <search-input-overview-example [list]="array" [disabled]="status" [(ngModel)]="ng" [width]="width"></search-input-overview-example>
  	`
}));
