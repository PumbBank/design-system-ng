import { withKnobs } from '@storybook/addon-knobs';
import { BadgeModule } from './badge.module';
import { BadgeOverviewComponent } from './examples/badge-overview/badge-overview.component';
import { IconsModule } from '../icons/icons.module';

export default {
  title: 'Компоненти/Badges',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      BadgeOverviewComponent
    ],
    imports: [
      BadgeModule,
      IconsModule
    ]
  },
  template: `
      <badge-overview></badge-overview>
  `
});
