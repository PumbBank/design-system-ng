import { withKnobs, radios, boolean } from '@storybook/addon-knobs';
import { TableModule } from './table.module';
import { TableOverview } from './examples/table-overview/table-overview.component';
import { IconsModule } from '../2-icons/icons.module';

export default {
  title: 'Компоненти|Table',
  parameters: {
    options: { showPanel: true },
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [TableOverview],
    imports: [TableModule, IconsModule],
  },
  props: {
    types: radios('Type', {normal: 'normal', zebra: 'zebra' }, 'normal'),
    styles: radios('Style', {normal: 'normal', small: 'small', large: 'large', round: 'round'}, 'normal'),
    control: radios('Control Input', {none: '', checkbox: 'checkbox', radio: 'radio'}, ''),
    filter: boolean('Filter', true),
    fixed: boolean('Fixed Header', false),
    dark: boolean('Dark style Header', false),
  },
  template: `
    <table-overview [type]="types" [style]="styles" [selectInput]="control" [darkHeader]="dark" [fixedHeader]="fixed" [filter]="filter"></table-overview>
    `
});
