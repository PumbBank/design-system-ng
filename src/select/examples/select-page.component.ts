import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-overview',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss', '../../assets/styles/overview.scss']
})
export class SelectOverviewComponent {
  @Input() label: string;

  invalid =  new FormControl('', Validators.required);
  valid =  new FormControl('');

  ngOnInit() {
    this.invalid.markAsTouched();
    this.valid.markAsTouched();
  }
}
