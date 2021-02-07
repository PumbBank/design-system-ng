import { Component, Input, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'mill-user-info-action',
  template: `
    <span class="user-info__icon icon icon_24" [ngClass]="'icon_' + icon"></span>
  `,
  styleUrls: ['./user-info-action.component.scss']
})
export class UserInfoActionComponent {
  private _disabled: boolean = false;

  @HostBinding('class.mill-user-info-action_disabled') get disabledClass(): boolean { return this.disabled; }

  @Input() icon: string;

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
