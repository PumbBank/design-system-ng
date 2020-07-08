import { withKnobs } from '@storybook/addon-knobs';
import { SwitcherModule } from './switcher.module';
import { SwitcherOverviewComponent } from './examples/switcher-overview/switcher-overview.component';
import { IconsModule } from '../icons/icons.module';

export default {
  title: 'Компоненти|Switcher',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      SwitcherOverviewComponent
    ],
    imports: [
      SwitcherModule,
      IconsModule
    ]
  },
  template: `
		<switcher-overview ></switcher-overview>
    `
});
