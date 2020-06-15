import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'switcher-circle',
  templateUrl: './switcher-circle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitcherCircleComponent implements OnInit {

  /** Reference to the switcher circle */
  @ViewChild('switcherCircle', {static: true})
  private _switcherCircle: ElementRef;
  /** Active state */
  @Input() public active: boolean;
  /** Output event (mousedown or touchstart) */
  @Output() public eventOutput: EventEmitter<object> = new EventEmitter<object>();
  /** Output circle width */
  @Output() public circleWidth: EventEmitter<number> = new EventEmitter<number>(true);

  ngOnInit(): void {
    this.circleWidth.emit(this._switcherCircle.nativeElement.getBoundingClientRect().width);
  }

  /** Event listeners */
  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  public onEvent(event: any): void {
    this.eventOutput.emit({event});
  }

}
