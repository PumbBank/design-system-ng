import { radios, withKnobs } from '@storybook/addon-knobs';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipOverviewComponent } from './examples/tooltip-overview.component';

export default {
  title: 'Компоненти/Tooltips',
  parameters: {
    options: {showPanel: true},
    layout: 'fullscreen',
  },
  decorators: [withKnobs]
};

export const component = () => ({
  moduleMetadata: {
    declarations: [
      TooltipDirective,
      TooltipOverviewComponent
    ]
  },
  props: {
    flow: radios('Tooltip flow position', {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right'
    }, 'up')
  },
  template: `<tooltip-overview [flow]="flow"></tooltip-overview>`
});

