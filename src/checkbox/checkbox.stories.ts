import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { NoticeComponent } from '../common/notice/notice.component';
import { IconsModule } from '../icons/icons.module';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxOverviewComponent } from './examples/checkbox-overview/checkbox-page.component';

export default {
  title: 'Компоненти|Checkbox',
  parameters: {
    options: { showPanel: true },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      CheckboxComponent,
      CheckboxOverviewComponent,
      NoticeComponent
    ],
    imports: [
      IconsModule
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('List label name', 'Checkbox item'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `<mill-checkbox-overview [label]="label" [hideLabel]="hideLabel"></mill-checkbox-overview>`
});

