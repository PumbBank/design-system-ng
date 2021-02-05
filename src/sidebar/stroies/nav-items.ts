import { SidebarModule } from '../sidebar.module';
import { text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const navItemsStorie = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SidebarModule]
  },
  props: {
    username: text('Username', `ФОП Константинопольский Константин Константинович`),
    additional: text('Additional info', 'Information text asd ad ad sad a da'),
    avatar: text('Avatar', 'https://developer.mozilla.org/static/img/favicon144.png')
  },
  template: `
    <div style="background: linear-gradient(106.15deg, #3C3C4E 0%, #00000D 100%); padding: 24px; width: 236px">
      <mill-nav-title>Nav title</mill-nav-title>
      <mill-nav-item icon="mail"></mill-nav-item>
      <mill-nav-item icon="calendar"></mill-nav-item>
      <mill-nav-item icon="folder" active="true"></mill-nav-item>
    </div>
  `
});
