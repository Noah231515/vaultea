import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import {
  AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatOptionSelectionChange } from "@angular/material/core";

import { AutocompleteData } from "./autocomplete-data.interface";
import { AutocompleteOption } from "./autocomplete-option.interface";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "vaultea-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"]
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAutocompleteTrigger) public autocomplete: MatAutocompleteTrigger;
  @Input() public autocompleteData: AutocompleteData // TODO: Implement required
  @Output() public optionSelected: EventEmitter<string> = new EventEmitter<string>();
  
  public filteredOptions: Observable<AutocompleteOption[]>;
  public maxValuesToDisplay: number = 25;
  public defaultPlaceholder: string = "";
  
  public ngOnInit(): void {
    this.listenForValueChanges();
    this.defaultPlaceholder = `Select a ${this.autocompleteData.label}`;  
  }
  
  public ngAfterViewInit(): void {    
    if (this.autocompleteData.requireSelection) {
      this.listenForClosedPanel();
    }
  }

  private listenForValueChanges(): void {
    const formControl: FormControl = this.autocompleteData.formControl;
    this.filteredOptions = formControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filter(value)),
    );
  }

  private listenForClosedPanel(): void {
    this.autocomplete
      .panelClosingActions
      .subscribe((value: MatOptionSelectionChange | null) => {
        if (value) {
          this.optionSelected.emit(value.source.value);
        } else {
          this.autocompleteData.formControl.patchValue("");
        }
      })
  }

  public getDisplayValue = (value: string): string => {
    const option = this.autocompleteData.options.find(o => o.value === value);
    if (this.autocompleteData.displaySubtitle) {
      return option?.subtitle ?? "";
    } else {

      return option?.displayValue ?? "";
    }
  }

  private filter(value: string): AutocompleteOption[] {
    let filterValue: string;
    if (value) {
      filterValue = value.toString().toLowerCase();
    }
    return this.autocompleteData.options.filter(option => option.displayValue.toLowerCase().includes(filterValue ?? "") || option.subtitle?.toLowerCase().includes(filterValue));
  }
}
