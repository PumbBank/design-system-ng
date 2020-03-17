import { storiesOf } from '@storybook/angular';
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { BadgeModule } from './badge.module';


const badgeStories = storiesOf('Badges', module);
badgeStories.addDecorator(withKnobs);

badgeStories.add('Badges', () => ({
	moduleMetadata: {
		imports: [BadgeModule]
	},
	props: {
		disable: boolean('disabled', false),
	},
	template: `
		 <div style="display:grid; grid-gap: 24px; grid-template-columns: 100px 100px 100px">
         <div style="display: grid; grid-gap: 12px">
            <mill-badge>Text label</mill-badge>
            <mill-badge [color]="'red'">Text label</mill-badge>
            <mill-badge [color]="'black'">Text label</mill-badge>
            <mill-badge [color]="'blue'" [icon]="'warning'">Text label</mill-badge>
            <mill-badge [color]="'orange'" [icon]="'warning'">Text label</mill-badge>
            <mill-badge [color]="'grey'">Text label</mill-badge>
         </div>
         <div style="display: grid; grid-gap: 12px">
            <mill-badge [type]="'filled'">Text label</mill-badge>
            <mill-badge [color]="'red'" [type]="'filled'">Text label</mill-badge>
            <mill-badge [color]="'black'" [type]="'filled'">Text label</mill-badge>
            <mill-badge [color]="'blue'" [type]="'filled'">Text label</mill-badge>
            <mill-badge [color]="'orange'" [type]="'filled'">Text label</mill-badge>
            <mill-badge [color]="'grey'" [type]="'filled'">Text label</mill-badge>
         </div>
         <div style="display: grid; grid-gap: 12px">
            <mill-badge [type]="'minimal'">Text label</mill-badge>
            <mill-badge [color]="'red'" [type]="'minimal'">Text label</mill-badge>
            <mill-badge [color]="'black'" [type]="'minimal'">Text label</mill-badge>
            <mill-badge [color]="'blue'" [type]="'minimal'">Text label</mill-badge>
            <mill-badge [color]="'orange'" [type]="'minimal'">Text label</mill-badge>
            <mill-badge [color]="'grey'" [type]="'minimal'">Text label</mill-badge>
         </div>
    </div>
  `
}));
