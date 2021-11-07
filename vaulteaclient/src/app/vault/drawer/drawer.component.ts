import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'vaultea-drawer',
  styleUrls: ['./drawer.component.scss'],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
