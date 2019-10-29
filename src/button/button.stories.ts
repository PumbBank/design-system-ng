import { ButtonComponent } from './components/button/button.component';

export default { title: 'My Button' };

export const withText = () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent
    ]
  },
  props: {
    text: 'Hello Button',
  },
  template: `
    <mill-button>{{text}}</mill-button>
  `
});
