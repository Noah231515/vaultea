import { BaseComponent } from "@abstract";
import { CdkPortalOutletAttachedRef, ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewEncapsulation } from "@angular/core";
import { FolderFormComponent } from "@folder";
import { VaultDynamicDrawerService } from "@shared";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-content-drawer",
  styleUrls: ["./content-drawer.component.scss"],
  templateUrl: "./content-drawer.component.html",
})
export class ContentDrawerComponent extends BaseComponent implements OnInit {
  public isDrawerOpened: boolean = false;
  public drawerPortal: ComponentPortal<any>;

  constructor(
    private vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef
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
      if (isOpen) {
        window.scrollTo({top: 0, behavior: "smooth"});
      }
      this.changeDetectorRef.detectChanges();
    })
  }

  private listenToPortalState(): void {
    this.vaultDynamicDrawerService.getPortalStateObservable().subscribe((portal: ComponentPortal<any>) => {
      this.drawerPortal = portal;
      this.changeDetectorRef.detectChanges();
    })
  }

  public setComponentData(ref: CdkPortalOutletAttachedRef): void {
    const existingObject = this.vaultDynamicDrawerService.getExistingObject();
    if (existingObject) {
      (ref as ComponentRef<FolderFormComponent>).instance.existingObject = existingObject;
    }
  }

  public closeDrawer(): void {
    this.vaultDynamicDrawerService.setState(false);
  }
}
