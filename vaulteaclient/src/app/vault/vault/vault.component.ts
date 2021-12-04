import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-vault",
  styleUrls: ["./vault.component.scss"],
  templateUrl: "./vault.component.html",
})
export class VaultComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
