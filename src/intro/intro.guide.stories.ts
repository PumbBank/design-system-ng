import { IntroGuidelineComponent } from './examples/intro-page.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '../icons';
import { ChangelogComponent } from '../changelog/changelog.component';
import { ChipModule } from '../chips';

export default {
  title: 'Гайдлайни/Intro',
  parameters: {
    options: { showPanel: false },
    layout: 'fullscreen'
  }
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      IntroGuidelineComponent,
    ],
    imports: [
      HttpClientModule,
      IconsModule
    ]
  },
  template: `
    <mill-intro-overview></mill-intro-overview>
  `
});

component.storyName = 'Дизайн Система';

export const changeLogComponent = () => ({
  moduleMetadata: {
    declarations: [
      ChangelogComponent,
    ],
    imports: [
      HttpClientModule,
      IconsModule,
      ChipModule
    ]
  },
  template: `
    <mill-changelog></mill-changelog>
  `
});

changeLogComponent.story = {
  name: 'Історія версій'
};
