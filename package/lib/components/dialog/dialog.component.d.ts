import { EventEmitter } from '@angular/core';
export declare class DialogComponent {
    backgropClose: boolean;
    active: boolean;
    activeChange: EventEmitter<boolean>;
    backdropClick(): void;
}
