import { boolean } from '@storybook/addon-knobs/angular';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../checkbox.module';

export const checkboxLoad = () => ({
  moduleMetadata: {
    imports: [
      CommonModule,
      CheckboxModule
    ]
  },
  props: {
    hideLabel: boolean('Hide labels', false),
    control: new FormControl(true),
    testArray: new Array(900).fill(null),
    trackByFn: (index) => index
  },
  template: `
    <ng-container *ngFor="let i of testArray; index as il trackBy: trackByFn">
      <checkbox #cb>Checkbox {{i}}</checkbox> {{ cb.checked }}
    </ng-container>
  `
});
