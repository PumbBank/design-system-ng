/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Component, forwardRef, Input } from "@angular/core";
export class InputControlComponent {
    constructor() {
        this.invalidHint = false;
        this.inputValue = null;
        this.onChangeCallback = (/**
         * @return {?}
         */
        () => { });
        this.onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    get value() {
        return this.inputValue;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputValue = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
InputControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-input-control',
                template: `
    <fuui-input
      [type]="type"
      [title]="title"
      [invalidHint]="invalidHint"
      [(value)]="inputValue"
      (focus)="onTouchedCallback()"
      (valueChange)="onChangeCallback($event)"
      ></fuui-input>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => InputControlComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => InputControlComponent)),
                        multi: true
                    }
                ]
            }] }
];
InputControlComponent.propDecorators = {
    type: [{ type: Input }],
    title: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    InputControlComponent.prototype.type;
    /** @type {?} */
    InputControlComponent.prototype.title;
    /** @type {?} */
    InputControlComponent.prototype.invalidHint;
    /** @type {?} */
    InputControlComponent.prototype.inputValue;
    /** @type {?} */
    InputControlComponent.prototype.onChangeCallback;
    /** @type {?} */
    InputControlComponent.prototype.onTouchedCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mdXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaW5wdXQvaW5wdXQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsYUFBYSxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTJCN0QsTUFBTSxPQUFPLHFCQUFxQjtJQXpCbEM7UUE2QkUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFXLElBQUksQ0FBQztRQXNCMUIscUJBQWdCOzs7UUFBYSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7UUFDdkMsc0JBQWlCOzs7UUFBYSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFDMUMsQ0FBQzs7OztJQXRCQyxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBYztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7O1lBbERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO2dCQUNELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFDO3dCQUNwRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBQzt3QkFDcEQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7YUFDRjs7O21CQUVFLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUROLHFDQUFzQjs7SUFDdEIsc0NBQXVCOztJQUV2Qiw0Q0FBNkI7O0lBQzdCLDJDQUEwQjs7SUFzQjFCLGlEQUF1Qzs7SUFDdkMsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTLCBGb3JtQ29udHJvbCwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Z1dWktaW5wdXQtY29udHJvbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxmdXVpLWlucHV0XHJcbiAgICAgIFt0eXBlXT1cInR5cGVcIlxyXG4gICAgICBbdGl0bGVdPVwidGl0bGVcIlxyXG4gICAgICBbaW52YWxpZEhpbnRdPVwiaW52YWxpZEhpbnRcIlxyXG4gICAgICBbKHZhbHVlKV09XCJpbnB1dFZhbHVlXCJcclxuICAgICAgKGZvY3VzKT1cIm9uVG91Y2hlZENhbGxiYWNrKClcIlxyXG4gICAgICAodmFsdWVDaGFuZ2UpPVwib25DaGFuZ2VDYWxsYmFjaygkZXZlbnQpXCJcclxuICAgICAgPjwvZnV1aS1pbnB1dD5cclxuICBgLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRDb250cm9sQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0Q29udHJvbENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICBpbnZhbGlkSGludDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlucHV0VmFsdWU6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmlucHV0VmFsdWU7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBGb3JtQ29udHJvbCk6IG51bGwgfCBWYWxpZGF0aW9uRXJyb3JzIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VDYWxsYmFjazogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcbiAgb25Ub3VjaGVkQ2FsbGJhY2s6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG59XHJcbiJdfQ==