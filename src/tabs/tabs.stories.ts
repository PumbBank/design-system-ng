import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { TabsModule } from './tabs.module';


const tabsStories = storiesOf('Tabs', module);
tabsStories.addDecorator(withKnobs);

tabsStories.add('Tabs', () => ({
	moduleMetadata: {
		imports: [TabsModule]
	},
	props: {
		disable: boolean('disabled?', false),
		fullWidth: boolean('full width?', false),
		animationDuration: text('animation duration', '500ms'),
	},
	template: `
		<mill-tabs [isDisabled]="disable" [isFullWidth]="fullWidth" [animationDuration]="animationDuration">
			<mill-tab label="Label">content</mill-tab>
			<mill-tab label="Label 2">content 2</mill-tab>
			<mill-tab label="Large Label Here" [isSelected]="true">content 3</mill-tab>
			<mill-tab label="Mega Large Label Here">
				<mill-tabs [isDisabled]="disable" [isFullWidth]="fullWidth" [type]="'ios'">
					<mill-tab label="Ios child tabs">content 234</mill-tab>
					<mill-tab label="Ios child tabs 2">content 2343252352</mill-tab>
					<mill-tab label="Ios child tabs 3">content new</mill-tab>
					<mill-tab label="Super Large child Ios Tab">content new</mill-tab>
				</mill-tabs>
			</mill-tab>	
		</mill-tabs>
		
		<mill-tabs [isDisabled]="disable" [isFullWidth]="fullWidth" [type]="'ios'" [animationDuration]="animationDuration">
			<mill-tab label="Ios tabs">content 234</mill-tab>
			<mill-tab label="Ios tabs 2">content 2343252352</mill-tab>
			<mill-tab label="Ios tabs 3">content new</mill-tab>
			<mill-tab label="Super Large Ios Tab">
				<mill-tabs [isDisabled]="disable" [isFullWidth]="fullWidth">
					<mill-tab label="Ios child tabs">content 234</mill-tab>
					<mill-tab label="Ios child tabs 2">content 2343252352</mill-tab>
					<mill-tab label="Ios child tabs 3">content new</mill-tab>
					<mill-tab label="Super Large child Ios Tab">content new</mill-tab>
				</mill-tabs>
			</mill-tab>
		</mill-tabs>
    `
}));
