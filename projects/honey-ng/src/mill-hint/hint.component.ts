import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mill-hint',
  template: `
    <div class="control-message control-message_{{color}}" *ngIf="show">
      <div class="control-message__icon icon icon_{{icon}}"></div>
      <div class="control-message__text">
        {{ caption }}
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class HintComponent  {
  @Input() icon = 'info';
  @Input() caption: string;
  @Input() show: Boolean = true;
  @Input() color: 'error' | 'disabled' | 'info' | 'succces' = 'info';
}
