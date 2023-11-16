import {
    trigger,
    animate,
    transition,
    style,
    query
  } from '@angular/animations';
  
  export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({
            opacity: 0,
            // position: 'absolute',
            // height: '100%',
            // width: '100%'
          })
        ],
        { optional: true }
      ),
      query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [
          style({
            opacity: 1,
            position: 'absolute',
            height: '100%',
            width: '100%'
          }),
          animate('.2s', style({ opacity: 0 }))
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            opacity: 0,
            // position: 'relative',
            // height: '100%',
            // width: '100%'
          }),
          animate('.3s', style({ opacity: 1 }))
        ],
        { optional: true }
      )
    ])
  ]);