import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { FileAttachModule } from './file-attach.module';
import { FileAttachOverviewComponent } from './examples/file-attach-overview/file-attach-overview.component';
import { IconsModule } from '../icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Компоненти|File attach',
  parameters: {
    options: {showPanel: true},
  },
  decorators: [withKnobs]
};

const viewOptions = {
  Ghost: 'ghost',
  Hidden: 'hidden'
};

const viewDefaultOption = viewOptions.Ghost;

export const component = () => ({
  moduleMetadata: {
    declarations: [
      FileAttachOverviewComponent
    ],
    imports: [
      FileAttachModule,
      IconsModule,
      BrowserAnimationsModule
    ]
  },
  props: {
    view: select('View', viewOptions, viewDefaultOption),
    accepted: text('Accepted file types', ''),
    multiple: boolean('Multiple files', false)
  },
  template: `
      <file-attach-overview [view]='view' [accepted]='accepted' [multiple]='multiple'></file-attach-overview>
  `
});
