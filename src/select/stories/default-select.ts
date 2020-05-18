import { text } from '@storybook/addon-knobs';
import { SelectModule } from '../select.module';
import { SelectOverviewComponent } from '../examples/select-page.component';
import { MillHintModule } from 'src/mill-hint/mill-hint.module';

export const DEFAULT_SELECT = () => ({
  moduleMetadata: {
    declarations: [
      SelectOverviewComponent
    ],
    imports: [SelectModule, MillHintModule]
  },
  props: {
    caption: text('caption', 'Overview'),
    label: text('select', 'Select')
  },
  template: `
    <app-select-overview [label]="label"></app-select-overview>
    `
});
