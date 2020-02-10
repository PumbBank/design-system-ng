import { SidebarModule } from '../sidebar.module';
import { text } from '@storybook/addon-knobs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const userInformationStorie = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SidebarModule]
  },
  props: {
    username: text('Username', `ФОП Константинопольский Константин Константинович`),
    additional: text('Additional info', 'Information text asd ad ad sad a da'),
    avatar: text('A vatar', 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg')
  },
  template: `
    <div style="background: linear-gradient(106.15deg, #3C3C4E 0%, #00000D 100%); padding: 24px; width: 236px">
      <user-info
       [username]="username"
       [avatar]="avatar"
       [additional]="additional"> 
        <mill-user-info-action icon="settings"></mill-user-info-action>
        <mill-user-info-action icon="mail" [disabled]="true"></mill-user-info-action>
        <mill-user-info-action icon="exit"></mill-user-info-action>
       </user-info>
    </div>
  `
});