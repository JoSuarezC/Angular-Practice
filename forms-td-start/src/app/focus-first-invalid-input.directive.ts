import {
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appFocusFirstInvalidInput]'
})
export class FocusFirstInvalidInputDirective {
  private focusableInputs: string = 'input, textarea, select';
  private invalidClass: string = '.ng-invalid:not(.fieldset-wrapper)';

  constructor(private element: ElementRef) { }

/**
 * Listening for the submit and reset events on the form.
 * If the form is invalid, it will find the first focusable element
 * in the first invalid element and focus on it.
 */
  @HostListener('submit')
  @HostListener('reset')
  focusFirstInvalidInput() {
    const invalidElements = this.element.nativeElement.querySelectorAll(this.invalidClass);

    console.log(invalidElements)
    if (invalidElements.length) {
      const firstFocusableEl: HTMLElement | null = invalidElements[0];
      firstFocusableEl && setTimeout(
        () => firstFocusableEl.focus(),
        200
      );
    }
  }
}
