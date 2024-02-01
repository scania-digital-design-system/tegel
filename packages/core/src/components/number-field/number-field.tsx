import { Component, h, State, Prop, Event, EventEmitter, Element } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot prefix - Slot for the prefix in the Number Field
 * @slot suffix - Slot for the suffix in the Number Field
 */
@Component({
  tag: 'tds-number-field',
  styleUrl: 'number-field.scss',
  shadow: false,
  scoped: true,
})
export class TdsNumberField {
  @Element() host: HTMLElement;

  /** Number input for focus state */
  numberInput?: HTMLInputElement;

  /** Position of the label for the Number Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Label text */
  @Prop() label: string = '';

  /** Min allowed value for input type number */
  @Prop() min?: string | number;

  /** Max allowed value for input type number */
  @Prop() max?: string | number;

  /** Helper text */
  @Prop() helper: string;

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Value of the input */
  @Prop({ reflect: true }) value?: number;

  /** Set input in disabled state */
  @Prop() disabled: boolean = false;

  /** Set input in readonly state */
  @Prop() readOnly: boolean = false;

  /** Size of the input */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /** Mode variant of the Number Field */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Unset minimum width of 208px. */
  @Prop() noMinWidth: boolean = false;

  /** Name property */
  @Prop() name = '';

  /** Error state of input */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Autofocus for input */
  @Prop() autofocus: boolean = false;

  /** Listen to the focus state of the input */
  @State() focusInput;

  /** Change event for the Number Field */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange: EventEmitter;

  handleChange(event): void {
    this.tdsChange.emit(event);
  }

  /** Input event for the Number Field */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput: EventEmitter<InputEvent>;

  // Data input event in value prop
  handleInput(event): void {
    this.tdsInput.emit(event);
    this.value = event.target.value;
  }

  /** Focus event for the Number Field */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole Number Field with suffix/prefix */
  handleFocus(event): void {
    this.numberInput.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }

  /** Blur event for the Number Field */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole Number Field with suffix/prefix */
  handleBlur(event): void {
    this.focusInput = false;
    this.tdsBlur.emit(event);
  }

  render() {
    const usesPrefixSlot = hasSlot('prefix', this.host);
    const usesSuffixSlot = hasSlot('suffix', this.host);
    return (
      <div
        class={`
        ${this.noMinWidth ? 'form-number-field-nomin' : ''}
        ${
          this.focusInput && !this.disabled
            ? 'form-number-field number-field-focus'
            : ' form-number-field'
        }
        ${this.value ? 'number-field-data' : ''}
        ${
          this.labelPosition === 'inside' && this.size !== 'sm'
            ? 'number-field-container-label-inside'
            : ''
        }
        ${this.disabled ? 'form-number-field-disabled' : ''}
        ${this.readOnly ? 'form-number-field-readonly' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.size === 'md' ? 'form-number-field-md' : ''}
        ${this.size === 'sm' ? 'form-number-field-sm' : ''}
        ${
          this.state === 'error' || this.state === 'success'
            ? `form-number-field-${this.state}`
            : ''
        }
        `}
      >
        {this.labelPosition === 'outside' && (
          <div class="number-field-label-outside">
            <div>{this.label}</div>
          </div>
        )}
        <div onClick={() => this.numberInput.focus()} class="number-field-container">
          {usesPrefixSlot && (
            <div class={`number-field-slot-wrap-prefix number-field-${this.state}`}>
              <slot name="prefix" />
            </div>
          )}

          <div class="number-field-input-container">
            <input
              ref={(inputEl) => (this.numberInput = inputEl as HTMLInputElement)}
              class={`number-field-input number-field-input-${this.size}`}
              type="number"
              disabled={this.disabled}
              readonly={this.readOnly}
              placeholder={this.placeholder}
              value={this.value}
              autofocus={this.autofocus}
              name={this.name}
              min={this.min}
              max={this.max}
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
            />

            {this.labelPosition === 'inside' && this.size !== 'sm' && (
              <label class="number-field-label-inside">{this.label}</label>
            )}
          </div>
          <div class="number-field-bar"></div>

          {usesSuffixSlot && (
            <div class={`number-field-slot-wrap-suffix number-field-${this.state}`}>
              <slot name="suffix" />
            </div>
          )}
          <span class="number-field-icon__readonly">
            <tds-icon name="edit_inactive" size="20px"></tds-icon>
          </span>
          <span class="number-field-icon__readonly-label">This field is non-editable</span>
        </div>

        {this.helper && (
          <div class="number-field-helper">
            {this.state === 'error' && (
              <div class="number-field-helper-error-state">
                <tds-icon name="error" size="16px"></tds-icon>
                {this.helper}
              </div>
            )}
            {this.state !== 'error' && this.helper}
          </div>
        )}
      </div>
    );
  }
}
