import { select, text, withKnobs } from '@storybook/addon-knobs';
import { FileAttachModule } from "./file-attach.module";
import { FileAttachOverviewComponent } from "./examples/file-attach-overview/file-attach-overview.component";
import { IconsModule } from "../2-icons";

export default {
  title: 'Компоненти|File attach',
  parameters: {
    options: { showPanel: true },
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
      IconsModule
    ]
  },
  props: {
    view: select('View', viewOptions, viewDefaultOption),
    accepted: text('Accepted file types', '')
  },
  template: `
      <file-attach-overview [view]="view" [accepted]="accepted"></file-attach-overview>
  `
});
