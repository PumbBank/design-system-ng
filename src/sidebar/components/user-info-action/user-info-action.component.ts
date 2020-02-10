import { Component, Input, ViewEncapsulation, HostListener } from "@angular/core";

@Component({
  selector: 'mill-user-info-action',
  template: `
    <span class="user-info__icon icon icon_24" [ngClass]="'icon_' + icon"></span>
  `,
  styleUrls: ['./user-info-action.component.scss'],
  host: {
    '[class.mill-user-info-action_disabled]': 'disabled'
  }
})
export class UserInfoActionComponent {
  private _disabled = false;

  @Input() icon: string;

  @Input()
  set disabled(value: any) {
    this._disabled = value === "true" || value === true;
  }
  get disabled() {
    return this._disabled;
  }


  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }
}