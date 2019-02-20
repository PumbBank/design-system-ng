import { ButtonVariety } from './button-variety';
import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class ButtonComponent implements OnChanges {
    variety: ButtonVariety;
    form: string;
    content: ElementRef;
    varietyClass: string;
    readonly showText: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    private onVarietyChange;
}
