import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { GenericDialogData } from "./generic-dialog-data.interface";

@Component({
  selector: 'vaultea-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {
  public dialogData: GenericDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dialogData: GenericDialogData }
  ) {
    this.dialogData = data?.dialogData;
  }
}
