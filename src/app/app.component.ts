import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { fadeAnimation } from "./animations/fade-animation";
import { UserService } from "./authentication/services/user.service";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  public title = "vaulteaclient";

  constructor(
    public userService: UserService,
  ) { }

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
