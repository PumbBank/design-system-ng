import {  text } from '@storybook/addon-knobs';
import { SelectModule } from '../select.module';

export const DEFAULT_SELECT = () => ({
  moduleMetadata: {
    imports: [SelectModule]
  },
  props: {
    caption: text('caption', 'Select'),
    placeholder: text('placeholder', 'Placeholder')
  },
  template: `
    <mill-select [caption]="caption" [placeholder]="placeholder">
      <span millSelectOption key="1" value="Option 1"></span>
      <span millSelectOption key="2" value="Option 2"></span>
    </mill-select>
    `
});
