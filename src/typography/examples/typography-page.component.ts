import { Component, Input } from '@angular/core';

@Component({
  selector: 'mill-typography-overview',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss', '../../assets/styles/overview.scss']
})

export class TypographyGuideline {
  private readonly fontGilroyBold = 'Gilroy Bold';
  private readonly fontGilroyMedium = 'Gilroy Medium';
  private readonly fontGilroySemibold = 'Gilroy Semibold';
  private readonly fontRobotoMonoRegular = 'Roboto Mono Regular';

  typographyItems = [
    {
      header: 'h1',
      headerValue: 'Title H1',
      font: this.fontGilroyBold,
      size: '98',
      lineHeight: '96',
      letterSpacing: '- 1.5'
    },
    {
      header: 'h2',
      headerValue: 'Title H2',
      font: this.fontGilroyBold,
      size: '60',
      lineHeight: '72',
      letterSpacing: '- 0.5'
    },
    {
      header: 'h3',
      headerValue: 'Title H3',
      font: this.fontGilroyBold,
      size: '48',
      lineHeight: '60',
      letterSpacing: '0'
    },
    {
      header: 'h4',
      headerValue: 'Title H4',
      font: this.fontGilroyBold,
      size: '34',
      lineHeight: '36',
      letterSpacing: '0.25'
    },
    {
      header: 'h5',
      headerValue: 'Title H5',
      font: this.fontGilroyBold,
      size: '24',
      lineHeight: '32',
      letterSpacing: '0.35'
    },
    {
      header: 'h6',
      headerValue: 'Title H6',
      font: this.fontGilroyBold,
      size: '20',
      lineHeight: '24',
      letterSpacing: '0.4'
    },
    {
      header: 's1',
      headerValue: 'Subtitle S1',
      font: this.fontGilroyBold,
      size: '16',
      lineHeight: '24',
      letterSpacing: '0.18'
    },
    {
      header: 's2',
      headerValue: 'Subtitle S2',
      font: this.fontGilroyBold,
      size: '14',
      lineHeight: '20',
      letterSpacing: '0.18'
    },
    {
      header: 'p1',
      headerValue: 'Text P1',
      font: this.fontGilroyMedium,
      size: '16',
      lineHeight: '24',
      letterSpacing: '0.25'
    },
    {
      header: 'p2',
      headerValue: 'Text P2',
      font: this.fontGilroyMedium,
      size: '14',
      lineHeight: '20',
      letterSpacing: '0.25'
    },
    {
      header: 'p2 monospaced',
      headerValue: 'Text P2 Monospaced',
      font: this.fontRobotoMonoRegular,
      size: '14',
      lineHeight: '20',
      letterSpacing: '0.25'
    },
    {
      header: 'p3',
      headerValue: 'Text P3',
      font: this.fontGilroyMedium,
      size: '12',
      lineHeight: '16',
      letterSpacing: '0.25'
    },
    {
      header: 'overline',
      headerValue: 'OVERLINE',
      font: this.fontGilroySemibold,
      size: '12',
      lineHeight: '16',
      letterSpacing: '1.2',
      transform: 'Uppercase'
    }
  ];
}
