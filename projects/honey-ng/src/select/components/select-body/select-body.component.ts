import { Component, OnInit, HostListener, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { SelectOptionComponent } from '../select-option/select-option.component';

const KEY_CODE_ARROW_UP = 38;
const KEY_CODE_ARROW_DOWN = 40;
const KEY_CODE_ENTER = 13;

@Component({
  selector: 'hn-select-body',
  templateUrl: './select-body.component.html',
  styleUrls: ['./select-body.component.scss']
})
export class SelectBodyComponent implements OnInit {
  private currentFocused = -1;

  get active(): boolean {
    return this.selectComponent.active;
  }

  @ContentChildren(SelectOptionComponent) optionsElements: QueryList<SelectOptionComponent>;

  constructor(
    private selectComponent: SelectComponent
  ) { }

  ngOnInit() {
    // window.addEventListener('keydown', this.onkeyup);
  }

  @HostListener('window:keydown', ['$event'])
  onkeyup(e: KeyboardEvent) {
    if (
      this.active &&
      [KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN, KEY_CODE_ENTER].includes(e.keyCode)
    ) {
      e.preventDefault();
      e.stopPropagation();

      if (e.keyCode === KEY_CODE_ENTER) {
        if ((this.optionsElements as any)._results[this.currentFocused]) {
          (this.optionsElements as any)._results[this.currentFocused].emitSelection();
        }
        return;
      }

      if ((this.optionsElements as any)._results[this.currentFocused]) {
        if ((this.optionsElements as any)._results[this.currentFocused].focused) {
          (this.optionsElements as any)._results[this.currentFocused].markAsUnfocused();
        } else {
          (this.optionsElements as any)._results.forEach((c: SelectOptionComponent) => {
            c.markAsUnfocused();
          });
        }
      }

      let nextFocused = this.currentFocused + (e.keyCode === KEY_CODE_ARROW_UP ? -1 : 1);

      if (nextFocused < 0) { nextFocused = this.optionsElements.length - 1; }
      if (nextFocused > this.optionsElements.length - 1) { nextFocused = 0; }

      if ((this.optionsElements as any)._results[nextFocused]) {
        (this.optionsElements as any)._results[nextFocused].markAsFocused();
        this.currentFocused = nextFocused;
      } else {


        this.currentFocused = -1;
      }

      return false;
    }
  }
}
