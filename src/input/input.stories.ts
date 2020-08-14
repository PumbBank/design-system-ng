import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs } from '@storybook/addon-knobs';

import { InputOverviewComponent } from './examples/input-overview/input-overview.component';
import { IconsModule } from '../icons/icons.module';
import { InputNoticeComponent } from './examples/input-notice/input-notice.component';
import { InputModule } from './input.module';
import { InputFormComponent } from './examples/input-form/input-form.component';
import { ButtonModule } from '../button/button.module';
import { SelectModule } from '../select/select.module';
import { MillHintModule } from '../hint/hint.module';
import { FormUtilsModule } from '../form-utils/form-utils.module';

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
      InputOverviewComponent,
      InputNoticeComponent
    ]
  },
  template: `
    <input-overview></input-overview>
	`
});

export const componentForm = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      CommonModule,
      InputModule,
      IconsModule,
      ButtonModule,
      SelectModule,
      FormsModule,
      ReactiveFormsModule,
      MillHintModule,
      FormUtilsModule
    ],
    declarations: [
      InputOverviewComponent,
      InputNoticeComponent,
      InputFormComponent
    ]
  },
  template: `
    <input-form></input-form>
	`
});

componentForm.story = {
  name: 'Form example'
};
