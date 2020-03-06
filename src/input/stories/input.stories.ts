import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

import { inputDateStory } from './input-date.stories';

const inputStories = storiesOf('Inputs', module);
inputStories.addDecorator(withKnobs);

inputStories.add('Overview', () => inputDateStory());
