import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { AutocompleteData } from "./autocomplete-data.interface";
import { AutocompleteOption } from "./autocomplete-option.interface";

@Component({
  selector: "vaultea-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"]
})
export class AutocompleteComponent implements OnInit {
  @Input() public autocompleteData: AutocompleteData

  public filteredOptions: Observable<AutocompleteOption[]>;
  public maxValuesToDisplay: number = 25;

  public ngOnInit(): void {
    const formControl: FormControl = this.autocompleteData.formControl;
    this.filteredOptions = formControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filter(value)),
    );
  }

  public getDisplayValue = (value: string): string => {
    const option = this.autocompleteData.options.find(o => o.value === value);
    return option ? option.displayValue : "";
  }

  private filter(value: string): AutocompleteOption[] {
    let filterValue: string;
    if (value) {
      filterValue = value.toString().toLowerCase();
    }
    return this.autocompleteData.options.filter(option => option.displayValue.toLowerCase().includes(filterValue ?? "") || option.subtitle?.toLowerCase().includes(filterValue));
  }
}
