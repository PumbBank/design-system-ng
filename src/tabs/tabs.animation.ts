import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const animatedTab: {tabAnimation: AnimationTriggerMetadata, contentAnimation: AnimationTriggerMetadata} = {
  tabAnimation: trigger('tabAnimation', [
    state('center', style({transform: 'none', position: 'relative'})),
    state('left', style({transform: 'translate3d(-100%, 0, 0)'})),
    state('right', style({transform: 'translate3d(100%, 0, 0)'})),

    transition('* => left, * => right, left => center, right => center, * => center',
      animate('0.4s ease')),
  ]),
  contentAnimation: trigger('contentAnimation', [
    transition(':enter', [
      style({opacity: 0}),
      animate('0.4s ease', style({opacity: '1'}))
    ]),
    transition(':leave', [
      animate('0.4s ease', style({opacity: '0'}))
    ])
  ]),
};
