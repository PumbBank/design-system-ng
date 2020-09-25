import { withKnobs } from '@storybook/addon-knobs';
import { IconsModule } from '../icons';
import { ColorsPaletteGuidelineComponent } from './examples/colors-palette-page.component';

export default {
  title: 'Гайдлайни/Кольори',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      ColorsPaletteGuidelineComponent,
    ],
    imports: [IconsModule]
  },
  template: `
    <mill-colors-palette-overview></mill-colors-palette-overview>
  `
});

component.story = {
  name: 'Огляд'
};
