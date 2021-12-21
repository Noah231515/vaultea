import { BaseComponent } from "@abstract";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

import { Card } from "./card.model";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent extends BaseComponent {
  @Input() cardData: Card;
  @Output() deleteOptionClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }
}
