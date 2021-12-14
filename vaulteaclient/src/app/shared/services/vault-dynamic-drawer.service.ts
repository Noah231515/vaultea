import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VaultDynamicDrawerService {
  private stateBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private portalBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public getIsOpen(): boolean {
    return this.stateBehaviorSubject.value;
  }

  public getIsOpenObservable(): Observable<boolean> {
    return this.stateBehaviorSubject.asObservable();
  }

  public setPortalComponent(component: any): void {
    this.portalBehaviorSubject.next(component);
  }

  public setState(isOpened: boolean): void {
    this.stateBehaviorSubject.next(true);
  }
}
