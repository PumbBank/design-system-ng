/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class InputComponent {
    constructor() {
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
    onInput(e, value) {
        this.value = value;
        this.valueChange.emit(this.value);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        this.focus.emit(e);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZnV1aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF2RSxNQUFNLE9BQU8sY0FBYztJQUwzQjtRQU1XLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTVCLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0QsVUFBSyxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBRWpFLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQVUzQixDQUFDOzs7Ozs7SUFSQyxPQUFPLENBQUMsQ0FBZ0IsRUFBRSxLQUFhO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxDQUFRO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsK1NBQXFDOzthQUV0Qzs7O21CQUVFLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBRUwsTUFBTTtvQkFDTixNQUFNOzs7O0lBTlAsOEJBQStCOztJQUMvQiwrQkFBNEI7O0lBQzVCLCtCQUE4Qjs7SUFDOUIscUNBQXNDOztJQUV0QyxxQ0FBeUU7O0lBQ3pFLCtCQUFpRTs7SUFFakUsK0JBQXVCOztJQUN2QixpQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZnV1aS1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pbnB1dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICBASW5wdXQoKSBpbnZhbGlkSGludDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIGZvY3VzOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcclxuXHJcbiAgdmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIG9uSW5wdXQoZTogS2V5Ym9hcmRFdmVudCwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25Gb2N1cyhlOiBFdmVudCkge1xyXG4gICAgdGhpcy5mb2N1cy5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=