/* eslint-disable indent */
import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { FolderFormComponent } from "@folder";
import { TypeEnum } from "@shared";

import { VaultDynamicDrawerService } from "../../shared/services/vault-dynamic-drawer.service";
import { Card } from "./card.model";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent extends BaseComponent {

  constructor(
    private vaultDynamicDrawerService: VaultDynamicDrawerService
  ) {
    super();
  }

  @Input() cardData: Card;
  @Output() deleteOptionClicked: EventEmitter<string> = new EventEmitter<string>();

  public openDrawerInEditMode(): void {
    switch (this.cardData.type) {
      case TypeEnum.FOLDER:
        this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent));
        this.vaultDynamicDrawerService.setState(true);
        break;
      default:
        throw new Error("Not supported");
    }
  }

}
