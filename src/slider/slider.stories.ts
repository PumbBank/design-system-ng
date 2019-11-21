import { storiesOf } from '@storybook/angular';
import { withKnobs, number, radios, boolean } from "@storybook/addon-knobs";
import { SliderModule } from './slider.module';


const sliderStories = storiesOf('Slider', module);
sliderStories.addDecorator(withKnobs);

sliderStories.add('slider', () => ({
	moduleMetadata: {
		imports: [SliderModule]
	},
	props: {
		min: number('minValue', 0),
		max: number('maxValue', 100),
		startMin: number('started min value', 0),
		startMax: number('started max value', 50),
		type: radios('slider type',
			{
				Basic: 'basic',
				Double: 'double',
				Step: 'step'
			},
			'basic'),
		step: number('step', 5),
		status: boolean('disabled?', false)
	},
	template: `
		<mill-slider [minValue]="min" [maxValue]="max" [startMin]="startMin" [startMax]="startMax" [type]="type" [step]="step" [disabled]="status"></mill-slider>
    `
}));
