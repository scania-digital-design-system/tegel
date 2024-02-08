import { Component, h, State, Prop, Event, EventEmitter, Element } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot prefix - Slot for the prefix in the Text Field
 * @slot suffix - Slot for the suffix in the Text Field
 */
@Component({
  tag: 'tds-text-field',
  styleUrl: 'text-field.scss',
  shadow: false,
  scoped: true,
})
export class TdsTextField {
  @Element() host: HTMLElement;

  /** Text input for focus state */
  textInput?: HTMLInputElement;

  /** Which input type, text, password or similar */
  @Prop({ reflect: true }) type: 'text' | 'password' | 'number' = 'text';

  /** Position of the label for the Text Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Label text */
  @Prop() label: string = '';

   /** Min allowed value for input type number */
  @Prop() min: string | number;

   /** Max allowed value for input type number */
  @Prop() max: string | number;

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

  /** Listen to the focus state of the input */
  @State() focusInput;

  /** Change event for the Text Field */
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

  /** Input event for the Text Field */
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

  /** Focus event for the Text Field */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleFocus(event): void {
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

  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
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
        ${this.noMinWidth ? 'form-text-field-nomin' : ''}
        ${
          this.focusInput && !this.disabled
            ? 'form-text-field text-field-focus'
            : ' form-text-field'
        }
        ${this.value ? 'text-field-data' : ''}
        ${
          this.labelPosition === 'inside' && this.size !== 'sm'
            ? 'text-field-container-label-inside'
            : ''
        }
        ${this.disabled ? 'form-text-field-disabled' : ''}
        ${this.readOnly ? 'form-text-field-readonly' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.size === 'md' ? 'form-text-field-md' : ''}
        ${this.size === 'sm' ? 'form-text-field-sm' : ''}
        ${this.state === 'error' || this.state === 'success' ? `form-text-field-${this.state}` : ''}
        `}
      >
        {this.labelPosition === 'outside' && (
          <div class="text-field-label-outside">
            <div>{this.label}</div>
          </div>
        )}
        <div onClick={() => this.textInput.focus()} class="text-field-container">
          {usesPrefixSlot && (
            <div class={`text-field-slot-wrap-prefix text-field-${this.state}`}>
              <slot name="prefix" />
            </div>
          )}

          <div class="text-field-input-container">
            <input
              ref={(inputEl) => (this.textInput = inputEl as HTMLInputElement)}
              class={`text-field-input text-field-input-${this.size}`}
              type={this.type}
              disabled={this.disabled}
              readonly={this.readOnly}
              placeholder={this.placeholder}
              value={this.value}
              autofocus={this.autofocus}
              maxlength={this.maxLength}
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
              <label class="text-field-label-inside">{this.label}</label>
            )}
          </div>
          <div class="text-field-bar"></div>

          {usesSuffixSlot && (
            <div class={`text-field-slot-wrap-suffix text-field-${this.state}`}>
              <slot name="suffix" />
            </div>
          )}
          <span class="text-field-icon__readonly">
            <tds-icon name="edit_inactive" size="20px"></tds-icon>
          </span>
          <span class="text-field-icon__readonly-label">This field is non-editable</span>
        </div>

        {(this.helper || this.maxLength > 0) && (
          <div class="text-field-helper">
            {this.state === 'error' && (
              <div class="text-field-helper-error-state">
                <tds-icon name="error" size="16px"></tds-icon>
                {this.helper}
              </div>
            )}
            {this.state !== 'error' && this.helper}

            {this.maxLength > 0 && (
              <div class="text-field-textcounter">
                {this.value === null ? 0 : this.value?.length}
                <span class="text-field-textcounter-divider"> / </span>
                {this.maxLength}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
