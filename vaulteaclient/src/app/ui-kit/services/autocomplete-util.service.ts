import { UserDataService } from "@abstract";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataUtil } from "@util";

import { AutocompleteData } from "../autocomplete/autocomplete-data.interface";
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
    return this.userDataService.getFolders().map(folder => {
      return {
        value: folder.id,
        displayValue: folder.name,
        subtitle: DataUtil.buildPathString(folder)
      }
    });
  }

  public getLocationAutocompleteData(formControl: FormControl): AutocompleteData {
    return {
      label: "Location",
      formControl: formControl,
      options: this.buildOptions(),
      required: false,
      displaySubtitle: true
    }
  }
}
