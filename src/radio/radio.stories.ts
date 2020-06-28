import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';
import { IconsModule } from '../2-icons/icons.module';
import { RadioModule } from './radio.module';

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
      RadioOverviewComponent
    ],
    imports: [
      IconsModule,
      RadioModule
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
