import {
  Host,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';

/* Counter variable to add a unique id for the select component. */
let nextUniqueId = 0;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide:  NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  // Mandatory properties
  @Input() name: string;
  @Input() label: string;
  @Input() formControlName: string;

  selectedOption: string;
  private _options: string[] = [];
  labelOption: string;

  @Input()
  get options(): string[] {
    return this._options;
  };
  set options(options: string[]) {
    /* Adding the label as First element to the options array. */
    this._options = [this.label, ...options];
  };

  private _uid = `app-select-${nextUniqueId++}`;
  private _id: string = this._uid;
  errorID = `${this._uid}-error`;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }

  // Optional properties
  @Input('aria-describedby') ariaDescribedby?: string | null;
  @Input() showError?: boolean;
  @Input() messageOnError?: string;

  protected _required: boolean | undefined;
  @Input()
  get required(): boolean {
    return this.controlContainer?.control?.get(this.formControlName)?.hasValidator(Validators.required) ?? false;
  }
  set required(value: boolean) {
    this._required = value;
  }

  @Output() change = new EventEmitter();

  // Control Value Accessor properties
  touched: boolean = false;
  disabled: boolean = false;
  _controlValueAccessorChangeFn = (option: string) => {};
  _controlValueAccessorTouchedFn = () => {};

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {
  }

/**
 * We're getting the value of the selected option from the Event, emitting a change event, and then calling the
 * `_controlValueAccessorChangeFn` function that we defined in the `registerOnChange` function.
 * Finally marking the component as touched.
 * @param {Event} event - Event - The event that triggered the change.
 */
  handleChange(event: Event): void {
    this.selectedOption = (event.target as HTMLSelectElement).value;
    this.change.emit();
    this._controlValueAccessorChangeFn(this.selectedOption);
    this.markAsTouched();
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(option: string) {
    this.selectedOption = this.options.includes(option) ? option : this.label;
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param onChangeFn Callback to be registered.
   */
  registerOnChange(onChangeFn: (option: string) => void) {
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
   * Mark this group as being "touched" (for ngModel).
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
