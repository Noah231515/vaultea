import { BaseComponent, BaseFormComponent } from "@abstract";
import { CdkPortalOutletAttachedRef, ComponentPortal } from "@angular/cdk/portal";
import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewEncapsulation } from "@angular/core";
import { VaultDynamicDrawerService } from "@shared";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-content-drawer",
  styleUrls: ["./content-drawer.component.scss"],
  templateUrl: "./content-drawer.component.html",
})
export class ContentDrawerComponent extends BaseComponent implements OnInit {
  public isDrawerOpened: boolean = false;
  public drawerPortal: ComponentPortal<BaseFormComponent>;

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
    this.vaultDynamicDrawerService.getPortalStateObservable().subscribe((portal: ComponentPortal<BaseFormComponent>) => {
      this.drawerPortal = portal;
      this.changeDetectorRef.detectChanges();
    })
  }

  public setComponentData(ref: CdkPortalOutletAttachedRef): void {
    const existingObject = this.vaultDynamicDrawerService.getExistingObject();
    if (existingObject) {
      (ref as ComponentRef<BaseFormComponent>).instance.existingObject = existingObject;
    }
  }

  public closeDrawer(): void {
    this.vaultDynamicDrawerService.setState(false);
  }
}
