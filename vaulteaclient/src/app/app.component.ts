import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { fadeAnimation } from "./animations/fade-animation";
import { AuthenticationService } from "./authentication/authentication.service";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent implements OnInit {
  public title = "vaulteaclient";
  public isLoggedIn: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.authenticationService.isLoggedInObservable.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.changeDetectorRef.markForCheck();
    });
  }

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
