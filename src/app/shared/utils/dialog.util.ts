import { MatDialogConfig } from "@angular/material/dialog";

export function getBaseMatDialogConfig(): MatDialogConfig {
  const config = new MatDialogConfig();
  config.width = "30vw";
  config.height = "70vh";
  return config;
}
