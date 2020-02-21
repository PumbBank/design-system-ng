import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputNumberStory = () => ({
  moduleMetadata: {
    imports: [
      InputModule
    ]
  },
  props: {
    placeholder: text('placeholder', '579')
  },
  template: `
    <div class="mill-input-stories">
		  <input millInput="number" type="text" required caption="input number" placeholder={{placeholder}}>
		</div>
	`
});
