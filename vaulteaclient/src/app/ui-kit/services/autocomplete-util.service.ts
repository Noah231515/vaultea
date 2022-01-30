import { UserDataService } from "@abstract";
import { Injectable } from "@angular/core";
import { DataUtil } from "@util";

import { AutocompleteOption } from "../autocomplete/autocomplete-option.interface";

@Injectable({
  providedIn: "root"
})
export class AutocompleteUtilService {

  constructor(
    private userDataService: UserDataService
  ) {
  }

  public buildOptions(): AutocompleteOption[] {
    const flatFolders = this.userDataService.getFlatFolders();
    return flatFolders.map(folder => {
      return {
        value: folder.id,
        displayValue: folder.name,
        subtitle: DataUtil.buildPathString(folder)
      }
    });
  }
}
