import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FolderFormComponent } from "@folder";
import { TypeEnum } from "@shared";

import { VaultDynamicDrawerService } from "../../shared/services/vault-dynamic-drawer.service";
import { Card } from "./card.model";

/* eslint-disable indent */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input() cardData: Card;
  @Output() deleteOptionClicked: EventEmitter<string> = new EventEmitter<string>();

  public title: string;
  public description: string;

  private typeNotSupportedError = new Error("Type not supported");

  constructor(
    private vaultDynamicDrawerService: VaultDynamicDrawerService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setCardProperties();
  }

  private setCardProperties(): void {
    switch (this.cardData.type) {
      case TypeEnum.FOLDER:
        this.title = this.cardData.object.name;
        this.description = this.cardData.object.description;
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }

  public openDrawerInEditMode(): void {
    switch (this.cardData.type) {
      case TypeEnum.FOLDER:
        this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent), this.cardData.object);
        this.vaultDynamicDrawerService.setState(true);
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }

}
