import { Component, Element, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';
import generateUniqueId from '../../utils/generateUniqueId';
import { getAriaInvalid } from '../../utils/getAriaInvalid';

/**
 * @slot prefix - Slot for the prefix in the component.
 * @slot suffix - Slot for the suffix in the component. Suffix is hidden when the input is in readonly state.
 */
@Component({
  tag: 'tds-text-field',
  styleUrl: 'text-field.scss',
  shadow: false,
  scoped: true,
})
export class TdsTextField {
  @Element() host: HTMLElement;

  private uuid: string = generateUniqueId();

  /** Text input for focus state */
  textInput?: HTMLInputElement;

  /** Which input type, text, password or similar */
  @Prop({ reflect: true }) type: 'text' | 'password' | 'number' | 'email' | 'tel' = 'text';

  /** Position of the label for the Text Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Label text */
  @Prop() label: string = '';

  /** Min allowed value for input type number */
  @Prop() min: string | number;

  /** Max allowed value for input type number */
  @Prop() max: string | number;

  /** Step value for input type number */
  @Prop() step: string | number;

  /** Helper text */
  @Prop() helper: string;

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Value of the input text */
  @Prop({ reflect: true }) value: string = '';

  /** Set input in disabled state */
  @Prop() disabled: boolean = false;

  /** Set input in readonly state */
  @Prop() readOnly: boolean = false;

  /** Hides the read-only icon in the Text Field. Requires Read Only to be enabled. */
  @Prop() hideReadOnlyIcon: boolean = false;

  /** Size of the input */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /** Mode variant of the Text Field */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Unset minimum width of 208px. */
  @Prop() noMinWidth: boolean = false;

  /** Name property */
  @Prop() name = '';

  /** Error state of input */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Max length of input */
  @Prop() maxLength: number;

  /** Autofocus for input */
  @Prop() autofocus: boolean = false;

  /** Value to be used for the aria-label attribute. Can be used for announcing that readOnly prop is set to true. */
  @Prop() tdsAriaLabel: string;

  /** Makes the text field required */
  @Prop() required: boolean = false;

  /** Value to be used for the text field's autocomplete attribute */
  @Prop() autocomplete: string = 'off';

  /** Hides the native arrows on number input type */
  @Prop() hideNumberArrows: boolean = false;

  /** Listen to the focus state of the input */
  @State() focusInput: boolean = false;

  /** Change event for the Text Field */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange: EventEmitter;

  handleChange(event: Event): void {
    this.tdsChange.emit(event);
  }

  /** Input event for the Text Field */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput: EventEmitter<InputEvent>;

  /** Data input event in value prop */
  handleInput(event: InputEvent): void {
    const inputEl = event.target as HTMLInputElement;
    const { value } = inputEl;

    this.value = value;
    this.tdsInput.emit(event);
  }

  /** Focus event for the Text Field */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleFocus(event: FocusEvent): void {
    this.textInput.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }

  /** Blur event for the Text Field */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  /** Error event for the Text Field - emitted when value is clamped to min/max */
  @Event({
    eventName: 'tdsError',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsError: EventEmitter<{ originalValue: string; clampedValue: string; reason: 'min' | 'max' }>;

  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleBlur(event): void {
    this.focusInput = false;

    /** Custom handling of number inputs when min/max are set */
    if (this.type === 'number' && this.textInput) {
      const numericValue = Number(this.textInput.value);

      if (!isNaN(numericValue) && this.textInput.value.trim() !== '') {
        const originalValue = this.textInput.value;
        let clampedValue = originalValue;
        let clampReason: 'min' | 'max' | null = null;

        if (this.min !== undefined && numericValue < Number(this.min)) {
          clampedValue = String(this.min);
          clampReason = 'min';
        }

        if (this.max !== undefined && numericValue > Number(this.max)) {
          clampedValue = String(this.max);
          clampReason = 'max';
        }

        if (clampedValue !== originalValue && clampReason) {
          this.textInput.value = clampedValue;
          this.value = clampedValue;
          this.tdsError.emit({
            originalValue,
            clampedValue,
            reason: clampReason,
          });
        }
      }
    }

    this.tdsBlur.emit(event);
  }

  /** Method to handle focus */
  @Method()
  async focusElement() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    const usesPrefixSlot = hasSlot('prefix', this.host);
    const usesSuffixSlot = hasSlot('suffix', this.host);

    return (
      <div
        class={{
          'form-text-field': true,
          'form-text-field-nomin': this.noMinWidth,
          'text-field-focus': this.focusInput && !this.disabled,
          'text-field-data': this.value !== '' && this.value !== null,
          'text-field-container-label-inside':
            this.labelPosition === 'inside' && this.size !== 'sm',
          'form-text-field-disabled': this.disabled,
          'form-text-field-readonly': this.disabled ? false : this.readOnly,
          'tds-mode-variant-primary': this.readOnly
            ? this.modeVariant === 'secondary'
            : this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.readOnly
            ? this.modeVariant === 'primary'
            : this.modeVariant === 'secondary',
          'form-text-field-md': this.size === 'md',
          'form-text-field-sm': this.size === 'sm',
          'form-text-field-error': this.state === 'error',
          'form-text-field-success': this.state === 'success',
        }}
      >
        {this.labelPosition === 'outside' && (
          <div class="text-field-label-outside">
            <label htmlFor={`text-field-input-element-${this.uuid}`}>{this.label}</label>
          </div>
        )}
        <div onClick={() => this.textInput.focus()} class="text-field-container">
          {usesPrefixSlot && (
            <div
              class={{
                'text-field-slot-wrap-prefix': true,
                'text-field-error': this.state === 'error',
                'text-field-success': this.state === 'success',
                'text-field-default': this.state === 'default',
              }}
            >
              <slot name="prefix" />
            </div>
          )}

          <div class="text-field-input-container">
            <input
              ref={(inputEl) => {
                this.textInput = inputEl as HTMLInputElement;
              }}
              class={{
                'text-field-input': true,
                'text-field-input-sm': this.size === 'sm',
                'text-field-input-md': this.size === 'md',
                'text-field-input-lg': this.size === 'lg',
                'text-field-input-no-arrows': this.hideNumberArrows,
              }}
              type={this.type}
              disabled={this.disabled}
              readonly={this.disabled ? false : this.readOnly}
              placeholder={this.placeholder}
              value={this.value}
              autofocus={this.autofocus}
              maxlength={this.maxLength}
              name={this.name}
              min={this.min}
              max={this.max}
              step={this.step}
              onInput={(event) => this.handleInput(event)}
              onChange={(event) => this.handleChange(event)}
              onFocus={(event) => {
                if (!this.readOnly) {
                  this.handleFocus(event);
                }
              }}
              onBlur={(event) => {
                if (!this.readOnly) {
                  this.handleBlur(event);
                }
              }}
              aria-invalid={getAriaInvalid(this.host, this.state)}
              aria-label={this.tdsAriaLabel ? this.tdsAriaLabel : this.label}
              aria-describedby={`text-field-helper-element-${this.uuid}`}
              aria-readonly={this.readOnly}
              id={`text-field-input-element-${this.uuid}`}
              required={this.required}
              autocomplete={this.autocomplete}
            />

            {this.labelPosition === 'inside' && this.size !== 'sm' && (
              <label
                class="text-field-label-inside"
                htmlFor={`text-field-input-element-${this.uuid}`}
              >
                {this.label}
              </label>
            )}
          </div>

          {usesSuffixSlot && (
            <div
              class={{
                'text-field-slot-wrap-suffix': true,
                'text-field-error': this.state === 'error',
                'text-field-success': this.state === 'success',
                'text-field-default': this.state === 'default',
                'tds-u-display-none': this.readOnly,
              }}
            >
              <slot name="suffix" />
            </div>
          )}

          {this.readOnly && !this.hideReadOnlyIcon && (
            <span class="text-field-icon__readonly">
              <tds-tooltip
                placement="top-end"
                text="This field is non-editable"
                selector="#readonly-tooltip"
              />
              <tds-icon id="readonly-tooltip" name="edit_inactive" size="20px" />
            </span>
          )}
        </div>

        <div aria-live="assertive">
          {(this.helper || this.maxLength > 0) && (
            <div class="text-field-helper" id={`text-field-helper-element-${this.uuid}`}>
              {this.state === 'error' && (
                <div class="text-field-helper-error-state">
                  {!this.readOnly && <tds-icon name="error" size="16px" />}
                  {this.helper}
                </div>
              )}
              {this.state !== 'error' && this.helper}

              {!this.readOnly && this.maxLength > 0 && (
                <span
                  class={{
                    'text-field-textcounter-divider': true,
                    'text-field-textcounter-disabled': this.disabled,
                  }}
                >
                  {this.value === null ? 0 : this.value?.length} / {this.maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
