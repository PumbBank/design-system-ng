import { ButtonVariety } from './button-variety';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ButtonSize, ButtonView } from '../../models/button-parameters.model';


enum iconColor {
  primary = 'primary',
  grey = 'grey'
}

@Component({
  selector: 'mill-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterViewInit, OnChanges {

  @Input() variety: ButtonVariety = ButtonVariety.BASIC;

  /* START: HTML attributes: */
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() form: string;
  @Input() size: ButtonSize = ButtonSize.medium;
  @Input() view: ButtonView = ButtonView.filled;
  @Input() iconColor: iconColor = iconColor.primary;
  @Input() disabled: boolean;
  @Input() autofocus: boolean;
  /* END: HTML attributes: */

  @Input() icon: string;

  @ViewChild('content', { static: false }) content: ElementRef;

  varietyClass: string = '';

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

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
    this._cdr.markForCheck();
  }

  private getViewClass(view: ButtonView | string): string {
    let viewClass = 'button_filled';
    switch (view) {
      case ButtonView.filled:
        viewClass = 'button_filled';
        break;
      case ButtonView.ghost:
        viewClass = 'button_ghost';
        break;
      case ButtonView.hidden:
        viewClass = 'button_hidden';
        break;
    }
    return viewClass;
  }

  private getSizeClass(size: ButtonSize | string): string {
    let viewClass = 'button_medium';
    switch (size) {
      case ButtonSize.small:
        viewClass = 'button_small';
        break;
      case ButtonSize.medium:
        viewClass = 'button_medium';
        break;
      case ButtonSize.large:
        viewClass = 'button_large';
        break;
    }
    return viewClass;
  }
}
