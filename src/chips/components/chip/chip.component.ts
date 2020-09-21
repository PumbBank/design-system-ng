import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'mill-chip',
  templateUrl: 'chip.component.html',
  styleUrls: ['./chip.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @HostBinding('class') public hostClass: string = 'mill-chip';

  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean = false;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('click', ['$event']) _click(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.click();
  }

  constructor() {
  }

  click(): void {
    if (!this.disabled) {
      this.action.emit({chip: this});
    }
  }

  public remove(): void {
    this.removed.emit({chip: this});
  }
}
