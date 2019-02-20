/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ButtonVariety } from './button-variety';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
var ButtonComponent = /** @class */ (function () {
    function ButtonComponent() {
        this.variety = ButtonVariety.BASIC;
    }
    Object.defineProperty(ButtonComponent.prototype, "showText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.content && !!this.content.nativeElement.innerText.trim();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    ButtonComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.variety) {
            this.onVarietyChange();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ButtonComponent.prototype.onVarietyChange = /**
     * @private
     * @return {?}
     */
    function () {
        switch (this.variety) {
            case ButtonVariety.CONTAINED:
                this.varietyClass = 'fuui-button_contained';
                break;
        }
    };
    ButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuui-button',
                    template: "<button class=\"fuui-button\" [ngClass]=\"varietyClass\" [attr.form]=\"form\">\r\n  <ng-content select=\".fuui-icon, fuui-icon\"></ng-content>\r\n\r\n  <span [class.hidden]=\"!showText\" #content>\r\n    <ng-content></ng-content>\r\n  </span>\r\n</button>\r\n",
                    styles: [".fuui-button,.fuui-button_contained{height:40px;border:none;outline:0;background:0 0;cursor:pointer;box-sizing:border-box;padding:8px;border-radius:4px;display:flex;flex-direction:row;align-items:center}.fuui-button>span,.fuui-button_contained>span{display:inline-block;padding:0 4px}.hidden{display:none!important}"]
                }] }
    ];
    ButtonComponent.propDecorators = {
        variety: [{ type: Input }],
        form: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return ButtonComponent;
}());
export { ButtonComponent };
if (false) {
    /** @type {?} */
    ButtonComponent.prototype.variety;
    /** @type {?} */
    ButtonComponent.prototype.form;
    /** @type {?} */
    ButtonComponent.prototype.content;
    /** @type {?} */
    ButtonComponent.prototype.varietyClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRWxHO0lBQUE7UUFNVyxZQUFPLEdBQWtCLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUF3QnhELENBQUM7SUFqQkMsc0JBQUkscUNBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZFLENBQUM7OztPQUFBOzs7OztJQUVELHFDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx5Q0FBZTs7OztJQUF2QjtRQUNFLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNwQixLQUFLLGFBQWEsQ0FBQyxTQUFTO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLHVCQUF1QixDQUFDO2dCQUM1QyxNQUFNO1NBQ1Q7SUFDSCxDQUFDOztnQkE3QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QiwrUUFBc0M7O2lCQUV2Qzs7OzBCQUVFLEtBQUs7dUJBQ0wsS0FBSzswQkFFTCxTQUFTLFNBQUMsU0FBUzs7SUFxQnRCLHNCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0F6QlksZUFBZTs7O0lBQzFCLGtDQUFzRDs7SUFDdEQsK0JBQXNCOztJQUV0QixrQ0FBMEM7O0lBRTFDLHVDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvblZhcmlldHkgfSBmcm9tICcuL2J1dHRvbi12YXJpZXR5JztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZnV1aS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2J1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHZhcmlldHk6IEJ1dHRvblZhcmlldHkgPSBCdXR0b25WYXJpZXR5LkJBU0lDO1xyXG4gIEBJbnB1dCgpIGZvcm06IHN0cmluZztcclxuXHJcbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gIHZhcmlldHlDbGFzczogc3RyaW5nO1xyXG5cclxuICBnZXQgc2hvd1RleHQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50ICYmICEhdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLnZhcmlldHkpIHtcclxuICAgICAgdGhpcy5vblZhcmlldHlDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25WYXJpZXR5Q2hhbmdlKCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZhcmlldHkpIHtcclxuICAgICAgY2FzZSBCdXR0b25WYXJpZXR5LkNPTlRBSU5FRDpcclxuICAgICAgICB0aGlzLnZhcmlldHlDbGFzcyA9ICdmdXVpLWJ1dHRvbl9jb250YWluZWQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=