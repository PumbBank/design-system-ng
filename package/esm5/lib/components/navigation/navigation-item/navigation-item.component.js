/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var NavigationItemComponent = /** @class */ (function () {
    function NavigationItemComponent() {
        this.active = false;
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
    return NavigationItemComponent;
}());
export { NavigationItemComponent };
if (false) {
    /** @type {?} */
    NavigationItemComponent.prototype.active;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Z1dWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRDtJQUFBO1FBTVcsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUNuQyxDQUFDOztnQkFQQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsOFBBQStDOztpQkFFaEQ7Ozt5QkFFRSxLQUFLOztJQUNSLDhCQUFDO0NBQUEsQUFQRCxJQU9DO1NBRlksdUJBQXVCOzs7SUFDbEMseUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmdXVpLW5hdmlnYXRpb24taXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25JdGVtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG4iXX0=