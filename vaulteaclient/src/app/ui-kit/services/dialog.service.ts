import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  public afterClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog
  ) { }

  public open(component: any, data?: any): void {
    const dialogRef = this.dialog.open(component, {
      // width: "250px",
      data: data
    });

    dialogRef.afterClosed().subscribe(() => this.afterClosed.emit())
  }
}
