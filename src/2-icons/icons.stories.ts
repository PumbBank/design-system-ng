import { withKnobs } from '@storybook/addon-knobs';
import { IconPreviewModule } from './icon-preview.module';
import { IconsOverview } from './examples/icons-overview/icons-overview.component';
import { IconsModule } from './icons.module';

export default {
  title: 'Гайдлайни|Іконки',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [IconsOverview],
    imports: [IconPreviewModule, IconsModule]
  },
  template: `
		<icons-overview></icons-overview>
    `
});

component.story = {
  name: 'Огляд'
};
