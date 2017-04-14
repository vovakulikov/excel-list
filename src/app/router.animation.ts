import {trigger, state, animate, style, transition} from '@angular/core';

export function getAnimationConfig(){
  return smooth();
}

function smooth(){
  return trigger(
    'openClose',
    [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translateY(10px)",
        }),
        animate('250ms)', style({
          opacity: 1,
          transform: "translateY(0px)",
        }))
      ]),
      transition(":leave", [
        //animate('2000ms', style({ opacity: 0 }))
      ])
    ])
}
