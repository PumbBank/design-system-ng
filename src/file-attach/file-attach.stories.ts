import { withKnobs } from '@storybook/addon-knobs';
import { FileAttachModule } from "./file-attach.module";
import { FileAttachOverviewComponent } from "./examples/file-attach-overview/file-attach-overview.component";
import { IconsModule } from "../2-icons";

export default {
  title: 'Компоненти|File attach',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

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
  template: `
      <file-attach-overview></file-attach-overview>
  `
});
