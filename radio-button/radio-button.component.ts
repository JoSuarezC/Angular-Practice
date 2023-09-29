import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

/* Counter variable to add a unique id for the radio component. */
let nextUniqueId = 0;

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioButtonComponent
    }
  ]
})
export class RadioButtonComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // Mandatory properties
  @Input() name: string;
  @Input() label: string;
  @Input() value: string = "";

  private _uid = `app-radio-${nextUniqueId++}`;
  private _id: string = this._uid;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }

  // Optional properties
  @Input('aria-describedby') ariaDescribedby?: string | null;
  @Input() checked?: boolean = false;
  @Input() required: boolean = true;
  @Output() change = new EventEmitter();

  // ControlValueAccessor properties.
  touched: boolean = false;
  disabled: boolean = false;
  _controlValueAccessorChangeFn = (selectedValue: string) => {};
  _controlValueAccessorTouchedFn = () => {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.checked = false;
  }

  handleChange(event: Event): void {
    this.checked = (<HTMLInputElement>event.target).checked;
    this.change.emit();
    this._controlValueAccessorChangeFn(this.value);
    this.markAsTouched();
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: string) {
    this.checked = this.value === value;
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param onChangeFn Callback to be registered.
   */
  registerOnChange(onChangeFn: (value: any) => void) {
    this._controlValueAccessorChangeFn = onChangeFn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param onTouchedFn Callback to be registered.
   */
  registerOnTouched(onTouchedFn: any) {
    this._controlValueAccessorTouchedFn = onTouchedFn;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  markAsTouched() {
    if (!this.touched) {
      this._controlValueAccessorTouchedFn();
      this.touched = true;
    }
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
