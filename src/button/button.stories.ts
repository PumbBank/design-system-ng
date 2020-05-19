import { text, withKnobs } from "@storybook/addon-knobs";
import { ButtonComponent } from './components/button/button.component';
import { IconsModule } from '../2-icons/icons.module';
import { ButtonOverviewComponent } from './examples/button-overview/button-overview.component';

export default {
  title: 'Компоненти|Buttons',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      ButtonOverviewComponent
    ],
    imports: [
      IconsModule
    ]
  },
  props: {
    label: text('label', 'Button text')
  },
  template: `
    <button-overview [label]="label"></button-overview>
  `
});
