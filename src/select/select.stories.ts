import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { DEFAULT_SELECT } from './stories/default-select';
import { OS_SELECT } from './stories/select-with-os';

const sliderStories = storiesOf('Select', module);
sliderStories.addDecorator(withKnobs);

sliderStories.add('Select', DEFAULT_SELECT);
sliderStories.add('Select With options From API', OS_SELECT);
