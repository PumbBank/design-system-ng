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
    label: text('label', 'Button'),
    icon: text('icon', 'home')
  },
  template: `
    <mill-button size="large">{{ label }}</mill-button>
    <mill-button size="large" view="ghost">{{ label }}</mill-button>
    <mill-button size="large" view="hidden">{{ label }}</mill-button>

    <mill-button size="large" [icon]="icon"></mill-button>
    <mill-button size="large" view="ghost" [icon]="icon"></mill-button>
    <mill-button size="large" view="hidden" [icon]="icon"></mill-button>
    <br><br>
    <mill-button>{{ label }}</mill-button>
    <mill-button view="ghost">{{ label }}</mill-button>
    <mill-button view="hidden">{{ label }}</mill-button>
    
    <mill-button [icon]="icon"></mill-button>
    <mill-button view="ghost" [icon]="icon"></mill-button>
    <mill-button view="hidden" [icon]="icon"></mill-button>
    <br><br>
    <mill-button size="small">{{ label }}</mill-button>
    <mill-button size="small" view="ghost">{{ label }}</mill-button>
    <mill-button size="small" view="hidden">{{ label }}</mill-button>
  `
}));
