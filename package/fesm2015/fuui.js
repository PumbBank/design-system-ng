import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Component, Input, ViewChild, Output, EventEmitter, forwardRef, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconComponent {
}
IconComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-icon',
                template: "<i class=\"fuui-icon\">\r\n  <ng-content></ng-content>\r\n</i>\r\n",
                styles: ["@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://example.com/MaterialIcons-Regular.eot);src:local(\"Material Icons\"),local(\"MaterialIcons-Regular\"),url(https://example.com/MaterialIcons-Regular.woff2) format(\"woff2\"),url(https://example.com/MaterialIcons-Regular.woff) format(\"woff\"),url(https://example.com/MaterialIcons-Regular.ttf) format(\"truetype\")}.fuui-icon{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;-webkit-font-feature-settings:'liga';font-feature-settings:'liga'}.fuui-icon.fuui-icon_large{font-size:36px}:host{font-size:0}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ButtonVariety = {
    BASIC: 'basic',
    CONTAINED: 'contained',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NavigationItemComponent {
    constructor() {
        this.active = false;
    }
}
NavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-navigation-item',
                template: "<a [class.fuui-navigation__item_active]=\"active\" class=\"fuui-navigation__item\">\r\n  <ng-content select=\"fuui-icon\"></ng-content>\r\n  <div class=\"fuui-navigation__item__title\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</a>\r\n",
                styles: [".fuui-navigation__item{width:100%;height:40px;cursor:pointer;display:flex;flex-direction:row;align-items:center;padding:0 0 0 24px;justify-content:start;box-sizing:border-box}"]
            }] }
];
NavigationItemComponent.propDecorators = {
    active: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputControlComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogBodyComponent {
}
DialogBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-dialog-body',
                template: "<div class=\"fuui-dialog__body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogFooterComponent {
}
DialogFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-dialog-footer',
                template: "<div class=\"fuui-dialog__footer\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DialogHeaderComponent {
}
DialogHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-dialog-header',
                template: "<div class=\"fuui-dialog__header\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FabComponent {
}
FabComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuui-fab',
                template: "<button class=\"fuui-fab\">\r\n  <fuui-icon class=\"fuui-icon\" *ngIf=\"icon\">{{ icon }}</fuui-icon>\r\n  <span>\r\n    <ng-content></ng-content>\r\n  </span>\r\n</button>\r\n",
                styles: [".fuui-fab{height:48px;display:inline-flex;flex-direction:row;align-items:center;border:none;outline:0;padding:0 10px;border-radius:24px;cursor:pointer}.fuui-fab span{margin:0 10px}.fuui-fab .fuui-icon{margin:0 2px}"]
            }] }
];
FabComponent.propDecorators = {
    icon: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FuuiModule {
}
FuuiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ButtonComponent,
                    FabComponent,
                    IconComponent,
                    InputComponent,
                    InputControlComponent,
                    NavigationItemComponent,
                    DialogComponent,
                    DialogHeaderComponent,
                    DialogBodyComponent,
                    DialogFooterComponent
                ],
                exports: [
                    ButtonComponent,
                    FabComponent,
                    IconComponent,
                    InputComponent,
                    InputControlComponent,
                    NavigationItemComponent,
                    DialogComponent,
                    DialogHeaderComponent,
                    DialogBodyComponent,
                    DialogFooterComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FuuiModule, ButtonComponent as ɵa, DialogBodyComponent as ɵi, DialogFooterComponent as ɵj, DialogHeaderComponent as ɵh, DialogComponent as ɵg, FabComponent as ɵb, IconComponent as ɵc, InputControlComponent as ɵe, InputComponent as ɵd, NavigationItemComponent as ɵf };

//# sourceMappingURL=fuui.js.map