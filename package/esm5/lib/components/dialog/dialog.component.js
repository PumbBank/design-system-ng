/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var DialogComponent = /** @class */ (function () {
    function DialogComponent() {
        this.backgropClose = false;
        this.active = false;
        this.activeChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DialogComponent.prototype.backdropClick = /**
     * @return {?}
     */
    function () {
        if (this.backgropClose) {
            this.active = false;
            this.activeChange.emit(false);
        }
    };
    DialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuui-dialog',
                    template: "<ng-container *ngIf=\"active\">\r\n  <div class=\"fuui-overlay\" (click)=\"backdropClick()\"></div>\r\n\r\n  <div class=\"fuui-dialog\">\r\n    <ng-content select=\"fuui-dialog-header\"></ng-content>\r\n    <ng-content select=\"fuui-dialog-body\"></ng-content>\r\n    <ng-content select=\"fuui-dialog-footer\"></ng-content>\r\n  </div>\r\n</ng-container>\r\n",
                    styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
                }] }
    ];
    DialogComponent.propDecorators = {
        backgropClose: [{ type: Input }],
        active: [{ type: Input }],
        activeChange: [{ type: Output }]
    };
    return DialogComponent;
}());
export { DialogComponent };
if (false) {
    /** @type {?} */
    DialogComponent.prototype.backgropClose;
    /** @type {?} */
    DialogComponent.prototype.active;
    /** @type {?} */
    DialogComponent.prototype.activeChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RTtJQUFBO1FBTVcsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN2QixpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBUTlFLENBQUM7Ozs7SUFOQyx1Q0FBYTs7O0lBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOztnQkFmRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLGtYQUFzQzs7aUJBRXZDOzs7Z0NBRUUsS0FBSzt5QkFDTCxLQUFLOytCQUNMLE1BQU07O0lBUVQsc0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQVhZLGVBQWU7OztJQUMxQix3Q0FBd0M7O0lBQ3hDLGlDQUFpQzs7SUFDakMsdUNBQTRFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZnV1aS1kaWFsb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RpYWxvZy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGJhY2tncm9wQ2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgYWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5iYWNrZ3JvcENsb3NlKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=