import { storiesOf } from '@storybook/angular';
import { withKnobs, number, radios, boolean } from "@storybook/addon-knobs";
import { SliderModule } from './slider.module';
import { SliderPreview } from './examples/slider-preview/slider-preview.component';

const sliderStories = storiesOf('Slider', module);
sliderStories.addDecorator(withKnobs);

sliderStories.add('slider', () => ({
	moduleMetadata: {
	  declarations: [SliderPreview],
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
	  <slider-preview [minValue]="min" [maxValue]="max" [disable]="status"></slider-preview>
    `
}));
