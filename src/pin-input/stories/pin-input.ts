import { PinInputComponent } from '../components/pin-input/pin-input.component';
import { number, text, boolean } from '@storybook/addon-knobs';

export const pinInputDefaultStorie = () => ({
    moduleMetadata: {
        declarations: [
            PinInputComponent
        ]
    },
    props: {
        length: number('Length', 5),
        value: text('Value', '1234'),
        errorMessage: text('Error Message', 'Wrong OTP'),
        invalid: boolean('Invalid', false),
        alert: alert
    },
    template: `
      <mill-pin-input
      [value]="value"
      [length]="length"
      (enter)="alert($event.value)"
      [errorMessage]="errorMessage"
      [invalid]="invalid">
        Enter OTP
      </mill-pin-input>
    `
})