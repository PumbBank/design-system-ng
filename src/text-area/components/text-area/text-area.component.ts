import { Component, Input, ElementRef, ContentChild } from '@angular/core';
import { FormGroupDirective, ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HintComponent } from '../../../hint/components/hint/hint.component';

@Component({
  selector: 'mill-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  public textAreaValue$ = new BehaviorSubject('');

  @Input() caption: string = '';
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Input() value: string;
  @Input() resize: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit' = 'none';

  @ContentChild(HintComponent, {static: false}) hintComponent: HintComponent;

  get dirty(): boolean {
    return this.element.nativeElement.classList.contains('ng-dirty');
  }

  get isInvalid(): boolean {
    return this.element.nativeElement.classList.contains('ng-invalid');
  }

  get submitted(): boolean {
    return this.parentForm?.submitted || false;
  }

  constructor(private element: ElementRef,
    public parentForm: FormGroupDirective) {
  }

  onInput(event: InputEvent): void {    
    this.textAreaValue$.next((event.target as HTMLInputElement).value);
  }
}
