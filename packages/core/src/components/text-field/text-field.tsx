import { Component, Element, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

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

  /** Set input in readonly state. Hides the suffix slot if true. */
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
    this.value = event.target.value;
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
  handleFocus(event): void {
    // console.log('focuz 1');
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
    // console.log('FOCUZ');
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    const usesPrefixSlot = hasSlot('prefix', this.host);
    const usesSuffixSlot = hasSlot('suffix', this.host);

    // console.log('----- activeelement is ', document.activeElement);

    // const inputElement = document.getElementById('my-input-1');

    // console.log(document.activeElement == inputElement);

    // console.log('----- HEJ:');
    // console.log(document.getElementById('text-field-label'));
    console.log('re-render');

    // this.state = this.value.length === 5 ? 'error' : 'success';

    if (this.value.length === 5) {
      this.state = 'error';
    } else if (this.value.length < 5) {
      this.state = 'default';
    } else {
      this.state = 'success';
    }

    return (
      // <div style={{ backgroundColor: 'orange', padding: '10px' }} contentEditable={true}>
      <div
        // contentEditable={true}
        // tabIndex={1}

        // aria-live="polite"
        class={{
          'form-text-field': true,
          'form-text-field-nomin': this.noMinWidth,
          'text-field-focus': this.focusInput && !this.disabled,
          'text-field-data': this.value !== '' && this.value !== null,
          'text-field-container-label-inside':
            this.labelPosition === 'inside' && this.size !== 'sm',
          'form-text-field-disabled': this.disabled,
          'form-text-field-readonly': this.readOnly,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
          'form-text-field-md': this.size === 'md',
          'form-text-field-sm': this.size === 'sm',
          'form-text-field-error': this.state === 'error',
          'form-text-field-success': this.state === 'success',
        }}
        id="teeeest"

        // style={this.focusInput && {backgroundColor: "orange", padding: "10px"}}
      >
        {this.labelPosition === 'outside' && (
          <div class="text-field-label-outside">
            <div>
              {this.label} ----- {String(this.focusInput)} ____ {document.activeElement}
            </div>
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
              id="my-input-1"
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
              readonly={this.readOnly}
              placeholder={this.readOnly && this.focusInput ? undefined : this.placeholder}
              value={this.value}
              autofocus={this.autofocus}
              maxlength={this.maxLength}
              name={this.name}
              min={this.min}
              max={this.max}
              onInput={(event) => this.handleInput(event)}
              onChange={(event) => this.handleChange(event)}
              onFocus={(event) => {
                this.handleFocus(event);
              }}
              onBlur={(event) => {
                this.handleBlur(event);
              }}
              aria-label={this.label}
              // aria-describedby="text-field-label"
              // aria-live={this.state === 'error' ? 'Errorrrrrrz' : undefined}
            />

            {this.labelPosition === 'inside' && this.size !== 'sm' && (
              <label class="text-field-label-inside" id="text-field-label">
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
          <span class="text-field-icon__readonly">
            <tds-icon name="edit_inactive" size="20px"></tds-icon>
          </span>
          <span class="text-field-icon__readonly-label">This field is non-editable</span>
        </div>

        {/* <div
          aria-live="assertive"
          // aria-atomic="true"

          //
        >
          hej hej hej {this.helper} {this.state === 'error' && 'ERROR ALSOOOO'}
        </div> */}

        <div aria-live="assertive">
          {this.state === 'error' ? (
            <span key={Date.now()}>{this.helper} ERROR ALSOOOO</span>
          ) : (
            this.helper
          )}
        </div>

        <div style={{ backgroundColor: 'yellow' }}>
          {(this.helper || this.maxLength > 0) && (
            <div class="text-field-helper">
              {this.state === 'error' && (
                <div class="text-field-helper-error-state">
                  <tds-icon name="error" size="16px"></tds-icon>
                  {this.helper} HERE IS THE ERROR MESSAGE MAN
                </div>
              )}
              {this.state !== 'error' && this.helper}

              {this.maxLength > 0 && (
                <div
                  class={{
                    'text-field-textcounter': true,
                    'text-field-textcounter-disabled': this.disabled,
                  }}
                >
                  {this.value === null ? 0 : this.value?.length}
                  <span
                    class={{
                      'text-field-textcounter-divider': true,
                      'text-field-textcounter-disabled': this.disabled,
                    }}
                  >
                    {' '}
                    /{' '}
                  </span>
                  {this.maxLength}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      // </div>
    );
  }
}
