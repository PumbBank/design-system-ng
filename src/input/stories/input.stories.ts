import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs } from '@storybook/addon-knobs';
import { InputModule } from '../input.module';
import { IconsModule } from '../../2-icons/icons.module';
import { InputOverview } from '../examples/input-overview/input-overview.component';

export default {
  title: 'Компоненти|Inputs',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      CommonModule,
      InputModule,
      IconsModule
    ],
    declarations: [
      InputOverview
    ]
  },
  template: `
    <input-overview></input-overview>
	`
});

