import { withKnobs } from '@storybook/addon-knobs';
import { ButtonModule } from '../button/button.module';
import { IconsModule } from '../icons/icons.module';
import { DialogContentComponent } from './examples/dialog-content/dialog-content.component';
import { DialogOverviewComponent } from './examples/dialog-overview.component';
import { DialogModule } from './dialog.module';
import { DialogService } from './services/dialog-service';

export default {
  title: 'Компоненти/Dialog',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [DialogOverviewComponent, DialogContentComponent],
    imports: [DialogModule, IconsModule, ButtonModule],
    providers: [DialogService],
    entryComponents: [DialogContentComponent]
  },
  template: `
	  <dialog-overview></dialog-overview>
    `
});
