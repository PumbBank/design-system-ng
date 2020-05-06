import { configure, addParameters } from '@storybook/angular';
import fuibTheme from './fuib.theme';

addParameters({
  options: {
    theme: fuibTheme,
    hierarchySeparator: /[\/.]/,
    hierarchyRootSeparator: /\|/,
  }
});

// automatically import all files ending in *.stories.ts
configure(require.context('../src/', true, /\.stories\.ts$/), module);
