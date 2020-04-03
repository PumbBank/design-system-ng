import { storiesOf } from '@storybook/angular';
import { withKnobs, text } from "@storybook/addon-knobs";
import { BadgeModule } from './badge.module';
import { BadgeOverview } from './examples/badge-overview/badge-overview.component';


const badgeStories = storiesOf('Badges', module);
badgeStories.addDecorator(withKnobs);

badgeStories.add('Overview', () => ({
   moduleMetadata: {
      declarations: [BadgeOverview],
      imports: [BadgeModule]
   },
   props: {
      badge: text('Badge', '12')
   },
   template: `
      <badge-overview></badge-overview>
  `
}));
