import { boolean, withKnobs } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from './tabs.module';
import { TabPageComponent } from './examples/tabs-page/tabs-page.component';
import { IconsModule } from '../icons';

export default {
  title: 'Компоненти/Tabs',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [TabPageComponent],
    imports: [TabsModule, IconsModule, BrowserAnimationsModule]
  },
  props: {
    disable: boolean('disabled', false),
    fullWidth: boolean('full width', false),
  },
  template: `
		<tabs-overview [disable]="disable" [fullWidth]="fullWidth"></tabs-overview>
  `
});
