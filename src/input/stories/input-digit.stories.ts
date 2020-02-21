import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputDigitStory = () => ({
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
		  <input millInput="digit" type="text" required caption="input digits" placeholder={{placeholder}}>
		</div>
	`
});
