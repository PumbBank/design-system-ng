import { withKnobs, text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './sidebar.module';

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
    ]
  },
  props: {
    username: text('Username', `ФОП Константинопольский Константин Константинович`),
    additional: text('Additional info', 'Information text asd ad ad sad a da'),
    avatar: text('Avatar', 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg')
  },
  template: `
      <mill-sidebar logo="/assets/images/logoplace.png" >
        <user-info
          [username]="username"
          [avatar]="avatar"
          [additional]="additional">
          <mill-user-info-action icon="settings"></mill-user-info-action>
          <mill-user-info-action badge="badge" icon="mail" ></mill-user-info-action>
          <mill-user-info-action icon="exit"></mill-user-info-action>
        </user-info>
        <mill-nav-title>Nav title</mill-nav-title>

        <ng-container [ngTemplateOutlet]="childNav"></ng-container>

        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar" active="true">Menu item</mill-nav-item>
        <mill-nav-item icon="mail">Menu item</mill-nav-item>
        <mill-nav-item icon="calendar">Menu item</mill-nav-item>

        <nav-content>
          <nav-content-head>
            <div class="s1" style="
              height: 100%;
              display: flex;
              align-items: center;
              padding-left: 40px;
              color: whitesmoke;">

              One of the primary....

            </div>
          </nav-content-head>

          <div style="padding: 24px;" class="p2">
            One of the primary quality-of-life features of Microsoft Windows 10 is the Action Center, which will, among other things, notify users when new email arrives, systems or drivers need updating, and malicious malware and other threats have been detected. Depending on how you set it up, the Action Center also provides easy access to several key and often accessed configuration settings. But not everyone is enamored with the "benefits" of the Windows 10 Action Center.
          </div>

        </nav-content>
      </mill-sidebar>
    <ng-template #childNav>
      <mill-nav-item icon="mail">
        Messengers
        <mill-nav-item *ngFor="let name of ['Telegram', 'Viber', 'iMessage']">{{ name }}</mill-nav-item>
      </mill-nav-item>
    </ng-template>`,
});
