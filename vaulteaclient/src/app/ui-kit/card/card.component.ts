import { BaseComponent } from "@abstract";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Folder, FolderFormComponent } from "@folder";
import { Password } from "@password";
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
  @Output() deleteOptionClicked: EventEmitter<CardData> = new EventEmitter<CardData>();

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
        this.description = (this.cardData.object as Folder).description;
        this.icon = "folder";
        break;
      case TypeEnum.PASSWORD:
        this.title = this.cardData.object.name;
        this.description = (this.cardData.object as Password).note;
        this.icon = "article";
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }

  public openDrawerInEditMode(): void {
    switch (this.cardData.type) {
      case TypeEnum.FOLDER:
        this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(FolderFormComponent), this.cardData.object as Folder);
        this.vaultDynamicDrawerService.setState(true);
        break;
      case TypeEnum.PASSWORD:
        this.vaultDynamicDrawerService.setPortalComponent(new ComponentPortal(PasswordFormComponent), this.cardData.object as Password);
        this.vaultDynamicDrawerService.setState(true);
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }
}
