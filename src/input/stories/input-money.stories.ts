import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputMoneyStory = () => ({
  moduleMetadata: {
    imports: [
      InputModule
    ]
  },
  props: {
    placeholder: text('placeholder', '1234.5')
  },
  template: `
    <div class="mill-input-stories">
		  <input millInput="money" type="text" required caption="input money" placeholder={{placeholder}}>
		</div>
	`
});
