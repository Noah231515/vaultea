import { BaseComponent } from "@abstract";
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Folder } from "@folder";
import { Password } from "@password";
import { TypeEnum } from "@shared";

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
  @Output() starClicked: EventEmitter<void> = new EventEmitter<void>();

  public title: string;
  public description: string;
  public icon: string;

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
    this.editClicked.emit(this.cardData);
  }
}
