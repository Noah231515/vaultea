import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { GenericDialogData } from "./generic-dialog-data.interface";

@Component({
  selector: "vaultea-generic-dialog",
  templateUrl: "./generic-dialog.component.html",
  styleUrls: ["./generic-dialog.component.scss"]
})
export class GenericDialogComponent {
  public dialogData: GenericDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dialogData: GenericDialogData },
    private dialogRef: MatDialogRef<any>
  ) {
    this.dialogData = data?.dialogData;
  }

  public primaryButtonClicked(): void {
    this.dialogRef.close(true);
  }

  public secondaryButtonClicked(): void {
    this.dialogRef.close();
    this.dialogRef.close(false);
  }
}
