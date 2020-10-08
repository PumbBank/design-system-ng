import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { PinInputComponent } from './components/pin-input/pin-input.component';
import { PinInputOverviewComponent } from './examples/pin-input-page.component';
import { IconsModule } from '../icons';

/*
export default {
  title: 'Компоненти/Pin',
  parameters: {
    options: { showPanel: false },
  },
  decorators: [withKnobs]
};
*/

export const component = () => ({
  moduleMetadata: {
    declarations: [
      PinInputComponent,
      PinInputOverviewComponent
    ],
    imports: [
      IconsModule
    ]
  },
  props: {
    length: number('Length', 5),
    value: text('Value', '12345'),
    errorMessage: text('Error Message', 'Wrong OTP'),
    invalid: boolean('Invalid', true),
    label: text('List label name', 'Pin input'),
    alert
  },
  template: `
    <app-pin-input-overview [label]="label" [fn]="alert"></app-pin-input-overview>
    `
});
