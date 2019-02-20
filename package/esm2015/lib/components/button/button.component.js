/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ButtonVariety } from './button-variety';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
export class ButtonComponent {
    constructor() {
        this.variety = ButtonVariety.BASIC;
    }
    /**
     * @return {?}
     */
    get showText() {
        return this.content && !!this.content.nativeElement.innerText.trim();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.variety) {
            this.onVarietyChange();
        }
    }
    /**
     * @private
     * @return {?}
     */
    onVarietyChange() {
        switch (this.variety) {
            case ButtonVariety.CONTAINED:
                this.varietyClass = 'fuui-button_contained';
                break;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBT2xHLE1BQU0sT0FBTyxlQUFlO0lBTDVCO1FBTVcsWUFBTyxHQUFrQixhQUFhLENBQUMsS0FBSyxDQUFDO0lBd0J4RCxDQUFDOzs7O0lBakJDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7OztJQUVPLGVBQWU7UUFDckIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BCLEtBQUssYUFBYSxDQUFDLFNBQVM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsdUJBQXVCLENBQUM7Z0JBQzVDLE1BQU07U0FDVDtJQUNILENBQUM7OztZQTdCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLCtRQUFzQzs7YUFFdkM7OztzQkFFRSxLQUFLO21CQUNMLEtBQUs7c0JBRUwsU0FBUyxTQUFDLFNBQVM7Ozs7SUFIcEIsa0NBQXNEOztJQUN0RCwrQkFBc0I7O0lBRXRCLGtDQUEwQzs7SUFFMUMsdUNBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnV0dG9uVmFyaWV0eSB9IGZyb20gJy4vYnV0dG9uLXZhcmlldHknO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmdXVpLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgdmFyaWV0eTogQnV0dG9uVmFyaWV0eSA9IEJ1dHRvblZhcmlldHkuQkFTSUM7XHJcbiAgQElucHV0KCkgZm9ybTogc3RyaW5nO1xyXG5cclxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgdmFyaWV0eUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGdldCBzaG93VGV4dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgJiYgISF0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQudHJpbSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMudmFyaWV0eSkge1xyXG4gICAgICB0aGlzLm9uVmFyaWV0eUNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblZhcmlldHlDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudmFyaWV0eSkge1xyXG4gICAgICBjYXNlIEJ1dHRvblZhcmlldHkuQ09OVEFJTkVEOlxyXG4gICAgICAgIHRoaXMudmFyaWV0eUNsYXNzID0gJ2Z1dWktYnV0dG9uX2NvbnRhaW5lZCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==