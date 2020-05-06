import { create } from '@storybook/theming';

export default create({
  base: 'light',
  // Storybook-specific color palette
  colorPrimary: '#ff4785',
  // coral
  colorSecondary: '#41494f',
  // ocean

  // UI
  appBg: '#2c2c3b',
  appContentBg: '#ffffff',
  appBorderColor: '#e1e1e8',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Gilroy", sans-serif',
  fontCode: 'monospace',
  fontSize: 14,

  // Text colors
  textColor: '#b6b6bf',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#93939e',
  barSelectedColor: '#4d4d5c',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#ff9900',
  inputTextColor: '#000000',
  inputBorderRadius: 0,

  brandTitle: 'FUIB Design System',
  brandUrl: '/',
  brandImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 48"%3E%3Cpath d="M48.66,42A6.63,6.63,0,0,1,42,48.66H0v-42A6.62,6.62,0,0,1,6.62,0h42Z" style="fill: %23f91f2b"/%3E%3Cpath d="M7,36.85V29.52a2.69,2.69,0,0,1,2.68-2.69v1.58a2.29,2.29,0,0,1,2.21-1.12,2.6,2.6,0,0,1,2.47,1.23,2.75,2.75,0,0,1,2.52-1.23,3.33,3.33,0,0,1,2.57,1.06,3.9,3.9,0,0,1,1,2.79v3a2.68,2.68,0,0,1-2.68,2.68V31.38a1.38,1.38,0,0,0-1.45-1.52c-.73,0-1.23.65-1.23,1.75v2.56a2.68,2.68,0,0,1-2.69,2.68V31.38c0-.95-.28-1.52-1.16-1.52s-1.52.65-1.52,1.75v2.56A2.68,2.68,0,0,1,7,36.85Zm37.89-11L43,27.67a4.29,4.29,0,0,1-6.07,0l-.45-.45v7a2.68,2.68,0,0,1-2.68,2.68V24.54l-1.26-1.26-1.42,1.43v9.46a2.68,2.68,0,0,1-2.69,2.68V27.39l-2.68,2.69v4.09a2.68,2.68,0,0,1-2.68,2.68V28.6a4.27,4.27,0,0,1,.2-5.82l4.38-4.39L20.24,11,22.1,9.12a4.29,4.29,0,0,1,6.07,0l4.38,4.38L40,6.08l1.85,1.86a4.29,4.29,0,0,1,0,6.07l-4.39,4.38ZM27.75,18.39,29.33,20l1.58-1.59-1.58-1.58Zm6.39-3.22-1.59-1.58L31,15.17l1.58,1.58ZM31,21.62l1.58,1.58,1.59-1.58L32.55,20Zm6.39-3.23-1.58-1.58L34.2,18.39,35.78,20ZM35.8,13.55l1.6,1.6,2.79-2.79a2,2,0,0,0,0-2.78L40,9.37ZM23.53,11l4.18,4.18,1.6-1.6-2.79-2.79a2,2,0,0,0-2.78,0Zm1.39,16.24.21.21,4.18-4.18-1.6-1.6-2.79,2.78A2,2,0,0,0,24.92,27.21Zm16.66-1.39L37.4,21.64l-1.6,1.6L38.58,26a2,2,0,0,0,2.79,0ZM7,42.22H33.81a2.68,2.68,0,0,0,2.68-2.69H9.66A2.69,2.69,0,0,0,7,42.22Z" style="fill: %23fff"/%3E%3Cpath d="M58.14,12.39a2.74,2.74,0,0,0,2.31,1,3.2,3.2,0,0,0,2.45-1.09,3.77,3.77,0,0,0,1-2.69A3.74,3.74,0,0,0,62.9,7a3.21,3.21,0,0,0-2.45-1.1,2.74,2.74,0,0,0-2.31,1V6.08H56.3v10h1.84Zm.56-4.18a2,2,0,0,1,2.82,0,1.9,1.9,0,0,1,.57,1.44,1.94,1.94,0,0,1-.57,1.46,2.06,2.06,0,0,1-2.82,0,2,2,0,0,1-.56-1.46A1.93,1.93,0,0,1,58.7,8.21Zm7.17,4.43a3,3,0,0,1-.75-2.17V6.08H67v4.16a1.32,1.32,0,0,0,1.41,1.47c.95,0,1.57-.58,1.57-1.77V6.08h1.84v7.15H69.94v-.8a2.38,2.38,0,0,1-2.13,1A2.58,2.58,0,0,1,65.87,12.64Zm9.43.59H73.46V6.08H75.3v.76a2.2,2.2,0,0,1,2-1,2.11,2.11,0,0,1,1.94,1,2.39,2.39,0,0,1,2.12-1,2.66,2.66,0,0,1,2.7,3v4.4H82.21V9c0-.85-.44-1.35-1.2-1.35s-1.33.57-1.33,1.61v4H77.84V9c0-.85-.44-1.35-1.2-1.35s-1.34.57-1.34,1.61Zm12.15-.84a2.74,2.74,0,0,0,2.31,1,3.22,3.22,0,0,0,2.46-1.09,3.8,3.8,0,0,0,1-2.69,3.77,3.77,0,0,0-1-2.67,3.23,3.23,0,0,0-2.46-1.1,2.74,2.74,0,0,0-2.31,1V3.22H85.61v10h1.84ZM88,8.21a2,2,0,0,1,2.82,0,1.9,1.9,0,0,1,.57,1.44,1.94,1.94,0,0,1-.57,1.46,2.06,2.06,0,0,1-2.82,0,2,2,0,0,1-.56-1.46A2,2,0,0,1,88,8.21ZM63.55,27.72v-10H61.71v3.71a2.75,2.75,0,0,0-2.32-1.05,3.26,3.26,0,0,0-2.46,1.1,4,4,0,0,0,0,5.36,3.25,3.25,0,0,0,2.46,1.09,2.77,2.77,0,0,0,2.32-1v.84Zm-2.4-2.12a1.88,1.88,0,0,1-1.41.56,2,2,0,0,1-1.43-.56,2,2,0,0,1-.56-1.45,1.93,1.93,0,0,1,2-2,1.88,1.88,0,0,1,1.41.57,2,2,0,0,1,.56,1.45A2,2,0,0,1,61.15,25.6Zm7.62,2.32a3.53,3.53,0,0,0,3.11-1.53l-1.49-.86a1.86,1.86,0,0,1-1.59.72,1.83,1.83,0,0,1-2-1.35h5.38a4,4,0,0,0,.07-.75,3.77,3.77,0,0,0-1-2.69,3.36,3.36,0,0,0-2.59-1.09,3.61,3.61,0,0,0-2.71,1.09,4,4,0,0,0,0,5.39A3.83,3.83,0,0,0,68.77,27.92ZM68.62,22a1.72,1.72,0,0,1,1.77,1.44H66.76A1.77,1.77,0,0,1,68.62,22Zm8.12,3.6c0-.38-.58-.6-1.3-.78-1.06-.27-2.39-.72-2.39-2.2A2,2,0,0,1,73.82,21a3.25,3.25,0,0,1,4.66.9l-1.57.86A1.18,1.18,0,0,0,75.76,22c-.47,0-.82.22-.82.58s.57.6,1.3.79c1,.21,2.39.71,2.38,2.24a2,2,0,0,1-.83,1.71,3.49,3.49,0,0,1-2,.58,3,3,0,0,1-3-1.7l1.6-.9a1.34,1.34,0,0,0,1.4.93C76.41,26.25,76.74,26.05,76.74,25.63Zm5.12-7a1.15,1.15,0,0,1-1.15,1.13,1.13,1.13,0,0,1-1.12-1.13,1.15,1.15,0,0,1,1.12-1.14A1.16,1.16,0,0,1,81.86,18.58Zm-2.06,2h1.84v7.15H79.8Zm7.12,8.57a2,2,0,0,1-1.87-1l-1.57.9a3.63,3.63,0,0,0,3.38,1.74,4,4,0,0,0,2.63-.87,3.06,3.06,0,0,0,1.1-2.53V20.57h-1.8v.89a2.67,2.67,0,0,0-2.28-1.09A3.39,3.39,0,0,0,84,21.44a3.82,3.82,0,0,0,0,5.19,3.36,3.36,0,0,0,2.54,1.06,2.66,2.66,0,0,0,2.28-1.08v.77A1.66,1.66,0,0,1,86.92,29.14ZM86.79,26a1.9,1.9,0,0,1-2-2,1.82,1.82,0,0,1,.55-1.38,2,2,0,0,1,1.44-.56,1.89,1.89,0,0,1,1.43.56A1.8,1.8,0,0,1,88.79,24,1.91,1.91,0,0,1,86.79,26Zm7.31-5.42v.8a2.35,2.35,0,0,1,2.12-1,2.53,2.53,0,0,1,1.93.79,3,3,0,0,1,.77,2.17v4.39H97.08V23.56a1.32,1.32,0,0,0-1.41-1.47c-1,0-1.57.58-1.57,1.77v3.86H92.26V20.57ZM61.68,40.13a2,2,0,0,1-.83,1.7,3.49,3.49,0,0,1-2,.58,3,3,0,0,1-3-1.7l1.6-.9a1.33,1.33,0,0,0,1.4.93c.66,0,1-.2,1-.61s-.57-.6-1.29-.79c-1.06-.27-2.39-.72-2.39-2.2a2,2,0,0,1,.77-1.66,3.24,3.24,0,0,1,4.65.9L60,37.24a1.18,1.18,0,0,0-1.15-.73c-.47,0-.82.23-.82.58s.57.6,1.29.79C60.34,38.1,61.69,38.6,61.68,40.13Zm7.51-5.07-2.6,7.15c-.74,2.06-1.94,3-3.76,2.86V43.36A1.74,1.74,0,0,0,64.69,42l-2.92-6.92h2l1.86,4.81,1.58-4.81ZM75,40.13a2,2,0,0,1-.83,1.7,3.49,3.49,0,0,1-2,.58,3,3,0,0,1-3-1.7l1.6-.9a1.32,1.32,0,0,0,1.4.93c.65,0,1-.2,1-.61s-.57-.6-1.3-.79c-1-.27-2.38-.72-2.38-2.2a2,2,0,0,1,.77-1.66,3.24,3.24,0,0,1,4.65.9l-1.57.86a1.16,1.16,0,0,0-1.14-.73c-.47,0-.82.23-.82.58s.57.6,1.29.79C73.65,38.1,75,38.6,75,40.13Zm3.44-5.07h1.61v1.78H78.44v3c0,.77.55.79,1.61.73v1.67c-2.52.29-3.45-.44-3.45-2.4v-3H75.36V35.06H76.6V33.62l1.84-.56Zm6.08-.2A3.59,3.59,0,0,0,81.81,36a3.72,3.72,0,0,0-1.06,2.69,3.66,3.66,0,0,0,1.07,2.7,3.82,3.82,0,0,0,2.84,1.07,3.53,3.53,0,0,0,3.11-1.53L86.29,40a1.9,1.9,0,0,1-1.6.71,1.81,1.81,0,0,1-2-1.34h5.38a5.37,5.37,0,0,0,.07-.76,3.75,3.75,0,0,0-1-2.69A3.36,3.36,0,0,0,84.52,34.86ZM82.65,38a1.79,1.79,0,0,1,1.87-1.45A1.72,1.72,0,0,1,86.29,38ZM100,37.81v4.4H98.16V37.94c0-.86-.44-1.36-1.2-1.36s-1.33.57-1.33,1.62v4H93.79V37.94c0-.86-.44-1.36-1.19-1.36s-1.35.57-1.35,1.62v4H89.41V35.06h1.84v.76a2.23,2.23,0,0,1,2-1,2.13,2.13,0,0,1,1.94,1,2.42,2.42,0,0,1,2.12-1A2.66,2.66,0,0,1,100,37.81Z" style="fill: %23f5f5fa"/%3E%3C/svg%3E%0A'
});
