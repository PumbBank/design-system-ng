import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent {
  /**
   * set to `false` to stop the loader animation
   */
  @Input() isActive = true;

  /**
   * Specify the type of the loader
   */
  @Input() type: 'circular' | 'linear' = 'circular';

  /**
   * Specify the size of the loader
   */
  @Input() size: 'normal' | 'small' = 'normal';

  constructor() {}
}
