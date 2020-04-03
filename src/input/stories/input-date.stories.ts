import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputOverviewComponent } from '../examples/input-overview/input-overview.component';

export const inputDateStory = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      CommonModule,
      InputModule
    ],
    declarations: [
      InputOverviewComponent
    ]
  },
  props: {},
  template: `
  <app-input-overview-example></app-input-overview-example>
	`
});
