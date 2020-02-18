import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[badge]',
  host: {
    'class': 'mill-badge',
  }
})
export class BadgeIconDirective {

  @Input('badge') public set content(value: string | number) {
    if (typeof value === 'string') {
      if (value === 'empty') {
        this.digits = 0;
      }

      if (Number.isInteger(Number(value))) {
        this._setDigits(+value);
      } else {
        this.digits = 0;
      }

    } else if (typeof value === 'number') {
      this._setDigits(value);
    }
  };

  public digits: number;
  public badgeText: string;

  constructor(
    private _el: ElementRef,
    private _r: Renderer2
  ) {}

  ngOnInit() {
    this.createBadgeElement();
  }

  public createBadgeElement() {
    const icon: HTMLElement = this._el.nativeElement.children.namedItem('icon');

    if (icon) {
      this._r.setStyle(icon, 'clip-path', this.svgUrl());
    }

    const element = this._r.createElement('span');
    const text = this.badgeText ? this._r.createText(this.badgeText) : null;

    this._r.addClass(element, 'badge');
    this._r.setStyle(element, 'width', this.badgeWidth());

    if (text) {
      this._r.appendChild(element, text);
    } else {
      this._r.addClass(element, 'badge_minimal');
    }

    this._r.appendChild(this._el.nativeElement, element);
  }

  public svgUrl(): string {
    return `url(#clip${this.digits >= 0 ? this.digits : 1})`;
  }

  public badgeWidth(): string {
    switch (this.digits) {
      case 3: return '29px';
      case 2: return '22px';
      case 1: return '16px';
      default: return '4px';
    }
  }

  private _setDigits(num: number): void {
    if (num < 0) {
      this.digits = 0;
    } else {
      this.badgeText = `${num}`;

      if (num < 99 && num > 9) {
        this.digits = 2;
      } else if (num > -1 && num < 10) {
        this.digits = 1;
      } else {
        this.badgeText = `99+`;
        this.digits = 3;
      }
    }
  }
}
