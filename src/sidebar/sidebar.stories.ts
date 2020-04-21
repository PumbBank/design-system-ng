import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './sidebar.module';

export default {
  title: 'Компоненти|SideBar',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const story = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SidebarModule
    ]
  },
  props: {
    username: text('Username', `ФОП Константинопольский Константин Константинович`),
    additional: text('Additional info', 'Information text asd ad ad sad a da'),
    avatar: text('A vatar', 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg')
  },
  template: `
    <div style="background: linear-gradient(106.15deg, #3C3C4E 0%, #00000D 100%); padding: 0; height: 600px; width: 100%">
      <mill-sidebar logo="/cid.svg" style="height: 100%">
        <user-info
          [username]="username"
          [avatar]="avatar"
          [additional]="additional">
          <mill-user-info-action icon="settings"></mill-user-info-action>
          <mill-user-info-action icon="mail" [disabled]="true"></mill-user-info-action>
          <mill-user-info-action icon="exit"></mill-user-info-action>
          </user-info>
        <mill-nav-title>Nav title</mill-nav-title>

        <mill-nav-item icon="mail">
          Messagenrs
          <mill-nav-item >Telegram</mill-nav-item>
          <mill-nav-item>Viber</mill-nav-item>
          <mill-nav-item>iMessage</mill-nav-item>
        </mill-nav-item>

        <mill-nav-item icon="calendar">Menu item</mill-nav-item>
        <mill-nav-item icon="folder" active="true">Menu item</mill-nav-item>

        <mill-nav-title>Nav title</mill-nav-title>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>

        <mill-nav-title>Nav title</mill-nav-title>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>

        <mill-nav-title>Nav title</mill-nav-title>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>
      </mill-sidebar>
  </div>`
});
