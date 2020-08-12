import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mill-radio-overview',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss', '../../assets/styles/overview.scss']
})

export class RadioOverviewComponent implements OnInit{
  
  @Input() label: string;
  @Input() hideLabel: boolean;

  oneGroup: string = 'oneGroup';

  radioControl: FormControl = new FormControl('');
  
  ngOnInit(): void {
    // this.radioControl.valueChanges.subscribe((val) => console.log(val));
  }

  test(event) {
    console.log(event);
    
  }
}
