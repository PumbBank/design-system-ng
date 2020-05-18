import { withKnobs, text } from '@storybook/addon-knobs';
import { SelectModule } from './select.module';
import { SelectOverviewComponent } from './examples/select-page.component';
import { MillHintModule } from 'src/mill-hint/mill-hint.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from 'src/icons/icons.module';

export default {
  title: 'Компоненти|Select',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      SelectOverviewComponent
    ],
    imports: [SelectModule, MillHintModule, ReactiveFormsModule, IconsModule]
  },
  props: {
    caption: text('caption', 'Overview'),
    label: text('select', 'Select')
  },
  template: `
    <app-select-overview [label]="label"></app-select-overview>
    `
});
