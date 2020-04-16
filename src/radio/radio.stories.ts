import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, button } from '@storybook/addon-knobs/angular';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';

const checkboxStories = storiesOf('Radio', module);
checkboxStories.addDecorator(withKnobs);

const label = 'Reset radio buttons';

function doSomething(foobar: string) {
  return false;
}

const handler = () => doSomething('foobar');

button(label, handler);

checkboxStories.add('Overview', () => ({
  moduleMetadata: {
    declarations: [
      RadioComponent,
      RadioOverviewComponent
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('List label name', 'Radio button'),
    hideLabel: boolean('Hide labels', false),
    button: button,
  },
  template: `<app-radio-overview [label]="label"></app-radio-overview>`
}));
