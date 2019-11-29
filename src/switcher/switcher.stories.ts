import { storiesOf } from '@storybook/angular';
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { SwitcherModule } from './switcher.module';


const switcherStories = storiesOf('Switcher', module);
switcherStories.addDecorator(withKnobs);

switcherStories.add('switcher', () => ({
	moduleMetadata: {
		imports: [SwitcherModule]
	},
	props: {
		value: boolean('on/off', false),
		status: boolean('disabled?', false)
	},
	template: `
		<mill-switcher [active]="value" [disabled]="status"></mill-switcher>
    `
}));
