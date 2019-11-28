import { storiesOf } from '@storybook/angular';
import { withKnobs } from "@storybook/addon-knobs";
import { SearchInputModule } from './search-input.module';

const searchStories = storiesOf('Search Input', module);
searchStories.addDecorator(withKnobs);

searchStories.add('regular button', () => ({
	moduleMetadata: {
		imports: [SearchInputModule]
	},
	template: `
    <mill-search></mill-search>
  `
}));
