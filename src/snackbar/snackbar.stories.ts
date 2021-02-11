import { withKnobs } from '@storybook/addon-knobs';
import { ButtonModule } from '../button';
import { IconsModule } from '../icons';
import { SnackBarOverviewComponent } from './examples/snackbar-overview/snackbar-overview.component';
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
    imports: [SnackbarModule, IconsModule, ButtonModule]
  },
  template: `
	  <snackbar-overview></snackbar-overview>
    `
});
