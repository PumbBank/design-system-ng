import { storiesOf } from '@storybook/angular';
import { withKnobs } from "@storybook/addon-knobs";
import { IconPreviewModule } from './icon-preview.module';
import { IconsOverview } from './examples/icons-overview/icons-overview.component';


const iconsStories = storiesOf('Icons', module);
iconsStories.addDecorator(withKnobs);

iconsStories.add('Overview', () => ({
	moduleMetadata: {
	  declarations: [IconsOverview],
		imports: [IconPreviewModule]
	},
	template: `
		<icons-overview></icons-overview>
    `
}));
