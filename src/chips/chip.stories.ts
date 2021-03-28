import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { IconsModule } from '../icons/icons.module';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { ChipClearComponent } from './components/chip-clear/chip-clear.component';
import { ChipRemoveDirective } from './directives/chip-remove.directive';
import { ChipComponent } from './components/chip/chip.component';
import { ChipOverviewComponent } from './examples/chip-page.component';

export default {
  title: 'Компоненти/Chips',
  parameters: {
    options: {showPanel: true},
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      ChipComponent,
      ChipOverviewComponent,
      ChipListComponent,
      ChipClearComponent,
      ChipRemoveDirective
    ],
    imports: [
      IconsModule
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('Content', 'Дата'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `<mill-chip-overview [label]="label"></mill-chip-overview>`
});

