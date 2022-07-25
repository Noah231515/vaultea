import { Injectable } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { DialogService, FormStateEnum } from "@ui-kit";

import { PasswordFormComponent } from "../components/password-form/password-form.component";
import { Password } from "../password.model";

@Injectable({
  providedIn: "root"
})
export class PasswordUtil {
  constructor(private dialogService: DialogService) {}

  public passwordClicked(password: Password, config: MatDialogConfig): void {
    config.data = {
      existingObject: password,
      formState: FormStateEnum.VIEW
    };
    this.dialogService.open(PasswordFormComponent, config);
  }

  public static computePasswordEntropy(characterSetsInUse: string[][], passwordLength: number): number {
    let numOfPossibleCharacters = 0;

    characterSetsInUse.forEach(set => numOfPossibleCharacters += set.length);
    return Math.floor(Math.log2(Math.pow(numOfPossibleCharacters, passwordLength)));
  }
}
