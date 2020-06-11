import { withKnobs } from '@storybook/addon-knobs';
import { IconsModule } from '../2-icons';
import { TypographyPageComponent } from './examples/typography-page.component';

export default {
  title: 'Гайдлайни|Типографiка',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      TypographyPageComponent,
    ],
    imports: [IconsModule]
  },
  template: `
    <mill-typography-overview></mill-typography-overview>
  `
});

component.story = {
  name: 'Огляд'
};
