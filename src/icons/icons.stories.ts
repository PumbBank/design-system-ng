import { withKnobs } from '@storybook/addon-knobs';
import { IconPreviewModule } from './icon-preview.module';
import { IconsOverviewComponent } from './examples/icons-overview/icons-overview.component';
import { IconsModule } from './icons.module';

export default {
  title: 'Гайдлайни/Іконки',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [IconsOverviewComponent],
    imports: [IconPreviewModule, IconsModule]
  },
  template: `
		<icons-overview></icons-overview>
    `
});

component.storyName = 'Огляд';
