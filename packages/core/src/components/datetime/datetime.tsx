import { Component, State, h, Prop, Listen, Event, EventEmitter, Method } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

@Component({
  tag: 'tds-datetime',
  styleUrl: 'datetime.scss',
  shadow: false,
  scoped: true,
})
export class TdsDatetime {
  /** Text-input for focus state */
  private textInput!: HTMLInputElement;

  /** Sets an input type */
  @Prop({ reflect: true }) type: 'datetime-local' | 'date' | 'month' | 'week' | 'time' =
    'datetime-local';

  /** Value of the input text */
  @Prop({ reflect: true, mutable: true }) value = '';

  /** Sets min value.<br/>Example for different types:<br/>datetime="2023-01-31T00:00"<br/>date="2023-01-01"<br/>month="2023-01"<br/>week="2023-W02"<br/>time="15:00" */
  @Prop() min?: string;

  /** Sets max value.<br/>Example for different types:<br/>datetime="2023-01-31T00:00"<br/>date="2023-01-01"<br/>month="2023-01"<br/>week="2023-W02"<br/>time="15:00" */
  @Prop() max?: string;

  /** Default value of the component.<br/>Format for date-time: yyyy-MM-ddTHH:mm.<br/>Format for date: yyyy-MM-dd.<br/>Format for month: yyyy-MM.<br/>Format for week: yyyy-Www.<br/>Format for time: HH:mm. */
  @Prop() defaultValue: string | 'none' = 'none';

  /** Set input in disabled state */
  @Prop() disabled: boolean = false;

  /** Size of the input */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /** Resets min width rule */
  @Prop() noMinWidth: boolean = false;

  /** Set the variant of the Datetime component. */
  @Prop() modeVariant: 'primary' | 'secondary' | null = null;

  /** Name property. Uses a unique ID as fallback if not specified. */
  @Prop() name = `datetime-${generateUniqueId()}`;

  /** Switches between success and error state. */
  @Prop({ mutable: true }) state?: 'none' | 'success' | 'error';

  /** Autofocus for input */
  @Prop() autofocus: boolean = false;

  /** Label text for the component */
  @Prop() label: string = '';

  /** Position of the label */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Default contextual helper text for the component for states = success or none */
  @Prop() helper: string = '';

  /** Contextual helper text for the component for error state */
  @Prop() helperError?: string;

  /** Contextual helper text for the component when input is invalid */
  @Prop() helperErrorInvalid?: string = 'Invalid input';

  /** Value for the aria-label attribute */
  @Prop() tdsAriaLabel?: string;

  /** Listen to the focus state of the input */
  @State() focusInput: boolean = false;

  /** Change event for the Datetime */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange!: EventEmitter;

  /** Blur event for the Datetime */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur!: EventEmitter<FocusEvent>;

  /** Focus event for the Datetime */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus!: EventEmitter<FocusEvent>;

  /** Input event for the Datetime */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput!: EventEmitter<InputEvent>;

  /** Method that resets the value of the Datetime, using defaultValue if is not 'none' */
  @Method()
  async reset() {
    this.internalReset();
    this.tdsChange.emit({
      name: this.name,
      value: this.value,
    });
  }

  /** Method that sets the value of the datetime element */
  @Method()
  async setValue(newValue: string) {
    this.value = newValue;
  }

  /** Method to programmatically focus the datetime element */
  @Method()
  async focusElement() {
    if (this.textInput) {
      this.textInput.focus();
      this.focusInput = true;
    }
  }

  getDefaultValue = () => {
    const dateTimeObj = {
      year: this.defaultValue.slice(0, 4),
      month: this.defaultValue.slice(5, 7),
      week: this.defaultValue.slice(6, 8),
      day: this.defaultValue.slice(8, 10),
      hours: this.defaultValue.slice(11, 13),
      minutes: this.defaultValue.slice(14, 16),
    };

    switch (this.type) {
      case 'datetime-local':
        return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}T${dateTimeObj.hours}:${dateTimeObj.minutes}`;
      case 'date':
        return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}`;
      case 'month':
        return `${dateTimeObj.year}-${dateTimeObj.month}`;
      case 'week':
        return `${dateTimeObj.year}-W${dateTimeObj.week}`;
      case 'time':
        return `${this.defaultValue.slice(0, 2)}:${this.defaultValue.slice(3, 5)}`;
      default:
        throw new Error('Invalid type.');
    }
  };

  componentWillLoad() {
    if (this.defaultValue !== 'none') {
      this.value = this.getDefaultValue();
    }
  }

  // Listener if input enters focus state
  @Listen('focusin')
  handleFocusIn() {
    this.focusInput = true;
  }

  // Listener if input leaves focus state
  @Listen('focusout')
  handleFocusOut() {
    this.focusInput = false;
  }

  private validateDate = () => {
    this.state = 'none';
    if (
      (this.min && this.textInput.validity.rangeUnderflow) ||
      (this.max && this.textInput.validity.rangeOverflow) ||
      this.textInput.validity.badInput
    ) {
      this.state = 'error';
    }
  };

  // Data input event in value prop
  handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this.tdsInput.emit(e);
  }

  // Change event isn't a composed:true by default in for input
  handleChange(e: Event): void {
    this.tdsChange.emit(e);
  }

  /** Set the input as focus when clicking the whole Datetime with suffix/prefix */
  handleFocusClick(e: FocusEvent): void {
    this.textInput.focus();
    this.tdsFocus.emit(e);
  }

  /** Set the input as focus when clicking the whole Datetime with suffix/prefix */
  handleBlur(e: FocusEvent): void {
    this.textInput.blur();

    this.validateDate();

    this.tdsBlur.emit(e);
  }

  /** Method that resets the dateteime without emitting an event. */
  private internalReset() {
    const value = '';
    if (this.defaultValue !== 'none') {
      this.value = this.getDefaultValue();
    }
    this.value = value;
  }

  // iOS native date picker doesn't support min/max in the UI; we rely on validation + error message.
  // The .iphone class enables iOS-specific styling for error/success states.
  render() {
    const iphone = navigator.userAgent.toLowerCase().includes('iphone');

    let className = ' tds-datetime-input';
    if (this.size === 'md') {
      className += `${className}-md`;
    }
    if (this.size === 'sm') {
      className += `${className}-sm`;
    }
    if (iphone) {
      className += ' iphone';
    }

    const classNames = {
      'tds-form-datetime-nomin': this.noMinWidth,
      'tds-form-datetime': true,
      'tds-datetime-focus': this.focusInput,
      'tds-datetime-data': this.value.length > 0,
      'tds-form-datetime-disabled': this.disabled,
      [`tds-form-datetime-${this.size}`]: ['md', 'sm'].includes(this.size),
      [`tds-form-datetime-${this.state}`]: ['error', 'success'].includes(`${this.state}`),
      [`tds-mode-variant-${this.modeVariant}`]: this.modeVariant !== null,
      'tds-datetime-container-label-inside': !!(
        this.label &&
        this.labelPosition === 'inside' &&
        this.size !== 'sm'
      ),
    };

    return (
      <div
        class={classNames}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const browserIsChrome = navigator.userAgent.toLowerCase().includes('chrome');
            if (browserIsChrome) {
              // showPicker currently only works reliably for date inputs in Chrome and Chromium-based browsers:
              this.textInput.showPicker();
            }
          }
        }}
      >
        {this.labelPosition === 'outside' && this.label && (
          <label htmlFor={this.name} class="tds-datetime-label">
            {this.label}
          </label>
        )}
        <div onClick={(e) => this.handleFocusClick(e)} class="tds-datetime-container">
          <div class={`tds-datetime-input-container type-${this.type}`}>
            <input
              ref={(inputEl: HTMLInputElement) => {
                if (inputEl) this.textInput = inputEl;
              }}
              class={className}
              type={this.type}
              disabled={this.disabled}
              value={this.value}
              min={this.min}
              max={this.max}
              autofocus={this.autofocus}
              name={this.name}
              id={this.name}
              onInput={(e) => this.handleInput(e)}
              onBlur={(e) => this.handleBlur(e)}
              onChange={(e) => this.handleChange(e)}
              aria-label={this.tdsAriaLabel ? this.tdsAriaLabel : this.label}
            />

            {this.labelPosition === 'inside' && this.size !== 'sm' && this.label && (
              <label class="tds-datetime-label-inside" htmlFor={this.name}>
                {this.label}
              </label>
            )}

            <div class="datetime-icon icon-datetime-local">
              <tds-icon size="20px" name="calendar" svgTitle="Calendar" />
            </div>

            <div class="datetime-icon icon-time">
              <tds-icon size="20px" name="clock" svgTitle="Clock" />
            </div>
          </div>
        </div>
        {this.state === 'error' && (
          <div class="tds-datetime-helper">
            {(!this.textInput || !this.textInput.validity.badInput) && (
              <div class="tds-helper">
                <tds-icon name="error" size="16px" svgTitle="error" /> {this.helperError}
              </div>
            )}
            {this.textInput && this.textInput.validity.badInput && (
              <div class="tds-helper">
                <tds-icon name="error" size="16px" svgTitle="error" /> {this.helperErrorInvalid}
              </div>
            )}
          </div>
        )}
        {this.helper && this.state !== 'error' && (
          <div class="tds-datetime-helper">
            <div class="tds-helper">{this.helper}</div>
          </div>
        )}
      </div>
    );
  }
}
