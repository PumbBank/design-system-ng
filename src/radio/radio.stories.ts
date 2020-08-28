import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { NoticeComponent } from '../common/notice/notice.component';
import { IconsModule } from '../icons/icons.module';

import { RadioOverviewComponent } from './examples/radio-page.component';
import { RadioModule } from './radio.module';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Компоненти|Radio button',
  parameters: {
    options: { showPanel: true },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      RadioOverviewComponent,
      NoticeComponent
    ],
    imports: [
      IconsModule,
      RadioModule,
      ReactiveFormsModule
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('List label name', 'Radio button'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `<mill-radio-overview [label]="label" [hideLabel]="hideLabel"></mill-radio-overview>`
});
