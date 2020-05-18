import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'icons-overview',
  templateUrl: './icons-overview.component.html',
  styleUrls: ['./icons-overview.component.scss', '../../../assets/styles/overview.scss'],
})
export class IconsOverview {
  public icons12 = ['heart', 'circle-minus', 'circle-close', 'valid', 'close', 'chevron-right-double', 'chevron-right', 'minus', 'plus', 'exit', 'time', 'small-arrow-up', 'small-arrow-down',
    'dot', 'warning-simple', 'info', 'ok', 'warning'
  ];
  public icons24 = ['bell-off', 'bell', 'filter', 'clone', 'lightbulb', 'key-off', 'clock', 'camera', 'visibility-off', 'payment', 'cards-transfer', 'settings', 'refresh',
    'attach', 'print', 'visibility', 'monitor', 'collapse', 'expand', 'cart', 'location', 'trash', 'edit', 'share', 'folder', 'wallet', 'key', 'home', 'label', 'card', 'search',
    'entrance', 'exit', 'upload', 'download', 'calendar', 'mail', 'spinner', 'info', 'warning', 'circle-minus', 'circle-close', 'circle-plus', 'remove', 'add', 'close', 'check', 'burger', 'drag',
    'more', 'apps', 'email', 'phone', 'chevron-up', 'chevron-down', 'chevron-right', 'chevron-left', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'unlock-pass', 'lock-pass', 'user'
  ];

  public iconName: string;

  constructor(private _r: Renderer2) {}

  public onHover(name: string) {
    this.iconName = name;
  }

  public onClick(event, input) {
    this._copyToClipboard(input);
  }

  private _copyToClipboard(input) {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }


}

