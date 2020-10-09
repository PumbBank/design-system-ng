import { withKnobs } from '@storybook/addon-knobs';
import { SliderModule } from './slider.module';
import { SliderOverviewComponent } from './examples/slider-overview/slider-overview.component';
import { IconsModule } from '../icons/icons.module';

export default {
  title: 'Компоненти/Sliders',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [SliderOverviewComponent],
    imports: [SliderModule, IconsModule]
  },
  template: `
	  <slider-overview></slider-overview>
    `
});
