import {
  trigger,
  animate,
  transition,
  style,
  query,
  animateChild
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          backgroundColor: 'white',
          position: 'absolute',
          height: '100%',
          width: '100%'
        })
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          opacity: 1,
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: 'white'
        }),
        animate('0.2s', style({ opacity: 0 })),
        animateChild() // Animate child elements during the transition
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({
          opacity: 0,
          backgroundColor: 'transparent',
          position: 'relative',
          height: '100%',
          width: '100%'
        }),
        animate('0.3s', style({ opacity: 1 })),
        animateChild() // Animate child elements during the transition
      ],
      { optional: true }
    )
  ])
]);