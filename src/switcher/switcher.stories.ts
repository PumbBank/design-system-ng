import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SwitcherModule } from './switcher.module';
import { SwitcherOverview } from './examples/switcher-overview/switcher-overview.component';


const switcherStories = storiesOf('Switcher', module);
switcherStories.addDecorator(withKnobs);

switcherStories.add('Overview', () => ({
	moduleMetadata: {
	  declarations: [SwitcherOverview],
		imports: [SwitcherModule]
	},
	template: `
		<switcher-overview ></switcher-overview>
    `
}));
