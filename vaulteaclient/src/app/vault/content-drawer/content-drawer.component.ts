import { BaseComponent, BaseFormComponent } from "@abstract";
import { CdkPortalOutletAttachedRef } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ViewEncapsulation } from "@angular/core";
import { VaultDynamicDrawerService } from "@shared";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-content-drawer",
  styleUrls: ["./content-drawer.component.scss"],
  templateUrl: "./content-drawer.component.html",
})
export class ContentDrawerComponent extends BaseComponent {

  constructor(
    public vaultDynamicDrawerService: VaultDynamicDrawerService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  public scrollTop(isOpen: boolean): void {
    if (isOpen) {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
    this.changeDetectorRef.detectChanges();
  }

  public setComponentData(ref: CdkPortalOutletAttachedRef): void {
    const existingObject = this.vaultDynamicDrawerService.getExistingObject();
    if (existingObject) {
      (ref as ComponentRef<BaseFormComponent>).instance.existingObject = existingObject;
    }
    this.changeDetectorRef.detectChanges();
  }

  public closeDrawer(): void {
    this.vaultDynamicDrawerService.setState(false);
  }
}
