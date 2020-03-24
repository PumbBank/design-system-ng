import { PinInputComponent } from '../components/pin-input/pin-input.component';
import { number, text, boolean } from '@storybook/addon-knobs';
import { PinInputOverviewComponent } from '../examples/pin-input-page.component';

export const pinInputDefaultStorie = () => ({
    moduleMetadata: {
        declarations: [
            PinInputComponent,
            PinInputOverviewComponent
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
    <app-pin-input-overview [label]="label" [fn]="alert"></app-pin-input-overview>
    `
})