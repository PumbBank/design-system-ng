import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import { NoticeComponent } from '../common/notice/notice.component';

import { InputOverviewComponent } from './examples/input-overview/input-overview.component';
import { InputModule } from './input.module';
import { InputFormComponent } from './examples/input-form/input-form.component';
import { IconsModule } from '../icons/icons.module';
import { ButtonModule } from '../button/button.module';
import { SelectModule } from '../select/select.module';
import { MillHintModule } from '../hint/hint.module';
import { TextAreaModule } from '../text-area/text-area.module';

export default {
  title: 'Компоненти/Inputs',
  parameters: {
    options: { showPanel: true },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      CommonModule,
      InputModule,
      IconsModule,
      TextAreaModule,
      MillHintModule
    ],
    declarations: [
      InputOverviewComponent,
      NoticeComponent
    ]
  },
  props: {
    label: text('Label text', 'Label'),
    placeholder: text('Placeholder text', 'Placeholder'),
    views: radios('Views', {
      basic: 'basic',
      placeholder: 'placeholder',
      label: 'label ',
      simple: 'simple ',
    }, 'basic'),
    resizeTextarea: radios('Resize textarea', {
      none: 'none',
      both: 'both',
      horizontal: 'horizontal ',
      vertical: 'vertical ',
      inherit: 'inherit'
    }, 'none')
  },

  template: `
    <input-overview
      [label]="label"
      [placeholder]="placeholder"
      [views]="views"
      [resizeTextarea]="resizeTextarea">
    </input-overview>
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
      MillHintModule
    ],
    declarations: [
      NoticeComponent,
      InputFormComponent
    ]
  },
  template: `
    <input-form></input-form>
	`
});

componentForm.storyName = 'Form example';
