import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'tds-textarea',
  styleUrl: 'textarea.scss',
  shadow: false,
  scoped: true,
})
export class TdsTextarea {
  /** Text input for focus state */
  textEl?: HTMLTextAreaElement;

  /** Label text */
  @Prop() label: string = '';

  /** Name attribute */
  @Prop() name: string = '';

  /** Helper text */
  @Prop() helper: string;

  /** Textarea cols attribute */
  @Prop() cols: number;

  /** Textarea rows attribute */
  @Prop() rows: number;

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

  /** Error state of input */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Max length of input */
  @Prop() maxLength: number;

  /** Mode variant of the Textarea */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Control of autofocus */
  @Prop() autoFocus: boolean = false;

  /** Unset minimum width of 208px. */
  @Prop() noMinWidth: boolean = false;

  /** Listen to the focus state of the input */
  @State() focusInput;

  /** Change event for the Textarea */
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

  /** Blur event for the Textarea */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  handleBlur(event): void {
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
  tdsInput: EventEmitter<InputEvent>;

  // Data input event in value prop
  handleInput(event): void {
    this.tdsInput.emit(event);
    this.value = event.target.value;
  }

  /** Focus event for the Textarea */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /* Set the input as focus when clicking the whole textarea with suffix/prefix */
  handleFocus(event): void {
    this.textEl.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }

  render() {
    return (
      <div
        class={`
        textarea-container
        ${this.labelPosition === 'inside' ? 'textarea-label-inside' : ''}
        ${this.focusInput ? 'textarea-focus' : ''}
        ${this.disabled ? 'textarea-disabled' : ''}
        ${this.readOnly ? 'textarea-readonly' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.value ? 'textarea-data' : ''}
        ${this.state === 'error' || this.state === 'success' ? `textarea-${this.state}` : ''}
        ${this.noMinWidth ? 'no-min-width' : ''}
        `}
      >
        {this.labelPosition !== 'no-label' && <span class={'textarea-label'}>{this.label}</span>}
        <div class="textarea-wrapper">
          <textarea
            class={'textarea-input'}
            ref={(inputEl) => (this.textEl = inputEl as HTMLTextAreaElement)}
            disabled={this.disabled}
            readonly={this.readOnly}
            placeholder={this.placeholder}
            value={this.value}
            name={this.name}
            autofocus={this.autoFocus}
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
          ></textarea>
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
          <span class="textarea-icon__readonly">
            <tds-icon name="edit_inactive"></tds-icon>
          </span>
          <span class="textarea-icon__readonly-label">This field is non-editable</span>
        </div>
        <span class={'textarea-helper'}>
          {this.state === 'error' && <tds-icon name="error" size="16px"></tds-icon>}
          {this.helper}
        </span>

        {this.maxLength > 0 && (
          <div class={'textarea-textcounter'}>
            {this.value === null ? 0 : this.value?.length}
            <span class="textfield-textcounter-divider"> / </span> {this.maxLength}
          </div>
        )}
      </div>
    );
  }
}
