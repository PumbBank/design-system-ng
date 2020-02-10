import { storiesOf } from '@storybook/angular';
import { withKnobs, number, radios, boolean } from "@storybook/addon-knobs";
import { userInformationStorie } from './stroies/uesr-info';
import { navItemsStorie } from './stroies/nav-items';
import { sidebarStorie } from './stroies/sidebar';


const sliderStories = storiesOf('Sidebar', module);

sliderStories.addDecorator(withKnobs);

sliderStories.add('Sidebar', sidebarStorie);
sliderStories.add('User information', userInformationStorie);
sliderStories.add('Nav items', navItemsStorie);