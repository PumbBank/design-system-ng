import { create } from '@storybook/theming';

export default create({
  base: 'light',
  // Storybook-specific color palette
  colorPrimary: '#FF4785',
  // coral
  colorSecondary: '#41494f',
  // ocean

  // UI
  appBg: '#2d2f36',
  appContentBg: '#f1f1f1',
  appBorderColor: '#eeeeee',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#c4cbcf',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: '#ffffff',
  barBg: '#eeeeee',

  // Form colors
  inputBg: 'white',
  inputBorder: '#ff9900',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'FUIB Design System',
  brandUrl: '/',
  brandImage: 'https://placehold.it/350x150',
});
