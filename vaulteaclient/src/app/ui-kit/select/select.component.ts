import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vaultea-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  public foods: string[] = [];
  constructor() { }

  public ngOnInit(): void {
  }

}
