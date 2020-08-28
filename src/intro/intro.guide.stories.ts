import { withKnobs } from '@storybook/addon-knobs';
import { IntroGuidelineComponent } from './examples/intro-page.component';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Гайдлайни|Intro',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      IntroGuidelineComponent,
    ],
    imports: [
      HttpClientModule
    ]
  },
  template: `
    <mill-intro-overview></mill-intro-overview>
  `
});

component.story = {
  name: 'Огляд'
};
