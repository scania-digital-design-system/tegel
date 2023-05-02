import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sdds-textfield',
  styleUrl: 'textfield.scss',
  shadow: false,
  scoped: true,
})
export class Textfield {
  /** Textinput for focus state */
  textInput?: HTMLInputElement;

  /** Which input type, text, password or similar */
  @Prop({ reflect: true }) type: 'text' | 'password' = 'text';

  /** Position of the label for the textfield. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Label text */
  @Prop() label: string = '';

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

  /** Mode variant of the textfield */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** With setting */
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

  /** Change event for the textfield */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsChange: EventEmitter;

  handleChange(event): void {
    this.sddsChange.emit(event);
  }

  /** Input event for the textfield */
  @Event({
    eventName: 'sddsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsInput: EventEmitter<InputEvent>;

  // Data input event in value prop
  handleInput(event): void {
    this.sddsInput.emit(event);
    this.value = event.target.value;
  }

  /** Focus event for the textfield */
  @Event({
    eventName: 'sddsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsFocus: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole textfield with suffix/prefix */
  handleFocus(event): void {
    this.textInput.focus();
    this.focusInput = true;
    this.sddsFocus.emit(event);
  }

  /** Blur event for the textfield */
  @Event({
    eventName: 'sddsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  sddsBlur: EventEmitter<FocusEvent>;

  /** Set the input as focus when clicking the whole textfield with suffix/prefix */
  handleBlur(event): void {
    this.focusInput = false;
    this.sddsBlur.emit(event);
  }

  render() {
    return (
      <div
        class={`
        ${this.noMinWidth ? 'form-textfield-nomin' : ''}
        ${this.focusInput && !this.disabled ? 'form-textfield textfield-focus' : ' form-textfield'}
        ${this.value ? 'textfield-data' : ''}
        ${
          this.labelPosition === 'inside' && this.size !== 'sm'
            ? 'textfield-container-label-inside'
            : ''
        }
        ${this.disabled ? 'form-textfield-disabled' : ''}
        ${this.readOnly ? 'form-textfield-readonly' : ''}
        ${this.modeVariant !== null ? `sdds-mode-variant-${this.modeVariant}` : ''}
        ${this.size === 'md' ? 'form-textfield-md' : ''}
        ${this.size === 'sm' ? 'form-textfield-sm' : ''}
        ${this.state === 'error' || this.state === 'success' ? `form-textfield-${this.state}` : ''}
        `}
      >
        {this.labelPosition === 'outside' && (
          <div class="textfield-label-outside">
            <div>{this.label}</div>
          </div>
        )}
        <div onClick={() => this.textInput.focus()} class="textfield-container">
          <div class={`textfield-slot-wrap-prefix textfield-${this.state}`}>
            <slot name="prefix" />
          </div>

          <div class="textfield-input-container">
            <input
              ref={(inputEl) => (this.textInput = inputEl as HTMLInputElement)}
              class={`textfield-input textfield-input-${this.size}`}
              type={this.type}
              disabled={this.disabled}
              readonly={this.readOnly}
              placeholder={this.placeholder}
              value={this.value}
              autofocus={this.autofocus}
              maxlength={this.maxLength}
              name={this.name}
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
              <label class="textfield-label-inside">{this.label}</label>
            )}
          </div>
          <div class="textfield-bar"></div>

          <div class={`textfield-slot-wrap-suffix textfield-${this.state}`}>
            <slot name="suffix" />
          </div>
          <span class="textfield-icon__readonly">
            <sdds-icon name="edit_inactive" size="20px"></sdds-icon>
          </span>
          <span class="textfield-icon__readonly-label">This field is non-editable</span>
        </div>

        <div class="textfield-helper">
          {this.state === 'error' && (
            <div class="textfield-helper-error-state">
              <sdds-icon name="error" size="16px"></sdds-icon>
              {this.helper}
            </div>
          )}
          {this.state !== 'error' && this.helper}

          {this.maxLength > 0 && (
            <div class="textfield-textcounter">
              {this.value === null ? 0 : this.value?.length}
              <span class="textfield-textcounter-divider"> / </span>
              {this.maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
}
