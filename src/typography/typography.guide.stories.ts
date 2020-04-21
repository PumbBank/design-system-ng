import { withKnobs } from '@storybook/addon-knobs';
import { IconsModule } from '../icons/icons.module';
import { TypographyGuideline } from './examples/typography-page.component';

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
      TypographyGuideline,
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
