import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { checkboxWithValueAccessor } from './stories/checkbox-value-accessor';
import { checkboxLoad } from './stories/checkobx-load';

const checkboxStories = storiesOf('Checkbox', module);
checkboxStories.addDecorator(withKnobs);

checkboxStories.add('regular checkbox', () => ({
  moduleMetadata: {
    declarations: [
      CheckboxComponent
    ]
  },
  props: {
    onChange: action('Change fired!'),
    onIndeterminateChange: action('Indeterminate change fired!'),
    label: text('List label name', 'Checkbox List'),
    hideLabel: boolean('Hide labels', false),
  },
  template: `
    <fieldset class="fieldset">
			<legend class="label">{{label}}</legend>
			<checkbox
				checked="true"
				[hideLabel]="hideLabel"
				(changeEventEmitter)="onChange($event)">
				Checkbox
			</checkbox>
			<checkbox
				indeterminate="true"
				(changeEventEmitter)="onChange($event)"
				[hideLabel]="hideLabel"
				(indeterminateChange)="onIndeterminateChange($event)">
				Indeterminate checkbox
			</checkbox>
			<checkbox
				disabled="true"
				(changeEventEmitter)="onChange($event)"
				[hideLabel]="hideLabel"
				(indeterminateChange)="onIndeterminateChange($event)">
				Disabled checkbox
			</checkbox>
		</fieldset>
  `
}));


checkboxStories.add('Checkbox value accessor', checkboxWithValueAccessor);
checkboxStories.add('Checkbox load', checkboxLoad);