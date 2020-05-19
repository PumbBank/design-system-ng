import { withKnobs, text } from '@storybook/addon-knobs';
import { BadgeModule } from './badge.module';
import { BadgeOverviewComponent } from './examples/badge-overview/badge-overview.component';
import { IconsModule } from '../2-icons/icons.module';

export default {
  title: 'Компоненти|Badge',
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
