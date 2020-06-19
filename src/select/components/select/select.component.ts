import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { AbstractSelectUserCommunication } from './abstract-select-user-communication';

@Component({
  selector: 'mill-select',
  templateUrl: './select.component.html',
  styles: [
    `
      :host { display: contents; }
      .input__input { display: inline-block; min-width: 160px; }
      .select { display: inline-block; }
      .input__enterence { min-width: 207px; }
      .option_focused { background: #f5f5fa; }
      .select__header { display: block; }
    `
  ],
  styleUrls: ['select.component.scss']
})
export class SelectComponent<K = any, P = any> extends AbstractSelectUserCommunication<K, P> implements OnInit {

  /**
   * @description This value will be displayed as select header
   */
  @Input() caption: string;
  @Input() disabled: boolean;

  /**
   * @description This value will be displayed while any option not selected
   */
  @Input() placeholder: string;

  get touched(): boolean {
    return this.element.nativeElement.classList.contains('ng-touched');
  }

  get isInvalid(): boolean {
    return this.element.nativeElement.classList.contains('ng-invalid');
  }

  get selectMinWidth(): string {
    return this.multiple ? '200px' : '100px';
  }

  constructor(private element: ElementRef) {
    super();
  }

  options: {autoHide: boolean, scrollbarMinSize: number} = { autoHide: false, scrollbarMinSize: 5 };
}

