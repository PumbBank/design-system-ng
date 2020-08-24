import { Component, Renderer2 } from '@angular/core';
import { iconsData } from '@mill/figma/icons-data';

@Component({
  selector: 'icons-overview',
  templateUrl: './icons-overview.component.html',
  styleUrls: ['./icons-overview.component.scss', '../../../assets/styles/overview.scss'],
})
export class IconsOverviewComponent {
  // return array of names:string for small size icons
  public icons12: string[] = this.filterIcons(iconsData, 12);

  // return array of names:string for middle size icons
  public icons24: string[] = this.filterIcons(iconsData, 24);

  public iconName: string;

  constructor(private _r: Renderer2) {}

  private filterIcons(iconsArray: {id: string, name: string, size: number}[], iconSize: number): string[] {
    return iconsArray.filter(iconData => iconData.size === iconSize).map(item => item.name);
  }

  public onHover(name: string): void {
    this.iconName = name;
  }

  public onClick(input: HTMLInputElement): void {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }
}

