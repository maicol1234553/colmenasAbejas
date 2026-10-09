import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  animateChild
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateY(20px)'
      })
    ], { optional: true }),
    query(':enter', [
      animate('400ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
    query(':leave', [
      animate('300ms ease-in',
        style({ opacity: 0, transform: 'translateY(-20px)' }))
    ], { optional: true }),
    query('@*', animateChild(), { optional: true })
  ])
]);

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 }))
  ])
]);

export const staggerAnimation = trigger('stagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('400ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
