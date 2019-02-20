import { ControlValueAccessor, FormControl, ValidationErrors } from '@angular/forms';
export declare class InputControlComponent implements ControlValueAccessor {
    type: string;
    title: string;
    invalidHint: boolean;
    inputValue: string;
    readonly value: string;
    validate(c: FormControl): null | ValidationErrors;
    writeValue(value: string): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    onChangeCallback: Function;
    onTouchedCallback: Function;
}
