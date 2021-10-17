import { animate, style, transition, trigger } from "@angular/animations";

export const fadeAnimation =
trigger("routeAnimations", [ 
  transition("* <=> *", [
    style({ opacity: 0 }), 
    animate(250, style({opacity: 1}))
  ]) 
])