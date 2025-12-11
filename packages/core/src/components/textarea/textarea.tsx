import { Component, h, Prop, State, Event, EventEmitter, Method, Element } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import { getAriaInvalid } from '../../utils/getAriaInvalid';

@Component({
  tag: 'tds-textarea',
  styleUrl: 'textarea.scss',
  shadow: false,
  scoped: true,
})
export class TdsTextarea {
  @Element() host!: HTMLElement;

  /** Text input for focus state */
  textEl?: HTMLTextAreaElement;

  private uuid: string = generateUniqueId();

  /** Label text */
  @Prop() label: string = '';

  /** Name attribute */
  @Prop() name: string = '';

  /** Helper text */
  @Prop() helper?: string;

  /** Textarea cols attribute */
  @Prop() cols?: number;

  /** Textarea rows attribute */
  @Prop() rows?: number;

  /** Position of the label for the Textarea. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Value of the input text */
  @Prop() value: string = '';

  /** Set input in disabled state */
  @Prop() disabled: boolean = false;

  /** Set input in readonly state */
  @Prop() readOnly: boolean = false;

  /** Hide the readonly icon */
  @Prop() hideReadOnlyIcon: boolean = false;

  /** Error state of input */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Max length of input */
  @Prop() maxLength?: number;

  /** Mode variant of the Textarea */
  @Prop() modeVariant: 'primary' | 'secondary' | null = null;

  /** Control of autofocus */
  @Prop() autofocus: boolean = false;

  /** Unset minimum width of 208px. */
  @Prop() noMinWidth: boolean = false;

  /** Value to be used for the aria-label attribute. Can be used for announcing that readOnly prop is set to true. */
  @Prop() tdsAriaLabel?: string;

  /** Listen to the focus state of the input */
  @State() focusInput: boolean = false;

  /** Change event for the Textarea */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange!: EventEmitter;

  handleChange(event): void {
    this.tdsChange.emit(event);
  }

  /** Blur event for the Textarea */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur!: EventEmitter<FocusEvent>;

  handleBlur(event: FocusEvent): void {
    this.tdsBlur.emit(event);
    this.focusInput = false;
  }

  /** Input event for the Textarea */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput!: EventEmitter<InputEvent>;

  // Data input event in value prop
  handleInput(event: InputEvent): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.value = event.target.value;
      this.tdsInput.emit(event);
    }
  }

  /** Focus event for the Textarea */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus!: EventEmitter<FocusEvent>;

  /* Set the input as focus when clicking the whole textarea with suffix/prefix */
  handleFocus(event: FocusEvent): void {
    this.textEl?.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }

  /** Method to programmatically focus the textarea element */
  @Method()
  async focusElement() {
    if (this.textEl) {
      this.textEl.focus();
      this.focusInput = true;
    }
  }

  setModeVariant(modeVariant: 'primary' | 'secondary' | null): string | null {
    if (this.readOnly && modeVariant === 'primary') {
      return 'secondary';
    }
    if (this.readOnly && modeVariant === 'secondary') {
      return 'primary';
    }
    return modeVariant;
  }

  render() {
    return (
      <div
        class={{
          'textarea-container': true,
          'textarea-label-inside': this.labelPosition === 'inside',
          'textarea-focus': this.focusInput,
          'textarea-disabled': this.disabled,
          'textarea-readonly': !this.disabled && this.readOnly,
          [`tds-mode-variant-${this.setModeVariant(this.modeVariant)}`]: true,
          'textarea-data': this.value !== '',
          [`textarea-${this.state}`]: this.state === 'error' || this.state === 'success',
          'no-min-width': this.noMinWidth,
        }}
      >
        {this.labelPosition !== 'no-label' && (
          <label htmlFor={`textarea-element-${this.uuid}`} class={'textarea-label'}>
            {this.label}
          </label>
        )}
        <div class="textarea-wrapper">
          <textarea
            id={`textarea-element-${this.uuid}`}
            class={'textarea-input'}
            ref={(inputEl: HTMLTextAreaElement) => {
              this.textEl = inputEl;
            }}
            disabled={this.disabled}
            readonly={!this.disabled && this.readOnly}
            placeholder={this.placeholder}
            value={this.value}
            name={this.name}
            autofocus={this.autofocus}
            maxlength={this.maxLength}
            cols={this.cols}
            rows={this.rows}
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
            onInput={(event) => this.handleInput(event)}
            onChange={(event) => this.handleChange(event)}
            aria-invalid={getAriaInvalid(this.host, this.state)}
            aria-readonly={this.readOnly ? 'true' : 'false'}
            aria-label={this.tdsAriaLabel ? this.tdsAriaLabel : this.label}
            aria-describedby={`textarea-helper-element-${this.uuid}`}
          />
          <span class="textarea-resizer-icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8536 0.853553C12.0488 0.658291 12.0488 0.341709 11.8536 0.146447C11.6583 -0.0488155 11.3417 -0.0488155 11.1464 0.146447L0.146447 11.1464C-0.0488155 11.3417 -0.0488155 11.6583 0.146447 11.8536C0.341709 12.0488 0.658291 12.0488 0.853553 11.8536L11.8536 0.853553ZM11.8536 4.64645C12.0488 4.84171 12.0488 5.15829 11.8536 5.35355L5.35355 11.8536C5.15829 12.0488 4.84171 12.0488 4.64645 11.8536C4.45118 11.6583 4.45118 11.3417 4.64645 11.1464L11.1464 4.64645C11.3417 4.45118 11.6583 4.45118 11.8536 4.64645ZM11.8536 8.64645C12.0488 8.84171 12.0488 9.15829 11.8536 9.35355L9.35355 11.8536C9.15829 12.0488 8.84171 12.0488 8.64645 11.8536C8.45118 11.6583 8.45118 11.3417 8.64645 11.1464L11.1464 8.64645C11.3417 8.45118 11.6583 8.45118 11.8536 8.64645Z"
                fill="currentColor"
              />
            </svg>
          </span>
          {!this.disabled && !this.hideReadOnlyIcon && this.readOnly && (
            <span class="textarea-icon__readonly">
              <tds-tooltip
                placement="top-end"
                text="This field is non-editable"
                selector="#readonly-tooltip"
              />
              <tds-icon id="readonly-tooltip" name="edit_inactive" svgTitle="inactive" />
            </span>
          )}
        </div>

        <span
          class={'textarea-helper'}
          aria-live="assertive"
          id={`textarea-helper-element-${this.uuid}`}
        >
          {this.state === 'error' && this.helper && !this.readOnly && (
            <tds-icon name="error" size="16px" />
          )}
          {this.helper}
        </span>

        {(this.maxLength ?? 0) > 0 && (
          <div class={'textarea-textcounter'}>
            {this.value === null ? 0 : this.value?.length}
            <span class="textfield-textcounter-divider"> / </span> {this.maxLength}
          </div>
        )}
      </div>
    );
  }
}
