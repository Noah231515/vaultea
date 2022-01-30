import { BaseFormComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { Folder } from "@folder";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VaultDynamicDrawerService {
  private stateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private portalBehaviorSubject: BehaviorSubject<ComponentPortal<BaseFormComponent>> = new BehaviorSubject<ComponentPortal<BaseFormComponent>>(null);
  private existingObject: Folder | null = null;

  public getIsOpen(): boolean {
    return this.stateBehaviorSubject.value;
  }

  public getIsOpenObservable(): Observable<boolean> {
    return this.stateBehaviorSubject.asObservable();
  }

  public getPortalStateObservable(): Observable<any> {
    return this.portalBehaviorSubject.asObservable();
  }

  public setPortalComponent(component: ComponentPortal<BaseFormComponent>, existingObject: Folder | null = null): void {
    this.existingObject = existingObject;
    this.portalBehaviorSubject.next(component);
  }

  public setState(isOpened: boolean): void {
    if (!isOpened) {
      this.portalBehaviorSubject.next(null);
    }
    this.stateBehaviorSubject.next(isOpened);
  }

  public getExistingObject(): Folder | null {
    return this.existingObject;
  }
}
