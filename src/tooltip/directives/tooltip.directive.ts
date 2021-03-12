import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[millTooltip]'
})
export class TooltipDirective implements OnChanges {
  @Input() tooltipFlow: string;

  @HostBinding('class')
  private _class = 'tooltip';

  constructor(private _hostElement: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.tooltipFlow?.currentValue) {
      this._hostElement.nativeElement.setAttribute('flow', this.tooltipFlow);
    }
  }

}
