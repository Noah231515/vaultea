import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { slideInAnimation } from "./animations/slideInAnimation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = "vaulteaclient";


  public prepareRoute(outlet: RouterOutlet): any {
    return outlet?.activatedRouteData?.animation;
  }
}