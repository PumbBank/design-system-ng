import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener, OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterInputComponent implements OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();

  public active: boolean;
  public filled: boolean;
  public inputValue: FormControl = new FormControl();

  @Output() public value: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('class.table-filter') cssTableFilter: boolean = true;

  constructor(private _elementRef: ElementRef, private _cd: ChangeDetectorRef) {
    this.inputValue.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe(value => {
        this.value.emit(value);
        this.filled = !!value;
      });
  }

  @HostBinding('class.table-filter_active')
  get activeClass(): boolean {
    return this.active;
  }

  @HostBinding('class.table-filter_filled')
  get activeFilled(): boolean {
    return this.filled;
  }

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.active = false;
    }
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onFocus(): void {
    this.active = true;
    this._cd.detectChanges();
  }

  public clearInput(): void {
    this.inputValue.setValue(null);
  }
}
