import { storiesOf } from '@storybook/angular';
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { TabsModule } from './tabs.module';


const tabsStories = storiesOf('Tabs', module);
tabsStories.addDecorator(withKnobs);

tabsStories.add('Tabs', () => ({
	moduleMetadata: {
		imports: [TabsModule]
	},
	props: {
		disable: boolean('disabled?', false),
	},
	template: `
		<div style="width: 800px">
      <mill-tabs [disabled]="disable" selected="second">
        <mill-tab label="Label" id="first">content</mill-tab>
        <mill-tab label="Label 2" id="second">content 2</mill-tab>
        <mill-tab label="Large Label Here">content 3</mill-tab>
        <mill-tab label="Mega Large Label Here">
          <mill-tabs [disabled]="disable" [type]="'ios'">
            <mill-tab label="Ios child tabs">content 234</mill-tab>
            <mill-tab label="Ios child tabs 2">content 2343252352</mill-tab>
            <mill-tab label="Ios child tabs 3">content new</mill-tab>
            <mill-tab label="Super Large child Ios Tab">content new</mill-tab>
          </mill-tabs>
        </mill-tab>	
      </mill-tabs>
      
      <mill-tabs [disabled]="disable" type="ios" selected="tab">
        <mill-tab label="Ios tabs">content 234</mill-tab>
        <mill-tab label="Ios tabs 2">content 2343252352</mill-tab>
        <mill-tab label="Ios tabs 3" id="tab">content new</mill-tab>
        <mill-tab label="Super Large Ios Tab">
          <mill-tabs [disabled]="disable">
            <mill-tab label="Ios child tabs">content 234</mill-tab>
            <mill-tab label="Ios child tabs 2">content 2343252352</mill-tab>
            <mill-tab label="Ios child tabs 3">content new</mill-tab>
            <mill-tab label="Super Large child Ios Tab">content new</mill-tab>
          </mill-tabs>
        </mill-tab>
      </mill-tabs>
      
     </div>
  `
}));
