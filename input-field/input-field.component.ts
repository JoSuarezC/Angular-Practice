import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Host,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';

type InputType = 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text';
type InputMode = 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email';

/* Counter variable to add a unique id for the input component. */
let nextUniqueId = 0;

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputFieldComponent
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() formControlName: string;

  @Input('aria-describedby') ariaDescribedby?: string | null = '';
  @Input('aria-labelledby') ariaLabelledby?: string;
  @Input() inputmode: InputMode = 'text';
  @Input() min?: number;
  @Input() pattern?: string | RegExp;
  @Input() placeholder?: string;
  @Input() type: InputType = 'text';
  @Input() value?: string = '';
  @Input() showError?: boolean;
  @Input() messageOnError?: string
  @Input() isSmallMarginOnMobile?: boolean;;

  private _uid = `app-input-field-${nextUniqueId++}`;
  private _id: string = this._uid;
  errorID = `${this._uid}-error`;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }

  protected _required: boolean | undefined;
  @Input()
  get required(): boolean {
    return this.controlContainer?.control?.get(this.formControlName)?.hasValidator(Validators.required) ?? false;
  }
  set required(value: boolean) {
    this._required = value;
  }

  @Output() change = new EventEmitter();
  @Output() input = new EventEmitter();

  // Control Value Accessor properties
  isFilled: boolean = false;
  touched: boolean = false;
  disabled: boolean = false;

  _controlValueAccessorChangeFn = (value: string) => {};
  _controlValueAccessorTouchedFn = () => {};

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  /**
   * We're getting the value from the event, setting the value of the input, setting the value of the
   * isFilled variable, setting the value of the controlValueAccessorChangeFn, marking the input as
   * touched, and emitting the change event
   * @param {Event} event - Event - The event object that is passed to the function.
   */
  handleChange(event: Event): void {
    this.value = (<HTMLInputElement>event.target).value;
    this.isFilled = !!this.value;
    this._controlValueAccessorChangeFn(this.value);
    this.markAsTouched();
    this.change.emit();
  }

  handleInputEvent(event: Event): void {
    this.input.emit();
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: string) {
    this.value = value;
    this.isFilled = !!this.value;
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
   * Mark this component as being 'touched' (for ngModel).
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
