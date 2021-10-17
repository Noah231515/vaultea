import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { fadeAnimation } from "./animations/fade-animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = "vaulteaclient";


  public prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}