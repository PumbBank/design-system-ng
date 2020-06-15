import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-overview',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss', '../../assets/styles/overview.scss']
})
export class SelectOverviewComponent implements OnInit {
  @Input() label: string;

  invalid: FormControl =  new FormControl('', Validators.required);
  valid: FormControl =  new FormControl('');

  ngOnInit(): void {
    this.invalid.markAsTouched();
    this.valid.markAsTouched();
  }
}
