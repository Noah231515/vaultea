import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FolderUtil } from "@folder";
import { getBaseMatDialogConfig } from "@shared";

import { FolderStateService } from "../folder/services/folder-state.service";
import { PasswordStateService } from "../password/services/password-state.service";
import { PasswordUtil } from "../password/utils/password.util";
import { TypeEnum } from "../shared/enums/type.enum";
import { AutocompleteOption } from "../ui-kit/autocomplete/autocomplete-option.interface";
import { ItemIconEnum } from "../ui-kit/enums/item-icon.enum";

@Component({
  selector: "vaultea-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent {
  public searchFormControl = new FormControl("");

  public folderOptions = this.folderState.folderObservable
    .pipe(
      map(folders => {
        return folders.map(folder => {
          const option: AutocompleteOption = {
            displayValue: folder.name,
            value: `${TypeEnum.FOLDER}.${folder.id}`,
            icon: ItemIconEnum.FOLDER,
          }
          return option;
        })
      })
    );

  public passwordOptions = this.passwordState.passwordObservable
    .pipe(
      map(passwords => {
        return passwords.map(password => {
          const option: AutocompleteOption = {
            displayValue: password.name,
            value: `${TypeEnum.PASSWORD}.${password.id}`,
            icon: ItemIconEnum.PASSWORD,
          }
          return option;
        })
      })
    );
    
  public allOptions = combineLatest([this.folderOptions, this.passwordOptions])
    .pipe(
      map((result: [AutocompleteOption[], AutocompleteOption[]]) => {
        return [].concat(result[0], result[1]);
      }),
    );

  constructor(
    private folderState: FolderStateService,
    private folderUtil: FolderUtil,
    private passwordState: PasswordStateService,
    private passwordUtil: PasswordUtil
  ) { }

  public handleOptionSelected(optionValue: string): void {
    const parts = optionValue.split(".");
    const type = parts[0];
    const id = parts[1];

    switch (type) {
    case TypeEnum.FOLDER:
      this.folderUtil.folderClicked(id);
      break;
    case TypeEnum.PASSWORD:
      const password = this.passwordState.getPasswords().find(p => p.id.toString() === id.toString());
      const config = getBaseMatDialogConfig();
      this.passwordUtil.passwordClicked(password, config);
    
    default:
      break;
    }
  }
}
