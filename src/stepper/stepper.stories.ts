import { withKnobs } from '@storybook/addon-knobs';
import { StepperOverviewComponent } from './examples/stepper-overview/stepper-overview.component';
import { StepperModule } from './stepper.module';
import { IconsModule } from '../icons';

export default {
  title: 'Компоненти/Steppers',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      StepperOverviewComponent
    ],
    imports: [
      StepperModule,
      IconsModule
    ]
  },
  template: `
		<stepper-overview></stepper-overview>
    `
});
