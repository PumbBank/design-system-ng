import { ButtonVariety } from './button-variety';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fuui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variety: ButtonVariety = ButtonVariety.BASIC;


  @ViewChild('content') content: ElementRef;

  get varietyClass(): string {
    switch (this.variety) {
      case ButtonVariety.BASIC:
        return '';
      case ButtonVariety.CONTAINED:
        return 'fuui-button_contained';
    }
  }

  get showText(): boolean {
    return this.content && !!this.content.nativeElement.innerText.trim();
  }
}
