import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';
import { IconsModule } from '../icons/icons.module';

export default {
  title: 'Компоненти|Radio',
  parameters: {
    options: { showPanel: true },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      RadioComponent,
      RadioOverviewComponent
    ],
    imports: [
      IconsModule
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
