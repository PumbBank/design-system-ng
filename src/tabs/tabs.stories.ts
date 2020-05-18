import { boolean, withKnobs } from '@storybook/addon-knobs';
import { TabsModule } from './tabs.module';
import { TabsOverview } from './examples/tabs-page/tabs-page.component';
import { IconsModule } from '../2-icons/icons.module';

export default {
  title: 'Компоненти|Tabs',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [TabsOverview],
    imports: [TabsModule, IconsModule]
  },
  props: {
    disable: boolean('disabled', false),
    fullWidth: boolean('full width', false),
  },
  template: `
		<tabs-overview [disable]="disable" [fullWidth]="fullWidth"></tabs-overview>
  `
});
