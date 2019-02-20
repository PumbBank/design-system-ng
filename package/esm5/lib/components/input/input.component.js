/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var InputComponent = /** @class */ (function () {
    function InputComponent() {
        this.type = 'text';
        this.title = '';
        this.value = null;
        this.invalidHint = false;
        this.valueChange = new EventEmitter();
        this.focus = new EventEmitter();
        this.valid = false;
        this.invalid = false;
    }
    /**
     * @param {?} e
     * @param {?} value
     * @return {?}
     */
    InputComponent.prototype.onInput = /**
     * @param {?} e
     * @param {?} value
     * @return {?}
     */
    function (e, value) {
        this.value = value;
        this.valueChange.emit(this.value);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    InputComponent.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.focus.emit(e);
    };
    InputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuui-input',
                    template: "<label class=\"fuui-input\" [class.fuui-input_filled]=\"!!value\">\r\n  <div class=\"fuui-input__caption\">{{ title }}</div>\r\n  <input [type]=\"type\" class=\"fuui-input__input\" [value]=\"value\" (focus)=\"onFocus($event)\" (input)=\"onInput($event, input.value)\" #input>\r\n</label>\r\n",
                    styles: [".fuui-input{min-width:216px;display:inline-flex;flex-direction:row;align-items:center;justify-content:space-between;position:relative;height:68px;box-sizing:border-box;padding:11px 0 20px;width:100%!important}.fuui-input:after{content:'';display:block;position:absolute;width:100%;bottom:20px;left:0;height:1px;background:#000}.fuui-input.fuui-input_filled:after,.fuui-input:focus-within:after{height:2px}.fuui-input.fuui-input_filled>.fuui-input__caption,.fuui-input:focus-within>.fuui-input__caption{top:0;font-size:12px}.fuui-input__caption{position:absolute;top:20px;font-size:16px;transition:250ms}.fuui-input__input{border:none;outline:0;font-size:16px;padding:0;background:0 0;flex-grow:1}.fuui-input__hint{position:absolute;font-size:12px;bottom:3px}"]
                }] }
    ];
    InputComponent.propDecorators = {
        type: [{ type: Input }],
        title: [{ type: Input }],
        value: [{ type: Input }],
        invalidHint: [{ type: Input }],
        valueChange: [{ type: Output }],
        focus: [{ type: Output }]
    };
    return InputComponent;
}());
export { InputComponent };
if (false) {
    /** @type {?} */
    InputComponent.prototype.type;
    /** @type {?} */
    InputComponent.prototype.title;
    /** @type {?} */
    InputComponent.prototype.value;
    /** @type {?} */
    InputComponent.prototype.invalidHint;
    /** @type {?} */
    InputComponent.prototype.valueChange;
    /** @type {?} */
    InputComponent.prototype.focus;
    /** @type {?} */
    InputComponent.prototype.valid;
    /** @type {?} */
    InputComponent.prototype.invalid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnV1aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RTtJQUFBO1FBTVcsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUN0QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFNUIsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvRCxVQUFLLEdBQXdCLElBQUksWUFBWSxFQUFTLENBQUM7UUFFakUsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixZQUFPLEdBQVksS0FBSyxDQUFDO0lBVTNCLENBQUM7Ozs7OztJQVJDLGdDQUFPOzs7OztJQUFQLFVBQVEsQ0FBZ0IsRUFBRSxLQUFhO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELGdDQUFPOzs7O0lBQVAsVUFBUSxDQUFRO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7Z0JBeEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsK1NBQXFDOztpQkFFdEM7Ozt1QkFFRSxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUVMLE1BQU07d0JBQ04sTUFBTTs7SUFhVCxxQkFBQztDQUFBLEFBekJELElBeUJDO1NBcEJZLGNBQWM7OztJQUN6Qiw4QkFBK0I7O0lBQy9CLCtCQUE0Qjs7SUFDNUIsK0JBQThCOztJQUM5QixxQ0FBc0M7O0lBRXRDLHFDQUF5RTs7SUFDekUsK0JBQWlFOztJQUVqRSwrQkFBdUI7O0lBQ3ZCLGlDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmdXVpLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2lucHV0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gIEBJbnB1dCgpIGludmFsaWRIaW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBAT3V0cHV0KCkgZm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG5cclxuICB2YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgb25JbnB1dChlOiBLZXlib2FyZEV2ZW50LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzKGU6IEV2ZW50KSB7XHJcbiAgICB0aGlzLmZvY3VzLmVtaXQoZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==