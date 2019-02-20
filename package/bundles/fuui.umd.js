(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/forms'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('fuui', ['exports', '@angular/common', '@angular/forms', '@angular/core'], factory) :
    (factory((global.fuui = {}),global.ng.common,global.ng.forms,global.ng.core));
}(this, (function (exports,common,forms,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IconComponent = /** @class */ (function () {
        function IconComponent() {
        }
        IconComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-icon',
                        template: "<i class=\"fuui-icon\">\r\n  <ng-content></ng-content>\r\n</i>\r\n",
                        styles: ["@font-face{font-family:'Material Icons';font-style:normal;font-weight:400;src:url(https://example.com/MaterialIcons-Regular.eot);src:local(\"Material Icons\"),local(\"MaterialIcons-Regular\"),url(https://example.com/MaterialIcons-Regular.woff2) format(\"woff2\"),url(https://example.com/MaterialIcons-Regular.woff) format(\"woff\"),url(https://example.com/MaterialIcons-Regular.ttf) format(\"truetype\")}.fuui-icon{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;-webkit-font-feature-settings:'liga';font-feature-settings:'liga'}.fuui-icon.fuui-icon_large{font-size:36px}:host{font-size:0}"]
                    }] }
        ];
        return IconComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ButtonVariety = {
        BASIC: 'basic',
        CONTAINED: 'contained',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ButtonComponent = /** @class */ (function () {
        function ButtonComponent() {
            this.variety = ButtonVariety.BASIC;
        }
        Object.defineProperty(ButtonComponent.prototype, "showText", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'fuui-button',
                        template: "<button class=\"fuui-button\" [ngClass]=\"varietyClass\" [attr.form]=\"form\">\r\n  <ng-content select=\".fuui-icon, fuui-icon\"></ng-content>\r\n\r\n  <span [class.hidden]=\"!showText\" #content>\r\n    <ng-content></ng-content>\r\n  </span>\r\n</button>\r\n",
                        styles: [".fuui-button,.fuui-button_contained{height:40px;border:none;outline:0;background:0 0;cursor:pointer;box-sizing:border-box;padding:8px;border-radius:4px;display:flex;flex-direction:row;align-items:center}.fuui-button>span,.fuui-button_contained>span{display:inline-block;padding:0 4px}.hidden{display:none!important}"]
                    }] }
        ];
        ButtonComponent.propDecorators = {
            variety: [{ type: core.Input }],
            form: [{ type: core.Input }],
            content: [{ type: core.ViewChild, args: ['content',] }]
        };
        return ButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NavigationItemComponent = /** @class */ (function () {
        function NavigationItemComponent() {
            this.active = false;
        }
        NavigationItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-navigation-item',
                        template: "<a [class.fuui-navigation__item_active]=\"active\" class=\"fuui-navigation__item\">\r\n  <ng-content select=\"fuui-icon\"></ng-content>\r\n  <div class=\"fuui-navigation__item__title\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</a>\r\n",
                        styles: [".fuui-navigation__item{width:100%;height:40px;cursor:pointer;display:flex;flex-direction:row;align-items:center;padding:0 0 0 24px;justify-content:start;box-sizing:border-box}"]
                    }] }
        ];
        NavigationItemComponent.propDecorators = {
            active: [{ type: core.Input }]
        };
        return NavigationItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputComponent = /** @class */ (function () {
        function InputComponent() {
            this.type = 'text';
            this.title = '';
            this.value = null;
            this.invalidHint = false;
            this.valueChange = new core.EventEmitter();
            this.focus = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'fuui-input',
                        template: "<label class=\"fuui-input\" [class.fuui-input_filled]=\"!!value\">\r\n  <div class=\"fuui-input__caption\">{{ title }}</div>\r\n  <input [type]=\"type\" class=\"fuui-input__input\" [value]=\"value\" (focus)=\"onFocus($event)\" (input)=\"onInput($event, input.value)\" #input>\r\n</label>\r\n",
                        styles: [".fuui-input{min-width:216px;display:inline-flex;flex-direction:row;align-items:center;justify-content:space-between;position:relative;height:68px;box-sizing:border-box;padding:11px 0 20px;width:100%!important}.fuui-input:after{content:'';display:block;position:absolute;width:100%;bottom:20px;left:0;height:1px;background:#000}.fuui-input.fuui-input_filled:after,.fuui-input:focus-within:after{height:2px}.fuui-input.fuui-input_filled>.fuui-input__caption,.fuui-input:focus-within>.fuui-input__caption{top:0;font-size:12px}.fuui-input__caption{position:absolute;top:20px;font-size:16px;transition:250ms}.fuui-input__input{border:none;outline:0;font-size:16px;padding:0;background:0 0;flex-grow:1}.fuui-input__hint{position:absolute;font-size:12px;bottom:3px}"]
                    }] }
        ];
        InputComponent.propDecorators = {
            type: [{ type: core.Input }],
            title: [{ type: core.Input }],
            value: [{ type: core.Input }],
            invalidHint: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            focus: [{ type: core.Output }]
        };
        return InputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputControlComponent = /** @class */ (function () {
        function InputControlComponent() {
            this.invalidHint = false;
            this.inputValue = null;
            this.onChangeCallback = ( /**
             * @return {?}
             */function () { });
            this.onTouchedCallback = ( /**
             * @return {?}
             */function () { });
        }
        Object.defineProperty(InputControlComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this.inputValue;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} c
         * @return {?}
         */
        InputControlComponent.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
            function (c) {
                return null;
            };
        /**
         * @param {?} value
         * @return {?}
         */
        InputControlComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        InputControlComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        InputControlComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        InputControlComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-input-control',
                        template: "\n    <fuui-input\n      [type]=\"type\"\n      [title]=\"title\"\n      [invalidHint]=\"invalidHint\"\n      [(value)]=\"inputValue\"\n      (focus)=\"onTouchedCallback()\"\n      (valueChange)=\"onChangeCallback($event)\"\n      ></fuui-input>\n  ",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return InputControlComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return InputControlComponent; })),
                                multi: true
                            }
                        ]
                    }] }
        ];
        InputControlComponent.propDecorators = {
            type: [{ type: core.Input }],
            title: [{ type: core.Input }]
        };
        return InputControlComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DialogComponent = /** @class */ (function () {
        function DialogComponent() {
            this.backgropClose = false;
            this.active = false;
            this.activeChange = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'fuui-dialog',
                        template: "<ng-container *ngIf=\"active\">\r\n  <div class=\"fuui-overlay\" (click)=\"backdropClick()\"></div>\r\n\r\n  <div class=\"fuui-dialog\">\r\n    <ng-content select=\"fuui-dialog-header\"></ng-content>\r\n    <ng-content select=\"fuui-dialog-body\"></ng-content>\r\n    <ng-content select=\"fuui-dialog-footer\"></ng-content>\r\n  </div>\r\n</ng-container>\r\n",
                        styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
                    }] }
        ];
        DialogComponent.propDecorators = {
            backgropClose: [{ type: core.Input }],
            active: [{ type: core.Input }],
            activeChange: [{ type: core.Output }]
        };
        return DialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DialogBodyComponent = /** @class */ (function () {
        function DialogBodyComponent() {
        }
        DialogBodyComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-dialog-body',
                        template: "<div class=\"fuui-dialog__body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                        styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
                    }] }
        ];
        return DialogBodyComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DialogFooterComponent = /** @class */ (function () {
        function DialogFooterComponent() {
        }
        DialogFooterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-dialog-footer',
                        template: "<div class=\"fuui-dialog__footer\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                        styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
                    }] }
        ];
        return DialogFooterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DialogHeaderComponent = /** @class */ (function () {
        function DialogHeaderComponent() {
        }
        DialogHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-dialog-header',
                        template: "<div class=\"fuui-dialog__header\">\r\n  <ng-content></ng-content>\r\n</div>\r\n",
                        styles: [".fuui-overlay{position:fixed;z-index:100;background:#000;opacity:.5;left:0;top:0;right:0;bottom:0}.fuui-dialog{min-width:320px;position:fixed;z-index:101;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);overflow:hidden;border-radius:8px}.fuui-dialog__header{height:64px;padding:0 24px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box}.fuui-dialog__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:8px}.fuui-dialog__body{padding:24px;max-height:calc(100vh - 129px)}"]
                    }] }
        ];
        return DialogHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FabComponent = /** @class */ (function () {
        function FabComponent() {
        }
        FabComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'fuui-fab',
                        template: "<button class=\"fuui-fab\">\r\n  <fuui-icon class=\"fuui-icon\" *ngIf=\"icon\">{{ icon }}</fuui-icon>\r\n  <span>\r\n    <ng-content></ng-content>\r\n  </span>\r\n</button>\r\n",
                        styles: [".fuui-fab{height:48px;display:inline-flex;flex-direction:row;align-items:center;border:none;outline:0;padding:0 10px;border-radius:24px;cursor:pointer}.fuui-fab span{margin:0 10px}.fuui-fab .fuui-icon{margin:0 2px}"]
                    }] }
        ];
        FabComponent.propDecorators = {
            icon: [{ type: core.Input }]
        };
        return FabComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FuuiModule = /** @class */ (function () {
        function FuuiModule() {
        }
        FuuiModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
        return FuuiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.FuuiModule = FuuiModule;
    exports.ɵa = ButtonComponent;
    exports.ɵi = DialogBodyComponent;
    exports.ɵj = DialogFooterComponent;
    exports.ɵh = DialogHeaderComponent;
    exports.ɵg = DialogComponent;
    exports.ɵb = FabComponent;
    exports.ɵc = IconComponent;
    exports.ɵe = InputControlComponent;
    exports.ɵd = InputComponent;
    exports.ɵf = NavigationItemComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=fuui.umd.js.map