import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, OnInit } from "@angular/core";
import { VaultDynamicDrawerService } from "@shared";

@Component({
  selector: "vaultea-content-drawer",
  templateUrl: "./content-drawer.component.html",
  styleUrls: ["./content-drawer.component.scss"]
})
export class ContentDrawerComponent extends BaseComponent implements OnInit {
  public isDrawerOpened: boolean = false;
  public drawerPortal: ComponentPortal<any>;

  constructor(
    private vaultDynamicDrawerService: VaultDynamicDrawerService
  ) { 
    super();
  }

  public ngOnInit(): void {
    this.listenToDrawerState();
    this.listenToPortalState();
  }

  private listenToDrawerState(): void {
    this.vaultDynamicDrawerService.getIsOpenObservable().subscribe((isOpen: boolean) => {
      this.isDrawerOpened = isOpen;
    })
  }

  private listenToPortalState(): void {
    this.vaultDynamicDrawerService.getPortalStateObservable().subscribe((portal: ComponentPortal<any>) => {
      this.drawerPortal = portal;
    })
  }

  public closeDrawer(): void {
    this.vaultDynamicDrawerService.setState(false);
  }
}
