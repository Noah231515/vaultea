import { combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { FolderStateService } from "../folder/services/folder-state.service";
import { PasswordStateService } from "../password/services/password-state.service";
import { AutocompleteOption } from "../ui-kit/autocomplete/autocomplete-option.interface";

@Component({
  selector: 'vaultea-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public searchFormControl = new FormControl("");

  public folderOptions = this.folderState.folderObservable
    .pipe(
      map(folders => {
        return folders.map(folder => {
          const option: AutocompleteOption = {
            displayValue: folder.name,
            value: folder.id
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
            value: password.id
          }
          return option;
        })
      })
    );
    
  public vaultItemsObservable = combineLatest([this.folderOptions, this.passwordOptions])
    .pipe(
        map((result: [AutocompleteOption[], AutocompleteOption[]]) => {
          return [].concat(result[0], result[1]);
        }),
    );

  constructor(
    private folderState: FolderStateService,
    private passwordState: PasswordStateService
  ) { }

  public ngOnInit(): void {
    this.vaultItemsObservable.subscribe(items => console.warn(items))
  }
}
