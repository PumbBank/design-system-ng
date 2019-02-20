/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class NavigationItemComponent {
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
if (false) {
    /** @type {?} */
    NavigationItemComponent.prototype.active;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9qRCxNQUFNLE9BQU8sdUJBQXVCO0lBTHBDO1FBTVcsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs7WUFQQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsOFBBQStDOzthQUVoRDs7O3FCQUVFLEtBQUs7Ozs7SUFBTix5Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Z1dWktbmF2aWdhdGlvbi1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG59XHJcbiJdfQ==