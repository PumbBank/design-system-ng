import { storiesOf } from '@storybook/angular';
import { boolean, object, text, withKnobs } from "@storybook/addon-knobs";
import { SearchInputModule } from './search-input.module';

const searchStories = storiesOf('Search Input', module);
searchStories.addDecorator(withKnobs);

const data = [
	{f: 'Евгений', s: 'Александрович'},
	{f: 'Игорь', s: 'Андреевич'},
	{f: 'Андрей', s: 'Андреевич'},
	{f: 'Дмитрий'},
	{f: 'Роман'},
	{f: 'Алексей'}
];

searchStories.add('search input', () => ({
	moduleMetadata: {
		imports: [SearchInputModule]
	},
	props: {
		array: object('names', data),
		status: boolean('disabled?', false),
		ng: text('text', ''),
	},
	template: `
		<mill-search [list]="array" [disabled]="status" [(ngModel)]="ng"></mill-search>
  	`
}));
