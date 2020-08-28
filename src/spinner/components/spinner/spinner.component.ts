import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mill-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @HostBinding('class') public hostClass: string = 'mill-spinner';
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
