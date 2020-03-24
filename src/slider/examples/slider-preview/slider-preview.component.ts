import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slider-preview',
  templateUrl: './slider-preview.component.html',
  styleUrls: ['./slider-preview.component.scss']
})
export class SliderPreview implements OnInit {

  @Input() public minValue: number;
  @Input() public maxValue: number;
  @Input() public disable: boolean;

  public types = ['basic', 'double', 'step'];

  constructor() { }

  ngOnInit() {
  }

}
