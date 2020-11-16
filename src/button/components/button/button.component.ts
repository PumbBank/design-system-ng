import { ButtonVariety } from './button-variety';
import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

enum elementSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

enum elementView {
  filled = 'filled',
  ghost = 'ghost',
  hidden = 'hidden'
}

enum iconColor {
  primary = 'primary',
  grey = 'grey'
}

@Component({
  selector: 'mill-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent implements OnChanges {

  @Input() variety: ButtonVariety = ButtonVariety.BASIC;

  /* START: HTML attributes: */
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() form: string;
  @Input() size: elementSize = elementSize.medium;
  @Input() view: elementView = elementView.filled;
  @Input() iconColor: iconColor = iconColor.primary;
  @Input() disabled: boolean;
  @Input() autofocus: boolean;
  /* END: HTML attributes: */

  @Input() icon: string;

  @ViewChild('content', { static: false }) content: ElementRef;

  varietyClass: string;

  public get buttonOnlyIcon(): boolean {
    return !!this.icon && !(this.content && this.content.nativeElement.textContent);
  }

  get showText(): boolean {
    return this.content && !!(this.content.nativeElement && this.content.nativeElement.innerText.trim());
  }

  get viewClass(): string {
    return this.getViewClass(this.view);
  }

  get sizeClass(): string {
    return this.getSizeClass(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.variety) {
      this.onVarietyChange();
    }
  }

  private onVarietyChange(): void {
    switch (this.variety) {
      case ButtonVariety.CONTAINED:
        this.varietyClass = 'hn-button_contained';
        break;
    }
  }

  private getViewClass(view: elementView | string): string {
    let viewClass = 'button_filled';
    switch (view) {
      case elementView.filled:
        viewClass = 'button_filled';
        break;
      case elementView.ghost:
        viewClass = 'button_ghost';
        break;
      case elementView.hidden:
        viewClass = 'button_hidden';
        break;
    }
    return viewClass;
  }

  private getSizeClass(size: elementSize | string): string {
    let viewClass = 'button_medium';
    switch (size) {
      case elementSize.small:
        viewClass = 'button_small';
        break;
      case elementSize.medium:
        viewClass = 'button_medium';
        break;
      case elementSize.large:
        viewClass = 'button_large';
        break;
    }
    return viewClass;
  }
}
