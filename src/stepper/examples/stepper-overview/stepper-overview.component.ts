import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StepperComponent, StepperItemInterface, StepperStateEnum} from '../../components/stepper/stepper.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'stepper-overview',
  templateUrl: './stepper-overview.component.html',
  styleUrls: ['./stepper-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class StepperOverviewComponent implements OnInit, AfterViewInit {

  public control: FormControl = new FormControl(null, Validators.required);

  public steps: StepperItemInterface[] = [
    {value: 'Step Item', state: StepperStateEnum.valid},
    {value: 'Step Item', active: true, validity: this.control},
    {value: 'Step Item', validity: this.control},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
  ];

  public steps2: StepperItemInterface[] = [
    {value: 'Step Item'},
    {value: 'Step Item', validity: this.control},
    {value: 'Step Item', validity: this.control},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
    {value: 'Step Item'},
  ];

  public steps3: StepperItemInterface[] = [
    {value: 'Step Item'},
    {value: 'Step Item', validity: this.control},
    {value: 'Step Item', validity: this.control},
    {value: 'Step Item'},
  ];

  @ViewChild('stepper1', {static: true}) stepper: StepperComponent;
  @ViewChild('stepper2') stepper2: StepperComponent;
  @ViewChild('stepper3', {static: true}) stepper3: StepperComponent;

  constructor() { }

  ngOnInit(): void {
    this.stepper3.registerSteps(this.steps3);
    this.stepper.registerSteps(this.steps);

  }

  ngAfterViewInit(): void {
    this.stepper2.registerSteps(this.steps2);
  }

}
