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
        value: text('Value', '12345'),
        errorMessage: text('Error Message', 'Wrong OTP'),
        invalid: boolean('Invalid', true),
        label: text('List label name', 'Pin input'),
        alert: alert
    },
    template: `
    <div class="h3">{{label}}</div>
    <div style="display: flex; padding: 24px; justify-content: space-between;">
      <mill-pin-input
      [value]="value"
      [length]="length"
      (enter)="alert($event.value)"
      [errorMessage]="errorMessage">
        Enter OTP
      </mill-pin-input>

      <mill-pin-input 
      [value]="value"
      [length]="4"
      (enter)="alert($event.value)"
      [errorMessage]="errorMessage"
      [invalid]="invalid">
        Enter OTP (invalid)
      </mill-pin-input>

      <mill-pin-input 
      [value]="value"
      [length]="5"
      (enter)="alert($event.value)"
      [disable]="true">
        Enter OTP (disabled)
      </mill-pin-input>
    </div>
    `
})