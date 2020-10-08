import { text, withKnobs } from '@storybook/addon-knobs';
import { ButtonComponent } from './components/button/button.component';
import { ButtonGuidelineComponent } from './examples/button-page/button-page.component';

export default {
  title: 'Гайдлайни/Кнопки',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      ButtonGuidelineComponent
    ]
  },
  props: {
    label: text('label', 'Button')
  },
  template: `
    <app-button-overview [label]="label"></app-button-overview>
  `
});

component.storyName = 'Огляд';
