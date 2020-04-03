import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxOverviewComponent } from './examples/checkbox-page.component';

const checkboxStories = storiesOf('Checkbox', module);
checkboxStories.addDecorator(withKnobs);

checkboxStories.add('Overview', () => ({
  moduleMetadata: {
    declarations: [
      CheckboxComponent,
      CheckboxOverviewComponent
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('List label name', 'Checkbox'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `<app-checkbox-overview [label]="label" [hideLabel]="hideLabel"></app-checkbox-overview>`
}));
