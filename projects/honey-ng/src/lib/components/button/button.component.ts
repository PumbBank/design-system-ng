import { ButtonVariety } from './button-variety';
import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fuui-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnChanges {
  @Input() variety: ButtonVariety = ButtonVariety.BASIC;

  /* START: HTML attributes: */
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() form: string;
  @Input() disabled: boolean = false;
  @Input() autofocus: boolean = false;
  /* END: HTML attributes: */

  @ViewChild('content') content: ElementRef;

  varietyClass: string;

  get showText(): boolean {
    return this.content && !!this.content.nativeElement.innerText.trim();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.variety) {
      this.onVarietyChange();
    }
  }

  private onVarietyChange(): void {
    switch (this.variety) {
      case ButtonVariety.CONTAINED:
        this.varietyClass = 'fuui-button_contained';
        break;
    }
  }
}
