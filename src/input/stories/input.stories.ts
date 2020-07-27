import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs } from '@storybook/addon-knobs';
import { InputModule } from '../input.module';
import { InputOverviewComponent } from '../examples/input-overview/input-overview.component';
import { IconsModule } from '../../icons';

export default {
  title: 'Компоненти|Text inputs',
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
      InputOverviewComponent
    ]
  },
  template: `
    <input-overview></input-overview>
	`
});

