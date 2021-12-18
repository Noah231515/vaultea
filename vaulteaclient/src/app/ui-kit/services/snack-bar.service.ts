import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  public defaultSnackBarConfig: MatSnackBarConfig;

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.defaultSnackBarConfig = new MatSnackBarConfig();
    this.defaultSnackBarConfig.horizontalPosition = "center";
    this.defaultSnackBarConfig.verticalPosition = "top";
    this.defaultSnackBarConfig.duration = 5000;
    this.defaultSnackBarConfig.politeness = "polite"
  }

  public open(message: string): void {
    this.snackBar.open(message, "Ok", this.defaultSnackBarConfig);
  }
}
