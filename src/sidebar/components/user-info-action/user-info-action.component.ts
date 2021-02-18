import { Component, Input, HostListener, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mill-user-info-action',
  template: `
    <ng-container [ngTemplateOutlet]="badge ? withBadge : simple"></ng-container>
    <ng-template #simple>
      <span class="user-info__icon icon icon_24" [ngClass]="'icon_' + icon"></span>
    </ng-template>

    <ng-template #withBadge>
      <mill-icon color="rgba(182, 182, 191, 1)" [badge]="badge" [name]="icon"></mill-icon>
    </ng-template>
  `,
  styleUrls: ['./user-info-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoActionComponent {
  private _disabled: boolean = false;

  @HostBinding('class.mill-user-info-action_disabled') get disabledClass(): boolean { return this.disabled; }

  @Input() icon: string;
  @Input() badge: string;

  @Input()
  set disabled(value: any) {
    this._disabled = value === 'true' || value === true;
  }
  get disabled(): any {
    return this._disabled;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }
}
