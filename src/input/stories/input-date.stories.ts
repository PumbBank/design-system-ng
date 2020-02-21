import { boolean, select, text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';

export const inputDateStory = () => ({
  moduleMetadata: {
    imports: [
      InputModule
    ]
  },
  props: {
    placeholder: text('placeholder', 'dd.mm.yyyy')
  },
  template: `
    <div class="mill-input-stories">
		  <input millInput="date" type="text" required caption="input type date" placeholder={{placeholder}}>
		</div>
	`
});
