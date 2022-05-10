
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataUtil } from "@util";

import { AutocompleteData } from "../../ui-kit/autocomplete/autocomplete-data.interface";
import { AutocompleteOption } from "../../ui-kit/autocomplete/autocomplete-option.interface";
import { FolderStateService } from "./folder-state.service";

@Injectable({
  providedIn: "root"
})
export class AutocompleteUtilService {

  constructor(
    private folderState: FolderStateService
  ) {
  }

  public buildOptions(): AutocompleteOption[] {
    return this.folderState.getFolders().map(folder => {
      return {
        value: folder.id,
        displayValue: folder.name,
        subtitle: DataUtil.buildPathString(folder)
      }
    });
  }

  public getLocationAutocompleteData(formControl: FormControl, readonly?: boolean): AutocompleteData {
    return {
      label: "Location",
      formControl: formControl,
      options: this.buildOptions(),
      required: false,
      displaySubtitle: true,
      readonly: readonly ?? false
    }
  }
}
