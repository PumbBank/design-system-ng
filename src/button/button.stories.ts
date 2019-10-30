import { storiesOf } from '@storybook/angular';
import { withKnobs, text } from "@storybook/addon-knobs";
import { ButtonComponent } from './components/button/button.component';

storiesOf('Addon|Knobs', module)
  .addParameters({
    knobs: {
      disableDebounce: true,
    },
  })
  .addDecorator(withKnobs)
  .add('Simple', () => {
    const label = text('label', 'Regular Button');

    return {
      moduleMetadata: {
        entryComponents: [ButtonComponent],
        declarations: [ButtonComponent],
      },
      template: `<mill-button>{{label}}</mill-button>`,
      props: {
        label,
      },
    };
  });
