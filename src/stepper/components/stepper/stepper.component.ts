import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {ScrollOverflow, ScrollControlsInterface, ScrollItemInterface} from '../../../utils';

export enum StepperStateEnum {
  valid = 'valid',
  error = 'error',
  pending = 'pending'
}

export interface StepperItemInterface {
  id?: number;
  value?: string;
  state?: StepperStateEnum;
  validity?: FormControl;
  active?: boolean;
}

@Component({
  selector: 'mill-stepper, [mill-stepper]',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterViewInit, OnDestroy {
  @Input() public simple: boolean;
  @Input() public linear: boolean;

  @Input() hideControls: boolean;

  private destroy$: Subject<null> = new Subject<null>();

  public steps$: BehaviorSubject<StepperItemInterface[]>;
  public stepperState: typeof StepperStateEnum = StepperStateEnum;

  private currentStepId: number;

  public scrollControls: ScrollControlsInterface = {
    disableLeft: true,
    disableRight: true
  };
  public stepsChange: EventEmitter<StepperItemInterface> = new EventEmitter<StepperItemInterface>();

  @ViewChild('wrapper') public wrapper: ElementRef;
  @ViewChild('stepsWrapper') public stepsWrapper: ElementRef;
  @ViewChildren('stepElement') public stepElement: QueryList<ElementRef> = new QueryList<ElementRef>();

  private scrollOverflow: ScrollOverflow;

  private _transformStyle: string;

  get transformStyle(): string {
    return this._transformStyle;
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.steps$ = new BehaviorSubject<StepperItemInterface[]>([]);
    this.scrollOverflow = new ScrollOverflow();

    this.scrollOverflow.emitScrollTranslate
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this._transformStyle = value);

    this.scrollOverflow.emitScrollControls
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.scrollControls = value;
      });
  }

  ngAfterViewInit(): void {
    this.scrollOverflow.init({
      wrapper: this.wrapper,
      itemsWrapper: this.stepsWrapper,
      scrollOverflow: 0
    });

    this.scrollOverflow.items = this.setScrollItems();

    this.stepElement.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.scrollOverflow.items = this.setScrollItems();
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.steps$.next(null);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setScrollItems(): ScrollItemInterface[] {
    return this.steps$.getValue().map((s, idx) => {
      return {
        element: this.stepElement.toArray()[idx].nativeElement,
        inView: false
      };
    });
  }

  public onScroll(direction: 'left' | 'right'): void {
    this.scrollOverflow.onScroll(direction);
  }

  public onStepClick(step: StepperItemInterface): void {
    this.onActiveStep(step.id);

    if (this.scrollOverflow.scrollable) {
      this.scrollOverflow.scrollTo(this.stepElement.toArray()[step.id].nativeElement);
    }
  }

  public registerSteps(steps: StepperItemInterface[]): void {
    let hasActive = false;
    steps.forEach((step, idx) => {
      if (!step.id) {
        step.id = idx;
      }

      if (!hasActive) {
        if (step.active) {
          this.currentStepId = step.id || idx;
          hasActive = true;
        }
      } else {
        step.active = false;
      }

      if (this.isFormControl(step.validity)) {
        step.validity.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            if (value) {
              step.state = StepperStateEnum.valid;
            }
        });
      }
    });

    if (!hasActive) {
      this.currentStepId = steps[0].id;
      steps[0].active = true;
    }

    this.steps$.next(steps);
  }

  public nextStep(): void {
    this.onActiveStep(this.getStep(true));
  }

  public prevStep(): void {
    this.onActiveStep(this.getStep());
  }

  private onActiveStep(id: number): void {
    const steps = this.steps$.getValue();
    const currentStep = this.getStepById(this.currentStepId);

    if (this.linear) {
      const nextStepIndex = this.getStepIndexById(id);
      const currentStepIndex = this.getStepIndexById(currentStep.id);

      if ((nextStepIndex === (currentStepIndex + 1) && this.checkValidity(currentStep.validity))
        || (nextStepIndex < currentStepIndex)) {
        this.currentStepId = id;

        currentStep.active = false;
        currentStep.state = this.setStepState(currentStep);
        steps[nextStepIndex].active = true;

        this.steps$.next(steps);
        this.stepsChange.emit(this.getStepById(this.currentStepId));
      } else {
        currentStep.state = this.setStepState(currentStep);
      }
    } else {
      steps.forEach((step, idx) => {
        step.active = false;

        if (idx === id) {
          step.active = true;
          this.currentStepId = idx;
        } else if (idx < id) {
          step.state = this.setStepState(step);
        }

      });

      this.steps$.next(steps);
      this.stepsChange.emit(this.getStepById(this.currentStepId));
    }
  }

  private getStep(next?: boolean): number {
    const steps = this.steps$.getValue();
    const currentIndex = this.getStepIndexById(this.currentStepId);

    const stepIndex = next ? steps[currentIndex + 1] : steps[currentIndex - 1];

    if (stepIndex) {
      return stepIndex.id;
    } else {
      return currentIndex;
    }
  }

  private setStepState(step: StepperItemInterface): StepperStateEnum {
    if (step.hasOwnProperty('validity')) {
      return this.checkValidity(step.validity) ? StepperStateEnum.valid : StepperStateEnum.error;
    } else if (step.state === StepperStateEnum.valid) {
      return StepperStateEnum.valid;
    }

    return StepperStateEnum.pending;
  }

  private checkValidity(validity: FormControl | boolean): boolean {
    if (this.isFormControl(validity)) {
      return (validity as FormControl).valid;
    } else if (typeof validity === 'boolean') {
      return validity;
    }

    return true;
  }

  private isFormControl(validity: FormControl | boolean): boolean {
    return validity instanceof FormControl;
  }

  private getStepById(id: number): StepperItemInterface {
    return this.steps$.getValue().find(step => step.id === id);
  }

  private getStepIndexById(id: number): number {
    const steps = this.steps$.getValue();
    return steps.indexOf(steps.find(step => step.id === id));
  }
}
