import { Component, Input, OnInit } from '@angular/core';
import { AbstractSelectUserCommunication } from './abstract-select-ueser-communication';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mill-select',
  templateUrl: './mill-select.component.html',
  styles: [
    `
      .input__input { display: inline-block; min-width: 160px; }
      .select { display: inline-block; }
      .input__enterence { min-width: 207px; }
      .option_focused { background: #f5f5fa; }
    `
  ]
})
export class MillSelectComponent<K = any, P = any> extends AbstractSelectUserCommunication<K, P> implements OnInit {

  /**
   * @description This value will be displayed as select header
   */
  @Input() caption: string;

  /**
   * @description This value will be displayed while any option not selected
   */
  @Input() placeholder: string;

}

