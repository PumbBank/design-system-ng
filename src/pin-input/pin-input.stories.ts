import { storiesOf } from '@storybook/angular';
import { withKnobs } from "@storybook/addon-knobs";
import { pinInputDefaultStorie } from './stories/pin-input';

const pinInputStories = storiesOf('Pin input', module);

pinInputStories.addDecorator(withKnobs);

pinInputStories.add('Overview', pinInputDefaultStorie);
