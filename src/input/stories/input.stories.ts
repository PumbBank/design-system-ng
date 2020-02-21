import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

import { inputDateStory } from './input-date.stories';
import { inputDigitStory } from './input-digit.stories';
import { inputMoneyStory } from './input-money.stories';
import { inputNumberStory } from './input-number.stories';
import { inputPhoneStory } from './input-phone.stories';
import { inputTextStory } from './input-text.stories';

const inputStories = storiesOf('Inputs', module);
inputStories.addDecorator(withKnobs);

inputStories.add('input date', () => inputDateStory());
inputStories.add('input digit', () => inputDigitStory());
inputStories.add('input money', () => inputMoneyStory());
inputStories.add('input number', () => inputNumberStory());
inputStories.add('input phone', () => inputPhoneStory());
inputStories.add('input text', () => inputTextStory());
