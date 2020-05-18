import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-hint',
  template: `
    <div class="control-message control-message_{{color}}" *ngIf="show">
      <mill-icon class="hint__icon" size="12" [name]="icon"></mill-icon>
      <div class="control-message__text">
        {{ caption }}
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `.hint__icon {
      margin-right: 8px;
    }`
]
})
export class HintComponent  {
  @Input() icon = 'info';
  @Input() valid: boolean = false;
  @Input() caption: string;
  @Input() show: Boolean = true;
  @Input() color: 'error' | 'disabled' | 'info' | 'valid' = 'info';
}
