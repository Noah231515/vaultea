import { BaseFormComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { Folder } from "@folder";
import { Password } from "@password";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VaultDynamicDrawerService {
  private stateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public stateObservable: Observable<boolean> = this.stateBehaviorSubject.asObservable();
  private portalBehaviorSubject: BehaviorSubject<ComponentPortal<BaseFormComponent>> = new BehaviorSubject<ComponentPortal<BaseFormComponent>>(null);
  public portalObservable: Observable<ComponentPortal<BaseFormComponent>> = this.portalBehaviorSubject.asObservable();
  private existingObject: Folder | Password | null = null;

  public getIsOpen(): boolean {
    return this.stateBehaviorSubject.value;
  }

  public setPortalComponent(component: ComponentPortal<BaseFormComponent>, existingObject: Folder | Password | null = null): void {
    this.existingObject = existingObject;
    this.portalBehaviorSubject.next(component);
  }

  public setState(isOpened: boolean): void {
    if (!isOpened) {
      this.portalBehaviorSubject.next(null);
    }
    this.stateBehaviorSubject.next(isOpened);
  }

  public getExistingObject(): Folder | Password | null {
    return this.existingObject;
  }
}
