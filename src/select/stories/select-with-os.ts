import { text } from '@storybook/addon-knobs';
import { SelectModule } from '../select.module';
import { MillOptionSource } from '../option-source';
import { MillSelectOption } from '../select-option';

const optionSource: MillOptionSource = {
  get(key: string): Promise<MillSelectOption> {
    return Promise.resolve({
      key: key,
      value: `Value ${key}`
    });
  },

  search(q: string): Promise<MillSelectOption[]> {
    return Promise.resolve(new Array(10).fill(null).map(
      (v, i) => ({ key: `${q} ${i}`, value: `${q} ${i}` })
    ));
  }
}

export const OS_SELECT = () => ({
  moduleMetadata: {
    imports: [SelectModule]
  },
  props: {
    caption: text('caption', 'Select'),
    placeholder: text('placeholder', 'Placeholder'),
    optionSource: optionSource
  },
  template: `
    <mill-select [caption]="caption" [placeholder]="placeholder" [optionSource]="optionSource">
    </mill-select>
    `
});
