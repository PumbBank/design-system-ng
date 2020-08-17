import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'mill-colors-palette-overview',
  templateUrl: './colors-palette-page.component.html',
  styleUrls: ['../../assets/styles/overview.scss', './colors-palette-page.component.scss']
})

export class ColorsPaletteGuidelineComponent {
  public colorNameDarkGradient: string = 'Dark Gradient';
  public colorNameLightGradient: string = 'Light Gradient';
  public colorNameWhite: string = 'White';

  public colorPaletteItems: any[] = [
    {
      title: 'Колірна палітра',
      colorItems: [
        { colorName: 'Primary Dark', colorSubName: 'Grey 70', hex: '\#4D4D5C', rgb: '77, 77, 92' },
        { colorName: 'Primary Medium', colorSubName: 'Grey 50', hex: '\#93939E', rgb: '147, 147, 158' },
        { colorName: 'Primary Light', colorSubName: 'Grey 10', hex: '\#F5F5FA', rgb: '245, 245, 250' },
        { colorName: 'Secondary Accent', colorSubName: 'Red 50', hex: '\#F91F2B', rgb: '249, 31, 43' },
        { colorName: 'Error', colorSubName: 'Orange 50', hex: '\#F57F17', rgb: '245, 127, 23' },
        { colorName: 'Valid', colorSubName: 'Green 50', hex: '\#66BB6A', rgb: '102, 187, 106' },
      ]
    },
    {
      title: 'Red',
      colorItems: [
        { colorName: 'Red 10', hex: '\#FEE4E6', rgb: '254, 228, 230' },
        { colorName: 'Red 20', hex: '\#FFC5C9', rgb: '255, 197, 201' },
        { colorName: 'Red 30', hex: '\#FC979D', rgb: '252, 151, 157' },
        { colorName: 'Red 40', hex: '\#FA5760', rgb: '250, 87, 96' },
        { colorName: 'Red 50', hex: '\#F91F2B', rgb: '249, 31, 43' },
        { colorName: 'Red 60', hex: '\#CC0812', rgb: '204, 8, 18' },
        { colorName: 'Red 70', hex: '\#9C1017', rgb: '156, 16, 23' },
      ]
    },
    {
      title: 'Orange',
      colorItems: [
        { colorName: 'Orange 10', hex: '\#FFEDDD', rgb: '255, 237, 221' },
        { colorName: 'Orange 20', hex: '\#FFD0A6', rgb: '255, 208, 166' },
        { colorName: 'Orange 30', hex: '\#FFAD63', rgb: '255, 173, 99' },
        { colorName: 'Orange 40', hex: '\#FF9133', rgb: '255, 145, 51' },
        { colorName: 'Orange 50', hex: '\#F57F17', rgb: '245, 127, 23' },
        { colorName: 'Orange 60', hex: '\#DB6A04', rgb: '219, 106, 4' },
        { colorName: 'Orange 70', hex: '\#B85906', rgb: '184, 89, 6' },
      ]
    },
    {
      title: 'Green',
      colorItems: [
        { colorName: 'Green 10', hex: '\#E8F5E9', rgb: '232, 245, 233' },
        { colorName: 'Green 20', hex: '\#C2E5C4', rgb: '194, 229, 196' },
        { colorName: 'Green 30', hex: '\#ABD6AD', rgb: '171, 214, 173' },
        { colorName: 'Green 40', hex: '\#84CC88', rgb: '132, 204, 136' },
        { colorName: 'Green 50', hex: '\#66BB6A', rgb: '102, 187, 106' },
        { colorName: 'Green 60', hex: '\#4CA650', rgb: '76, 166, 80' },
        { colorName: 'Green 70', hex: '\#38823C', rgb: '56, 130, 60' },
      ]
    },
    {
      title: 'Blue',
      colorItems: [
        { colorName: 'Blue 10', hex: '\#E4F3F8', rgb: '228, 243, 248' },
        { colorName: 'Blue 20', hex: '\#C9EBF7', rgb: '201, 235, 247' },
        { colorName: 'Blue 30', hex: '\#B0DBEB', rgb: '176, 219, 235' },
        { colorName: 'Blue 40', hex: '\#8EC9DE', rgb: '142, 201, 222' },
        { colorName: 'Blue 50', hex: '\#6BB0C9', rgb: '107, 176, 201' },
        { colorName: 'Blue 60', hex: '\#408EAA', rgb: '64, 142, 170' },
        { colorName: 'Blue 70', hex: '\#286E87', rgb: '40, 110, 135' },
      ]
    },
    {
      title: 'Grey',
      colorItems: [
        { colorName: 'Grey 10', hex: '\#F5F5FA', rgb: '245, 245, 250' },
        { colorName: 'Grey 20', hex: '\#E1E1E8', rgb: '225, 225, 232' },
        { colorName: 'Grey 30', hex: '\#D0D0D9', rgb: '208, 208, 217' },
        { colorName: 'Grey 40', hex: '\#B6B6BF', rgb: '182, 182, 191' },
        { colorName: 'Grey 50', hex: '\#93939E', rgb: '147, 147, 158' },
        { colorName: 'Grey 60', hex: '\#6D6D7A', rgb: '109, 109, 122' },
        { colorName: 'Grey 70', hex: '\#4D4D5C', rgb: '77, 77, 92' },
        { colorName: 'Grey 80', hex: '\#2C2C3B', rgb: '44, 44, 59' },
        { colorName: 'Grey 90', hex: '\#10101F', rgb: '16, 16, 31' },
        { colorName: 'Grey 100', hex: '\#00000D', rgb: '0, 0, 13' },
      ]
    },
    {
      title: 'Other',
      colorItems: [
        { colorName: this.colorNameDarkGradient, gradient: true, gradientFrom: 'Grey 70', gradientTo: 'Grey 100' },
        { colorName: this.colorNameLightGradient, gradient: true, gradientFrom: 'Grey 10', gradientTo: 'Grey 20' },
        { colorName: 'Mobile active color', hex: '\#4476D2', rgb: '68 118 210' },
        { colorName: this.colorNameWhite, hex: '\#FFFFFF', rgb: '255 255 255' },
      ]
    }
  ];

  constructor(private _clipboardService: ClipboardService) {
  }

  copyColor(text: string): void {
    const confirmMessage = document.createElement('div');

    this._clipboardService.copyFromContent(text);

    confirmMessage.innerText = 'Колір скопійований';
    confirmMessage.classList.add('copy-color-popup');
    confirmMessage.classList.add('p2');
    document.body.appendChild(confirmMessage);

    setTimeout(() => {
      document.body.removeChild(confirmMessage);
    }, 5000);
  }
}
