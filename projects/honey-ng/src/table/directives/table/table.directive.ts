import { HN_TABLE } from './../../tokens';
import { Component, Directive, ElementRef, Renderer2, forwardRef } from '@angular/core';

@Directive({
  selector: '[hnTable]',
  providers: [
    {
      provide: HN_TABLE,
      useClass: forwardRef(() => TableDirective)
    }
  ]
})
export class TableDirective {
  constructor(
    public element: ElementRef
  ) { }
}
