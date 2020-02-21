import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputTextStory = () => ({
  moduleMetadata: {
    imports: [
      InputModule
    ]
  },
  props: {
    placeholder: text('placeholder', 'this is good')
  },
  template: `
    <div class="mill-input-stories">
		  <input millInput="text" type="text" required caption="input text" placeholder={{placeholder}}>
		</div>
	`
});
