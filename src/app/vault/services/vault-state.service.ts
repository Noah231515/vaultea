import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";

import { VaultStateKeys } from "../enums/vault-state-keys";
import { VaultView } from "../enums/vault-view.enum";
import { VaultState } from "../models/vault-state.interface";

@Injectable({
  providedIn: 'root'
})
export class VaultStateService {
  private vaultStateBehaviorSubject: BehaviorSubject<VaultState> = new BehaviorSubject<VaultState>({
    vaultView: VaultView.Grid
  });
  public vaultStateObservable: Observable<VaultState> = this.vaultStateBehaviorSubject.asObservable();

  constructor() { 
    const vaultView = localStorage.getItem(VaultStateKeys.VaultView);
    const enumValues = Object.values(VaultView).map(value => value.toString());

    if (enumValues.includes(vaultView)) {
      const initialState: VaultState = {
        vaultView: vaultView as VaultView
      }
      this.next(initialState);
    } else {
      localStorage.setItem(VaultStateKeys.VaultView, VaultView.Grid);
    }
  }

  public next(state: VaultState): void {
    this.vaultStateBehaviorSubject.next(state);
  }
}
