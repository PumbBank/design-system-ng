import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerOverviewComponent } from './examples/mill-spinner-overview.component';

export default {
  title: 'Компоненти/Spinner',
  parameters: {
    options: {showPanel: true},
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      SpinnerComponent,
      SpinnerOverviewComponent
    ],
    imports: [
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('Content', 'Processing'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `<mill-spinner-overview [label]="label"></mill-spinner-overview>`
});

