import { text } from '@storybook/addon-knobs';
import { SelectModule } from '../select.module';
import { SelectOverviewComponent } from '../examples/select-page.component';

export const DEFAULT_SELECT = () => ({
  moduleMetadata: {
    imports: [SelectModule],
    declarations: [
      SelectOverviewComponent
    ]
  },
  props: {
    caption: text('caption', 'Overview'),
    label: text('select', 'Select')
  },
  template: `
    <app-select-overview [label]="label"></app-select-overview>
    `
});
