import { storiesOf } from '@storybook/angular';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/angular';

import { LoaderModule } from './loader.module';

const loaderStories = storiesOf('Loader', module);
loaderStories.addDecorator(withKnobs);

loaderStories.add('Glue Loader', () => ({
  moduleMetadata: {
    imports: [
      LoaderModule
    ]
  },
  props: {
    isActive: boolean('Active', true),
    type: select('Type of the loader', ['circular', 'linear'], 'circular'),
    size: select('Size of the loader', ['normal', 'small'], 'normal')
  },
  template: `
		<loader [isActive]="isActive" [type]="type" [size]="size"></loader>
	`
}));
