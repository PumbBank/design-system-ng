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
  brandImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.66 96"%3E%5Cn %3Cpath d="M48.2,0A48,48,0,1,1,0,48,48.14,48.14,0,0,1,48.2,0" style="fill: %23d13239"/%3E%5Cn %3Cpath d="M84.7,31.2h.5a4.12,4.12,0,0,1-1.7,3,8.13,8.13,0,0,1-4.2,1H77.6c-6.2-.4-7.5,6.2-6.8,11a18.46,18.46,0,0,0,3.4,8.4c1.6,1.7,4,2.8,6,1.1,1.7-1.4,2.2-4.6,2.2-6.5,0-3.3-1.2-8.4-5.3-8.4a3.86,3.86,0,0,0-3.2,1.7,7.61,7.61,0,0,0-1,4.3h-.8c-.5-4,1.4-7.3,5.6-7.4,5,0,8,4,8,9s-3.1,9.7-8.2,9.7a7.74,7.74,0,0,1-6.4-3c-1.6-1.9-2.3-5-2.3-9,0-5,.8-7.9,2.3-10.3a7.51,7.51,0,0,1,6.7-3.4h2.5a10.52,10.52,0,0,0,3.3-.1c.5-.3,1-.6,1.1-1.1M49.6,39.6l6.1,13.5,5.6-12.4.5-1.1h4.6v.6H66a1.5,1.5,0,0,0-1.3,1.4V56A1.42,1.42,0,0,0,66,57.4h.4v.5H60v-.5h.5A1.42,1.42,0,0,0,61.8,56V42.7L55,57.9h-.4L47.9,42.4V55.9a1.34,1.34,0,0,0,1.2,1.4h.5v.5H44.9v-.5h.5a1.35,1.35,0,0,0,1.3-1.4V41.6a1.31,1.31,0,0,0-1.4-1.4,2.89,2.89,0,0,0-2.2,1.9L36.7,56.3a2.53,2.53,0,0,1-2.5,1.6H32.7L32.4,56a12.83,12.83,0,0,0,1.4.9,1.09,1.09,0,0,0,1.6-.7l.8-1.8-5.8-12c-.7-1.3-1.2-1.9-2.1-2.1v-.6h5.8v.6h-.5c-.5,0-.7.7-.3,1.4l4.4,9.4L41.8,42c.5-.9.1-1.6-.6-1.7v-.7ZM23,51.9v-11H14.8V56A1.34,1.34,0,0,0,16,57.4h.5v.5H10.1v-.5h.5A1.35,1.35,0,0,0,11.9,56V41.6a1.35,1.35,0,0,0-1.3-1.4h-.5v-.6H27.8v.6h-.5A1.42,1.42,0,0,0,26,41.6V56a1.35,1.35,0,0,0,1.3,1.4h.5v.5H21.4v-.5h.5A1.34,1.34,0,0,0,23.1,56V51.9Z" style="fill: %23fff"/%3E%5Cn %3Cpath fill="%23ffffff" d="M112,15.22h-2V.16H121V15.22H119V1.79h-7ZM123.54,10c0-3.26,1.92-5.83,5.07-5.83,3.54,0,4.47,3.11,4.47,5.1a8.16,8.16,0,0,1-.06.91h-7.6a3.47,3.47,0,0,0,3.71,3.76,7.13,7.13,0,0,0,3-.56l.34,1.41a8.85,8.85,0,0,1-3.6.67C125.53,15.45,123.54,13.26,123.54,10Zm1.9-1.23h5.74c0-1.25-.51-3.19-2.72-3.19C126.47,5.57,125.59,7.4,125.44,8.76Zm10.09-.82c0-1.39-.05-2.51-.09-3.54h1.76l.09,1.86h.05a4.24,4.24,0,0,1,3.84-2.1c2.62,0,4.59,2.21,4.59,5.5,0,3.89-2.37,5.81-4.92,5.81a3.79,3.79,0,0,1-3.33-1.7h-.05v5.88h-1.94Zm1.94,2.88a5,5,0,0,0,.09.81,3,3,0,0,0,2.95,2.3c2.08,0,3.29-1.7,3.29-4.18,0-2.17-1.14-4-3.22-4a3.13,3.13,0,0,0-3,2.44,3.12,3.12,0,0,0-.14.8ZM161.56,4.4h-1.95v9.28h-3.78V4.4h-1.92v9.28h-3.78V4.4h-1.92V15.22h13.35Zm10.65,1.81c-.09,1.75-.14,2.67-.14,4.43v4.58H174V4.4h-2.3L168.27,10c-.71,1.26-1.09,2-1.74,3.33l-.07,0c.09-1.54.11-2.61.11-4.34V4.4h-1.85V15.22H167c1.16-1.9,2.34-4,3.37-5.65.63-1.1,1.1-2,1.79-3.36Zm12.39,0c-.09,1.75-.13,2.67-.13,4.43v4.58h1.87V4.4H184L180.66,10c-.71,1.26-1.09,2-1.74,3.33l-.07,0c.09-1.54.12-2.61.12-4.34V4.4h-1.86V15.22h2.26c1.16-1.9,2.35-4,3.37-5.65.63-1.1,1.1-2,1.79-3.36Zm-3-3.44a2.7,2.7,0,0,0,3-2.77h-1.41c-.11,1-.56,1.7-1.52,1.7S180.31,1,180.24,0h-1.43A2.61,2.61,0,0,0,181.63,2.77ZM110.56,40.66a2.45,2.45,0,0,1-.71-.07l-.2,1.59a3.31,3.31,0,0,0,1.09.13,4.25,4.25,0,0,0,3.42-1.85A29.13,29.13,0,0,0,117,34.73L120.13,27h-2l-2.35,6.35c-.38,1.07-.67,1.94-.94,2.73h-.05c-.35-.9-.71-1.77-1.09-2.66l-3-6.42h-2.21l5,10.15a.9.9,0,0,1,.06.92C113,39.14,112.13,40.64,110.56,40.66Zm12.53-3.35h.38a3.52,3.52,0,0,1,3.58,2.54,13.91,13.91,0,0,0,1,2.22h2.06A22.53,22.53,0,0,1,129,39.43c-.85-2-1.9-3.11-3.65-3.29L130,31.25h-2.39l-4.07,4.69h-.47V31.25h-2V42.07h2Zm8.68-6.06h1.77l.09,1.85h0a4.24,4.24,0,0,1,3.84-2.1c2.62,0,4.59,2.21,4.59,5.5,0,3.89-2.37,5.81-4.92,5.81a3.78,3.78,0,0,1-3.33-1.7h0v5.88h-1.94V34.78C131.86,33.39,131.81,32.28,131.77,31.25Zm2,6.41a5,5,0,0,0,.09.81,3,3,0,0,0,3,2.3c2.08,0,3.29-1.7,3.29-4.18,0-2.17-1.14-4-3.22-4a3.43,3.43,0,0,0-3.11,3.24ZM144.52,32a6.71,6.71,0,0,1,3.55-1c3.31,0,4.12,2.26,4.12,4.43v4a14.74,14.74,0,0,0,.18,2.6h-1.79l-.16-1.37h-.07a4,4,0,0,1-3.3,1.61,3.08,3.08,0,0,1-3.31-3.1c0-2.62,2.32-4.05,6.5-4V35a2.23,2.23,0,0,0-2.46-2.51,5.4,5.4,0,0,0-2.81.81Zm5.77,4.59c-2.15,0-4.59.33-4.59,2.43a1.74,1.74,0,0,0,1.86,1.88,2.7,2.7,0,0,0,2.62-1.81,2.32,2.32,0,0,0,.11-.63Zm2.86-8.37a1.13,1.13,0,0,0,1.14,1.14,1.14,1.14,0,0,0,0-2.28A1.15,1.15,0,0,0,153.15,28.18Zm2.22,13.89h2V31.25h-2Zm3.08-15a1.13,1.13,0,0,0-1.14,1.14,1.11,1.11,0,0,0,1.12,1.14,1.14,1.14,0,0,0,0-2.28Zm9.19,8.57H162.5V31.25h-1.94V42.07h1.94v-4.9h5.14v4.9h2V31.25h-2Zm10.21-3a4.56,4.56,0,0,1,2.28.51l.44-1.52a6.49,6.49,0,0,0-2.72-.56A5.5,5.5,0,0,0,172,36.77a5.14,5.14,0,0,0,5.39,5.52,7.44,7.44,0,0,0,3.11-.62l-.34-1.48a5.5,5.5,0,0,1-2.41.54,3.72,3.72,0,0,1-3.76-4C174,34.42,175.36,32.59,177.85,32.59Zm7.85,9.59a26.64,26.64,0,0,1-2.91-.16V31.25h2v3.66a10.8,10.8,0,0,1,1.79-.11c2.43,0,5,.76,5,3.65a3.05,3.05,0,0,1-1.14,2.48A7.52,7.52,0,0,1,185.7,42.18Zm-1-1.48a10.37,10.37,0,0,0,1.45.09c1.48,0,3.38-.49,3.38-2.3s-2-2.28-3.42-2.28a10.09,10.09,0,0,0-1.41.11Zm11.18-3.39h.38a3.52,3.52,0,0,1,3.58,2.54,13.91,13.91,0,0,0,1,2.22h2.06a22.53,22.53,0,0,1-1.16-2.64c-.85-2-1.9-3.11-3.65-3.29l4.72-4.89h-2.39l-4.07,4.69h-.47V31.25H194V42.07h1.94Zm16.15-4.25h.07c-.09,1.74-.14,2.66-.14,4.42v4.59h1.88V31.25h-2.3l-3.38,5.59c-.71,1.25-1.09,2-1.74,3.33l-.07,0c.09-1.55.11-2.62.11-4.34V31.25h-1.85V42.07h2.25c1.17-1.9,2.35-4,3.38-5.66C210.91,35.32,211.38,34.44,212.07,33.06Zm12.39,0h.07c-.09,1.74-.14,2.66-.14,4.42v4.59h1.88V31.25H224l-3.38,5.59c-.71,1.25-1.09,2-1.74,3.33l-.07,0c.09-1.55.11-2.62.11-4.34V31.25H217V42.07h2.26c1.16-1.9,2.34-4,3.37-5.66C223.3,35.32,223.77,34.44,224.46,33.06Zm-2.9-3.44a2.71,2.71,0,0,0,3-2.78h-1.41c-.11,1-.56,1.7-1.52,1.7s-1.36-.74-1.43-1.7h-1.43A2.61,2.61,0,0,0,221.56,29.62Zm-99,26.17c0,1.87.11,4.4.22,6.5l.38,6.62h1.9l-.94-15.07h-2.48L119,61.13c-.67,1.9-1.21,3.56-1.59,5.08h-.07c-.38-1.57-.89-3.22-1.52-5.08l-2.57-7.29h-2.48l-1,15.07h1.86l.4-6.46c.13-2.26.25-4.79.29-6.66h0c.43,1.79,1,3.73,1.75,5.85l2.44,7.18h1.47l2.66-7.31c.76-2.08,1.39-4,1.9-5.72Zm6.42-2a1.2,1.2,0,0,0-1.22,1.23A1.22,1.22,0,1,0,129,53.82Zm1,4.27h-2V68.91h2Zm15.23,7.78c-.65-1.72-1.61-2.68-3.25-2.86l4.27-4.92H144l-3.58,4.72H140V58.09h-1.88v4.72h-.4l-3.58-4.72H131.9L136.2,63c-1.64.18-2.6,1.14-3.27,2.88-.38,1-.74,2.15-1.18,3h1.9a19.25,19.25,0,0,0,1-2.46c.67-1.76,1.58-2.32,3.1-2.32h.36v4.78H140V64.13h.33a3,3,0,0,1,3.09,2.3,16.43,16.43,0,0,0,1,2.48h2A25.75,25.75,0,0,1,145.21,65.87Zm10-3.42h-5.14V58.09h-1.95V68.91h1.95V64h5.14v4.9h1.94V58.09h-1.94ZM168,66.32a14.62,14.62,0,0,0,.18,2.59h-1.79l-.16-1.36h-.06a4,4,0,0,1-3.31,1.61,3.09,3.09,0,0,1-3.31-3.11c0-2.62,2.32-4,6.5-4V61.8a2.22,2.22,0,0,0-2.45-2.5,5.4,5.4,0,0,0-2.82.8l-.45-1.29a6.66,6.66,0,0,1,3.56-1c3.31,0,4.11,2.26,4.11,4.43Zm-1.9-2.93c-2.15,0-4.58.33-4.58,2.43a1.74,1.74,0,0,0,1.85,1.88A2.69,2.69,0,0,0,166,65.89a2.25,2.25,0,0,0,.11-.62Zm15.32,0c0,3.89-2.37,5.82-4.92,5.82a3.8,3.8,0,0,1-3.33-1.7h0v5.88h-2V61.62c0-1.38,0-2.5-.09-3.53h1.77l.09,1.86h0a4.27,4.27,0,0,1,3.85-2.11C179.43,57.84,181.4,60.06,181.4,63.34Zm-2,.09c0-2.17-1.14-4-3.22-4a3.13,3.13,0,0,0-3,2.44,3,3,0,0,0-.13.8v1.86a4.92,4.92,0,0,0,.08.8,3,3,0,0,0,3,2.3C178.23,67.61,179.43,65.92,179.43,63.43Zm14.25,0c0,4-2.77,5.75-5.39,5.75-2.93,0-5.19-2.15-5.19-5.57,0-3.62,2.37-5.75,5.37-5.75S193.68,60.1,193.68,63.41Zm-2,.07c0-1.84-.92-4.16-3.24-4.16s-3.34,2.15-3.34,4.2c0,2.37,1.37,4.16,3.29,4.16S191.67,65.92,191.67,63.48Zm12.73,4,1.11,0-.11,4.89h-1.54l-.09-3.44h-7.49l-.09,3.44h-1.54l-.09-4.89.92,0a9.08,9.08,0,0,0,1.07-2.22,14.4,14.4,0,0,0,.62-4.31V58.09h7.23Zm-1.93-7.85h-3.55v1.79a14.25,14.25,0,0,1-.56,4,10.23,10.23,0,0,1-.87,2h5Zm12.44,2.86h-5.14V58.09h-2V68.91h2V64h5.14v4.9h1.94V58.09h-1.94Zm8.68,1.23c-.71,1.25-1.09,2-1.74,3.33l-.07,0c.09-1.54.11-2.62.11-4.34V58.09H220V68.91h2.25c1.17-1.9,2.35-4,3.38-5.66.63-1.09,1.1-2,1.79-3.35h.07c-.09,1.74-.14,2.66-.14,4.43v4.58h1.88V58.09H227ZM237,56.46a2.7,2.7,0,0,0,3-2.77h-1.41c-.11,1-.56,1.69-1.52,1.69s-1.36-.73-1.43-1.69h-1.43A2.61,2.61,0,0,0,237,56.46Zm2.41,1.63L236,63.68c-.71,1.25-1.09,2-1.74,3.33l-.07,0c.09-1.54.11-2.62.11-4.34V58.09h-1.85V68.91h2.26c1.16-1.9,2.34-4,3.37-5.66.63-1.09,1.1-2,1.79-3.35h.07c-.09,1.74-.14,2.66-.14,4.43v4.58h1.88V58.09ZM119.71,91a4.39,4.39,0,0,1-1.26,3.26,7.62,7.62,0,0,1-5.32,1.68,22.78,22.78,0,0,1-3-.18v-15h8.45v1.63H112v4c.47-.06,1.36-.11,1.85-.11a7.19,7.19,0,0,1,3.89,1A4.15,4.15,0,0,1,119.71,91Zm-2,0a2.83,2.83,0,0,0-1.23-2.46,5.08,5.08,0,0,0-2.86-.76c-.45,0-1,0-1.54.09v6.4a8.44,8.44,0,0,0,1.63.11,4.43,4.43,0,0,0,3.18-1.16A3.13,3.13,0,0,0,117.67,91Zm12.17,2.17a15.55,15.55,0,0,0,.18,2.59h-1.79l-.16-1.36H128A4,4,0,0,1,124.7,96a3.08,3.08,0,0,1-3.31-3.11c0-2.61,2.32-4,6.51-4v-.23a2.23,2.23,0,0,0-2.46-2.5,5.32,5.32,0,0,0-2.82.81l-.45-1.3a6.74,6.74,0,0,1,3.56-1c3.31,0,4.11,2.26,4.11,4.42Zm-1.9-2.93c-2.15,0-4.58.34-4.58,2.44a1.74,1.74,0,0,0,1.85,1.88,2.7,2.7,0,0,0,2.62-1.81,2,2,0,0,0,.11-.63Zm12.12-.94h-5.14V84.93H133V95.75h1.94V90.86h5.14v4.89H142V84.93h-1.95Zm9.33.54,4.72-4.9h-2.39l-4.07,4.7h-.47v-4.7h-2V95.75h2V91h.38a3.53,3.53,0,0,1,3.58,2.55,14.16,14.16,0,0,0,1,2.21h2.06A23.2,23.2,0,0,1,153,93.12C152.19,91.17,151.14,90,149.39,89.83Z"/%3E%5Cn %3C/svg%3E'
});
