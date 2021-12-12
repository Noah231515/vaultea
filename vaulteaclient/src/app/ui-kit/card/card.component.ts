import { Component, Input, ViewEncapsulation } from "@angular/core";

import { Card } from "./card.model";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {
  @Input() cardData: Card;
}
