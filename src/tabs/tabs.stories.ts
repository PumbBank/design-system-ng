import { storiesOf } from '@storybook/angular';
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { TabsModule } from './tabs.module';
import { TabsOverview } from './examples/tabs-page/tabs-page.component';


const tabsStories = storiesOf('Tabs', module);
tabsStories.addDecorator(withKnobs);

tabsStories.add('Tabs', () => ({
	moduleMetadata: {
	  declarations: [TabsOverview],
		imports: [TabsModule]
	},
	props: {
		disable: boolean('disabled', false),
		fullWidth: boolean('full width', false),
	},
	template: `
		<tabs-overview [disable]="disable" [fullWidth]="fullWidth"></tabs-overview>
  `
}));
