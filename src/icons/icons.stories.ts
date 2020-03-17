import { storiesOf } from '@storybook/angular';
import { withKnobs } from "@storybook/addon-knobs";
import { IconPreviewModule } from './icon-preview.module';


const iconsStories = storiesOf('Icons', module);
iconsStories.addDecorator(withKnobs);

iconsStories.add('icons', () => ({
	moduleMetadata: {
		imports: [IconPreviewModule]
	},
	props: {

	},
	template: `
		<div style="display: grid; grid-auto-columns: auto; grid-gap: 10px">
      <mill-icon badge="empty" size="24" [name]="'clone'" color="grey"></mill-icon>
      <mill-icon badge="0" [name]="'clock'" color="rgba(0, 0, 0, 0.4)"></mill-icon>
      <mill-icon badge="text" [name]="'lightbulb'"></mill-icon>
      <mill-icon badge="123" [name]="'cart'"></mill-icon>
    </div>
    `
}));
