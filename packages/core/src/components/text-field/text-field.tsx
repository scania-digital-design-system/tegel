import { Component, Element, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';
import generateUniqueId from '../../utils/generateUniqueId';
import { getAdjustedModeVariant } from '../../utils/modeVariantOverride';

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

  /** Listen to the focus state of the input */
  @State() focusInput: boolean = false;

  private mutationObserver: MutationObserver;

  private insideModal: boolean = false;

  /** The mode variant needs to be swapped if the text-field is inside a modal and darkmode is used, for consistency in design */
  @State() swapModeVariant: boolean = false;

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

  // Data input event in value prop
  handleInput(event: InputEvent): void {
    const inputEl = event.target as HTMLInputElement;
    let { value } = inputEl;

    // Custom handling of number inputs when min/max are set
    if (this.type === 'number') {
      const numericValue = Number(value);

      if (this.min !== undefined && numericValue < Number(this.min)) {
        value = String(this.min);
      }

      if (this.max !== undefined && numericValue > Number(this.max)) {
        value = String(this.max);
      }

      inputEl.value = value;
    }

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

  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleBlur(event): void {
    this.focusInput = false;
    this.tdsBlur.emit(event);
  }

  /** Method to handle focus */
  @Method()
  async focusElement() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  connectedCallback() {
    if (!this.tdsAriaLabel) {
      console.warn('Tegel Text Field component: prop tdsAriaLabel is missing');
    }
  }

  private checkIfDarkmode() {
    const darkmode = document.body.classList.contains('tds-mode-dark');
    this.swapModeVariant = this.insideModal && darkmode;
  }

  private observeClassChanges() {
    this.mutationObserver = new MutationObserver(() => {
      this.checkIfDarkmode();
    });

    this.mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  componentDidLoad() {
    this.insideModal = !!this.host.closest('tds-modal');

    if (this.insideModal) {
      this.observeClassChanges();
      this.checkIfDarkmode();
    }
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
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
          [getAdjustedModeVariant(this.modeVariant, this.swapModeVariant, this.readOnly)]: true,
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
              aria-label={this.tdsAriaLabel ? this.tdsAriaLabel : this.label}
              aria-describedby={`text-field-helper-element-${this.uuid}`}
              aria-readonly={this.readOnly}
              id={`text-field-input-element-${this.uuid}`}
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

          <div class="text-field-bar"></div>

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
              <tds-icon name="edit_inactive" size="20px" />
            </span>
          )}
          <span class="text-field-icon__readonly-label">This field is non-editable</span>
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
