import { configure } from '@storybook/angular';

// automatically import all files ending in *.stories.ts
configure(require.context('../projects/mill-ng', true, /\.stories\.ts$/), module);
