import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { NoticeComponent } from '../common/notice/notice.component';

import { InputOverviewComponent } from './examples/input-overview/input-overview.component';
import { InputModule } from './input.module';
import { InputFormComponent } from './examples/input-form/input-form.component';
import { IconsModule } from '../icons/icons.module';
import { ButtonModule } from '../button/button.module';
import { SelectModule } from '../select/select.module';
import { MillHintModule } from '../hint/hint.module';

export default {
  title: 'Компоненти|Inputs',
  parameters: {
    options: { showPanel: true },
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
      NoticeComponent
    ]
  },
  props: {
    label: text('Label', 'Input label'),
    placeholder: text('Placeholder', 'Input placeholder'),
    hideLabel: boolean('Hide labels', false),
    hidePlaceholder: boolean('Hide placeholders', false)
  },
  template: `
    <input-overview [label]="label" [placeholder]="placeholder" [hideLabel]="hideLabel" [hidePlaceholder]="hidePlaceholder"></input-overview>
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
      MillHintModule
    ],
    declarations: [
      InputOverviewComponent,
      NoticeComponent,
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
