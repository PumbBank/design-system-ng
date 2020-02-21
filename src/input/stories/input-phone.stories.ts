import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputPhoneStory = () => ({
  moduleMetadata: {
    imports: [
      InputModule
    ]
  },
  props: {
    placeholder: text('placeholder', '123456789')
  },
  template: `
    <div class="mill-input-stories">
		  <input millInput="phone" type="text" required caption="input phone number" placeholder={{placeholder}}>
		</div>
	`
});
