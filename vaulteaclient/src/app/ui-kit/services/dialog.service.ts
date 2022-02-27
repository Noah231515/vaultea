import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

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
}
