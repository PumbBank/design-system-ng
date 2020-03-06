import { storiesOf } from '@storybook/angular';
import { withKnobs, text, color } from "@storybook/addon-knobs";
import { ButtonComponent } from './components/button/button.component';
import { ButtonOverview } from './examples/button-page/button-page.component';

const buttonStories = storiesOf('Buttons', module);
buttonStories.addDecorator(withKnobs);

buttonStories.add('Overview', () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      ButtonOverview
    ]
  },
  props: {
    label: text('label', 'Button')
  },
  template: `
    <app-button-overview [label]="label"></app-button-overview>
  `
}));
