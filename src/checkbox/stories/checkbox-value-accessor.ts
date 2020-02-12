import { boolean } from '@storybook/addon-knobs/angular';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../checkbox.module';

export const checkboxWithValueAccessor = () => ({
  moduleMetadata: {
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      CheckboxModule
    ]
  },
  props: {
    hideLabel: boolean('Hide labels', false),
    control: new FormControl(true)
  },
  template: `
    <h3> ngForm </h3>
    <form ngForm #form=ngForm>
      <checkbox ngModel name="cb">Checkbox</checkbox>
    </form>

    <pre>{{ form.value | json }} </pre>

    <h3>formControl</h3>
    <checkbox [formControl]="control">Checkbox</checkbox>
    <div>control value: {{ control.value }}</div>
    <button (click)="control.setValue(true)">Set "true" to control</button>
    <button (click)="control.setValue(false)">Set "false" to control</button>
  `
});
