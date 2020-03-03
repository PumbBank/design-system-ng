import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const animatedTab: {tabAnimation: AnimationTriggerMetadata} = {
  tabAnimation: trigger('tabAnimation', [
    state('center, void', style({transform: 'none', position: 'relative', opacity: '1'})),
    state('left', style({transform: 'translate3d(-100%, 0, 0)', opacity: '0'})),
    state('right', style({transform: 'translate3d(100%, 0, 0)', opacity: '0'})),

    transition('* => left, * => right, left => center, right => center',
      animate('0.4s ease')),
  ])
};
