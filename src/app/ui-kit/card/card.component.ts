import { BaseComponent } from "@abstract";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";
import { Password } from "@password";
import { TypeEnum } from "@shared";
import { ItemIconEnum } from "../enums/item-icon.enum";

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
  @Output() contentClicked: EventEmitter<CardData> = new EventEmitter<CardData>();
  @Output() editClicked: EventEmitter<CardData> = new EventEmitter<CardData>();
  @Output() starClicked: EventEmitter<CardData> = new EventEmitter<CardData>();

  public title: string;
  public description: string;
  public icon: string;
  public itemIconEnum = ItemIconEnum;

  private typeNotSupportedError = new Error("Type not supported");

  constructor(
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
        this.icon = this.itemIconEnum.FOLDER;
        break;
      case TypeEnum.PASSWORD:
        this.title = this.cardData.object.name;
        this.description = (this.cardData.object as Password).description;
        this.icon = this.itemIconEnum.PASSWORD;
        break;
      default:
        throw this.typeNotSupportedError;
    }
  }

  public openDrawerInEditMode(): void {
    this.editClicked.emit(this.cardData);
  }
}
