import { withKnobs } from '@storybook/addon-knobs';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import {DialogOverviewComponent} from './examples/dialog-page.component';
import { DialogModule } from './dialog.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';

export default {
  title: 'Компоненти/Dialog',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      DialogOverviewComponent,
    ],
    imports: [
      ReactiveFormsModule,
      IconsModule,
      DialogModule,
      CommonModule,
      ButtonModule,
    ]
  },
  props: {},
  template: `<mill-dialog-overview></mill-dialog-overview>`
});
