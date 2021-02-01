import { withKnobs } from '@storybook/addon-knobs';
import { ButtonModule } from '../button/button.module';
import { IconsModule } from '../icons/icons.module';
import { SnackBarOverviewComponent } from './examples/snackbar-overview/snackbar-overview.component';
import { SnackBarService } from './services/snackbar.service';
import { SnackbarModule } from './snackbar.module';

export default {
  title: 'Компоненти/Snackbars',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [SnackBarOverviewComponent],
    imports: [SnackbarModule, IconsModule, ButtonModule],
    providers: [SnackBarService]
  },
  template: `
	  <snackbar-overview></snackbar-overview>
    `
});
