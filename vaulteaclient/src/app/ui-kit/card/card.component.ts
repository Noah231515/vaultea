import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FolderFormComponent } from "@folder";
import { TypeEnum } from "@shared";

import { PasswordFormComponent } from "../../password/components/password-form/password-form.component";
import { VaultDynamicDrawerService } from "../../shared/services/vault-dynamic-drawer.service";
import { CardData } from "./card-data.model";

/* eslint-disable indent */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input() cardData: CardData;
  @Output() deleteOptionClicked: EventEmitter<string> = new EventEmitter<string>();

  public title: string;
  public description: string;
  public icon: string;

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
        this.icon = "folder";
        break;
      case TypeEnum.PASSWORD:
        this.title = this.cardData.object.name;
        this.description = this.cardData.object.description;
        this.icon = "article";
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
      case TypeEnum.PASSWORD:
        this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(PasswordFormComponent), this.cardData.object);
        this.vaultDynamicDrawerService.setState(true);
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }
}
