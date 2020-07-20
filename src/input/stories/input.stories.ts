import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { withKnobs } from '@storybook/addon-knobs';
import { InputModule } from '../input.module';
import { InputOverviewComponent } from '../examples/input-overview/input-overview.component';
import { IconsModule } from '../../icons';
import { BrowserModule } from '@angular/platform-browser';
import { InputNoticeComponent } from '../examples/input-notice/input-notice.component';

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

