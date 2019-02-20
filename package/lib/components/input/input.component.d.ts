import { EventEmitter } from '@angular/core';
export declare class InputComponent {
    type: string;
    title: string;
    value: string;
    invalidHint: boolean;
    valueChange: EventEmitter<string>;
    focus: EventEmitter<Event>;
    valid: boolean;
    invalid: boolean;
    onInput(e: KeyboardEvent, value: string): void;
    onFocus(e: Event): void;
}
