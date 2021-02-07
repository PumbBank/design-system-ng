import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './sidebar.module';
import { SitebarOverviewComponent } from './examples/sidebar-page.component';

export default {
  title: 'Компоненти/Sidebars',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SidebarModule
    ],declarations: [
      SitebarOverviewComponent
    ],
  },
  props: {
    username: text('Username', `ФОП Константинопольский Константин Константинович`),
    additional: text('Additional info', 'Information text asd ad ad sad a da'),
    avatar: text('A vatar', 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg')
  },
  template: `<app-sidebar-overview></app-sidebar-overview>`,
});
