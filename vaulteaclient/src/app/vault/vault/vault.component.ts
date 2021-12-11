import { BaseComponent } from "@abstract";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";

import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent extends BaseComponent implements OnInit {
  public folders?: Folder[];
  
  public constructor(
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.folders = this.authenticationService.getLoggedInUser()?.folders;
  }
}
