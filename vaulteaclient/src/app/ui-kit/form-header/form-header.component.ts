import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "vaultea-form-header",
  templateUrl: "./form-header.component.html",
  styleUrls: ["./form-header.component.scss"]
})
export class FormHeaderComponent implements OnInit {
  @Input() public headerText: string;
  @Input() public hLevel: "h1" | "h2" | "h3" = "h2";

  constructor() { }

  ngOnInit(): void {

  }

}
