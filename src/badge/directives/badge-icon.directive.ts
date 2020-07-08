import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Optional, Renderer2 } from '@angular/core';
import { BadgeIconService } from '..';
import { IconComponent } from '../../icons';

const EMPTY_BADGE_WIDTH = '4px';
const ONE_SYMBOL_BADGE_WIDTH = '16px';
const TWO_SYMBOL_BADGE_WIDTH = '22px';
const THREE_SYMBOL_BADGE_WIDTH = '29px';

const TEXT_FOR_REPLACE_LARGE_VALUE = '99+';

@Directive({
  selector: 'mill-icon[badge]'
})
export class BadgeIconDirective implements OnInit, OnChanges {
  private _badgeElement: HTMLElement;
  private _iconElement: HTMLElement;

  @Input('badge') public set value(value: string | number) {
    const badgeValue = Number.isInteger(parseInt(`${value}`, 10)) ? +value : null;

    if (!badgeValue || badgeValue <= 0) { this.badgeText = ''; return; }

    if (badgeValue < 100) {
      this.badgeText = badgeValue.toString();
    } else {
      this.badgeText = TEXT_FOR_REPLACE_LARGE_VALUE;
    }
  }

  public badgeText: string;

  @HostBinding('class') public hostClass: string = 'mill-icon-badge';

  constructor(
    private _iconElementRef: ElementRef,
    private _renderer: Renderer2,
    @Optional() private _badgeService: BadgeIconService,
    private _host: IconComponent
  ) { }

  ngOnInit(): void {
    if (this._host.size === '24') {
      this._badgeService.appendSvg();
      this.createBadgeElement();
    }
  }

  ngOnChanges(): void {
    if (this._host.size === '24') {
      this._updateBadgeSize();
      this._updateBadgeText();
    }
  }

  public createBadgeElement(): void {
      this._iconElement = this._iconElementRef.nativeElement.querySelector('.icon');
      const iconContainer: HTMLElement = this._iconElementRef.nativeElement;


      this._badgeElement = this._renderer.createElement('span');
      this._renderer.addClass(this._badgeElement, 'icon-badge');

      this._renderer.appendChild(iconContainer, this._badgeElement);

      this._updateBadgeSize();
      this._updateBadgeText();
  }

  public svgUrl(): string {
    return `url(#clip${this.badgeText.length >= 0 ? this.badgeText.length : 1})`;
  }

  public getBadgeElementWidth(): string {
    switch (this.badgeText.length) {
      case 3: return THREE_SYMBOL_BADGE_WIDTH;
      case 2: return TWO_SYMBOL_BADGE_WIDTH;
      case 1: return ONE_SYMBOL_BADGE_WIDTH;
      default: return EMPTY_BADGE_WIDTH;
    }
  }

  private _updateBadgeText(): void {
    if (!this._badgeElement) { return; }
    this._badgeElement.innerText = this.badgeText;
  }

  private _updateBadgeSize(): void {
    if (!this._badgeElement) { return; }

    this._renderer.setStyle(this._badgeElement, 'width', this.getBadgeElementWidth());
    this._renderer.setStyle(this._iconElement, 'clip-path', this.svgUrl());

    if (this.badgeText !== '') {
      this._renderer.removeClass(this._badgeElement, 'icon-badge_minimal');
    } else {
      this._renderer.addClass(this._badgeElement, 'icon-badge_minimal');
    }
  }
}
