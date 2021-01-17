import { text } from '@storybook/addon-knobs';
import { DialogModule } from '../dialog.module';
import { DialogOverviewComponent } from '../examples/dialog-page.component';
import { MillHintModule } from '../../hint/hint.module';

export const DEFAULT_SELECT = () => ({
  moduleMetadata: {
    declarations: [
      DialogOverviewComponent
    ],
    imports: [DialogModule, MillHintModule]
  },
  props: {
    caption: text('caption', 'Overview'),
    label: text('select', 'Select')
  },
  template: `
    <app-select-overview [label]="label"></app-select-overview>
    `
});
