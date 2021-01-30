import { withKnobs } from '@storybook/addon-knobs';
import { DataTableModule } from './data-table.module';
import { DataTableOverviewComponent } from './examples/data-table-overview/data-table-overview.component';
import { IconsModule } from '../icons';
import { BadgeModule } from '../badge';

export default {
  title: 'Компоненти/Data tables 2',
  parameters: {
    options: { showPanel: true },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [DataTableOverviewComponent],
    imports: [DataTableModule, IconsModule, BadgeModule],
  },
  props: {

  },
  template: `
    <data-table-overview></data-table-overview>
    `
});
