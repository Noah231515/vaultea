import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[focusInvalidInput]"
})
export class FocusInvalidInputDirective {

  constructor(
    private formElementRef: ElementRef
  ) { }

  @HostListener("submit")
  private onFormSubmit() {
    const invalidInput = this.formElementRef.nativeElement.querySelector("input.ng-invalid");

    if (invalidInput) {
      invalidInput.focus();
    }
  }
}
