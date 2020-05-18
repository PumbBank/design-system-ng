import { withKnobs } from '@storybook/addon-knobs';
import { SliderModule } from './slider.module';
import { SliderOverview } from './examples/slider-overview/slider-overview.component';
import { IconsModule } from '../2-icons/icons.module';

export default {
  title: 'Компоненти|Slider',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [SliderOverview],
    imports: [SliderModule, IconsModule]
  },
  template: `
	  <slider-overview></slider-overview>
    `
});
