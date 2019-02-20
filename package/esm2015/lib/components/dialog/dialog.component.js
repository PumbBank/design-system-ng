/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class DialogComponent {
    constructor() {
        this.backgropClose = false;
        this.active = false;
        this.activeChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    backdropClick() {
        if (this.backgropClose) {
            this.active = false;
            this.activeChange.emit(false);
        }
    }
}
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
if (false) {
    /** @type {?} */
    DialogComponent.prototype.backgropClose;
    /** @type {?} */
    DialogComponent.prototype.active;
    /** @type {?} */
    DialogComponent.prototype.activeChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RSxNQUFNLE9BQU8sZUFBZTtJQUw1QjtRQU1XLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDdkIsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQVE5RSxDQUFDOzs7O0lBTkMsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7OztZQWZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsa1hBQXNDOzthQUV2Qzs7OzRCQUVFLEtBQUs7cUJBQ0wsS0FBSzsyQkFDTCxNQUFNOzs7O0lBRlAsd0NBQXdDOztJQUN4QyxpQ0FBaUM7O0lBQ2pDLHVDQUE0RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Z1dWktZGlhbG9nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBiYWNrZ3JvcENsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIGFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBiYWNrZHJvcENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYmFja2dyb3BDbG9zZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19