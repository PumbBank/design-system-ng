import { NgModule } from '@angular/core';
import { PinInputComponent } from './components/pin-input/pin-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PinInputComponent
    ],
    exports: [
        PinInputComponent
    ]
})
export class PinInputModule {

}
