import { text, withKnobs } from '@storybook/addon-knobs';
import { ButtonComponent } from './components/button/button.component';
import { ButtonGuideline } from './examples/button-page/button-page.component';

export default {
  title: 'Гайдлайни|Кнопки',
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      ButtonGuideline
    ]
  },
  props: {
    label: text('label', 'Button')
  },
  template: `
    <app-button-overview [label]="label"></app-button-overview>
  `
});

component.story = {
  name: 'Огляд'
};
