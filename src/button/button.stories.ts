import { storiesOf } from '@storybook/angular';
import { withKnobs, text, color } from "@storybook/addon-knobs";
import { ButtonComponent } from './components/button/button.component';

const buttonStories = storiesOf('Buttons', module);
buttonStories.addDecorator(withKnobs);

buttonStories.add('regular button', () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent
    ]
  },
  props: {
    label: text('label', 'Regular Button'), // The first param of the knob function has to be exactly the same as the component input.
    backColor: color('background color', '#cc0812'),
  },
  template: `
    <mill-button [bgColor]="backColor">{{label}}</mill-button>
  `
}));
