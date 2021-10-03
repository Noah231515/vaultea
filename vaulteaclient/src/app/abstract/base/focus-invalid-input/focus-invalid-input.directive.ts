import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focusInvalidInput]'
})
export class FocusInvalidInputDirective {

  constructor(
    private formElementRef: ElementRef
  ) { }

  @HostListener('submit')
  private onFormSubmit() {
    const invalidControl = this.formElementRef.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }

}
