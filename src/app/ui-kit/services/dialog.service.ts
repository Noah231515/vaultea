import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

import { GenericDialogData } from "../generic-dialog/generic-dialog-data.interface";
import { GenericDialogComponent } from "../generic-dialog/generic-dialog.component";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  public afterClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog
  ) { }

  public open(component: any, config?: MatDialogConfig): void {
    const dialogRef = this.dialog.open(component, config);

    dialogRef.afterClosed().subscribe(() => this.afterClosed.emit())
  }

  public openWarning(dialogData: GenericDialogData): MatDialogRef<GenericDialogComponent, any> {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      dialogData: dialogData
    };

    return this.dialog.open(GenericDialogComponent, config);
  }
}
