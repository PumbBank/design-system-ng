import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class BadgeIconService implements OnDestroy {

  private _appended: boolean;

  private _svgPath: any[] = [
    {
      id: 'clip0',
      path: 'M16.9996 0C16.3719 0.835661 16 1.87439 16 3C16 5.76142 18.2386 8 21 8C22.1256 8 23.1643 7.62806 24 7.00037V24H0V0H16.9996Z'
    },
    {
      id: 'clip1',
      path: 'M10.8321 0C10.2969 1.22492 10 2.57779 10 4C10 9.52285 14.4772 14 20 14C21.4222 14 22.7751 13.7031 24 13.1679V24H0V0H10.8321Z',
    },
    {
      id: 'clip2',
      path: 'M4.83209 0C4.2969 1.22492 4 2.57779 4 4C4 9.52285 8.47715 14 14 14H20C21.4222 14 22.7751 13.7031 24 13.1679V24H0V0H4.83209Z'
    },
    {
      id: 'clip3',
      path: 'M0 11.1414V24H24V13.1679C22.7751 13.7031 21.4222 14 20 14H7C4.27455 14 1.80375 12.9097 0 11.1414Z'
    }
  ];

  private _r: Renderer2;

  constructor(private _rFactory: RendererFactory2) {
    this._r = _rFactory.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    this._r.removeChild(document.body, document.getElementById('icon-svg'));
  }

  public appendSvg(): void {

    if (this._appended) { return; }

    this._appended = true;

    const svg = this._r.createElement('svg', 'svg');
    this._r.setAttribute(svg, 'width', '0');
    this._r.setAttribute(svg, 'height', '0');
    this._r.setAttribute(svg, 'id', 'icon-svg');

    this._svgPath.forEach(i => {
      const clip = this._r.createElement('clipPath', 'svg');
      this._r.setAttribute(clip, 'id', i.id);

      const path = this._r.createElement('path', 'svg');
      // this._r.setAttribute(path, 'fill-rule', 'evenodd');
      // this._r.setAttribute(path, 'clip-rule', 'evenodd');
      this._r.setAttribute(path, 'd', i.path);
      this._r.appendChild(clip, path);

      this._r.appendChild(svg, clip);
    });

    this._r.appendChild(document.body, svg);
  }


}
