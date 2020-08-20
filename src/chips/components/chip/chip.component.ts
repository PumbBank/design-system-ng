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

  @Input() action(): void {}

  @HostListener('click', ['$event']) _click(event: MouseEvent): void {
    event.stopPropagation();
    this.click();
  }

  constructor() {
  }

  click(): void {
    if (!this.disabled) {
      this.action();
    }
  }

  public remove(): void {
    this.removed.emit({chip: this});
  }
}
