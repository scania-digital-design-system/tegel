import { Component, State, h, Prop, Listen, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'tds-datetime',
  styleUrl: 'datetime.scss',
  shadow: false,
  scoped: true,
})
export class TdsDatetime {
  /** Text-input for focus state */
  textInput?: HTMLInputElement;

  /** Sets an input type */
  @Prop({ reflect: true }) type: 'datetime-local' | 'date' | 'time' = 'datetime-local';

  /** Value of the input text */
  @Prop({ reflect: true, mutable: true }) value = '';

  /** Sets min value. Example for different types: datetime="2023-01-31T00:00" date="2023-01-01" time="15:00" */
  @Prop() min: string;

  /** Sets max value. Example for different types: datetime="2023-01-31T00:00" date="2023-01-01" time="15:00" */
  @Prop() max: string;

  /** Default value of the component. Format for time: HH-MM. Format for date: YY-MM-DD. Format for date-time: YY-MM-DDTHH-MM */
  @Prop() defaultValue: string | 'none' = 'none';

  /** Set input in disabled state */
  @Prop() disabled: boolean = false;

  /** Size of the input */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /** Resets min width rule */
  @Prop() noMinWidth: boolean = false;

  /** Set the variant of the Datetime component. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Name property */
  @Prop() name = '';

  /** Error state of input */
  @Prop() state: string;

  /** Autofocus for input */
  @Prop() autofocus: boolean = false;

  /** Label text for the component */
  @Prop() label: string = '';

  /** Helper text for the component */
  @Prop() helper: string = '';

  /** Listen to the focus state of the input */
  @State() focusInput: boolean;

  /** Change event for the Datetime */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange: EventEmitter;

  /** Blur event for the Datetime */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  /** Focus event for the Datetime */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Input event for the Datetime */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput: EventEmitter<InputEvent>;

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

  getDefaultValue = () => {
    const dateTimeObj = {
      year: this.defaultValue.slice(0, 4),
      month: this.defaultValue.slice(5, 7),
      day: this.defaultValue.slice(8, 10),
      hours: this.defaultValue.slice(11, 13),
      minutes: this.defaultValue.slice(14, 16),
    };
    switch (this.type) {
      case 'datetime-local':
        return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}T${dateTimeObj.hours}:${dateTimeObj.minutes}`;
      case 'date':
        return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}`;
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
  @Listen('focus')
  handleFocusIn() {
    this.focusInput = true;
  }

  // Listener if input leaves focus state
  @Listen('focusout')
  handleFocusOut() {
    this.focusInput = false;
  }

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
    this.tdsBlur.emit(e);
  }

  /** Method that resets the dateteime without emitting an event. */
  private internalReset() {
    let value = '';
    if (this.defaultValue !== 'none') {
      this.value = this.getDefaultValue();
    }
    this.value = value;
  }

  render() {
    let className = ' tds-datetime-input';
    if (this.size === 'md') {
      className += `${className}-md`;
    }
    if (this.size === 'sm') {
      className += `${className}-sm`;
    }
    return (
      <div
        class={`
        ${this.noMinWidth ? 'tds-form-datetime-nomin' : ''}
        ${this.focusInput ? 'tds-form-datetime tds-datetime-focus' : ' tds-form-datetime'}
        ${this.value.length > 0 ? 'tds-datetime-data' : ''}
        ${this.disabled ? 'tds-form-datetime-disabled' : ''}
        ${this.size === 'md' ? 'tds-form-datetime-md' : ''}
        ${this.size === 'sm' ? 'tds-form-datetime-sm' : ''}
        ${
          this.state === 'error' || this.state === 'success'
            ? `tds-form-datetime-${this.state}`
            : ''
        }
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}`}
      >
        {this.label && (
          <label htmlFor={this.name} class="tds-datetime-label">
            {this.label}
          </label>
        )}
        <div onClick={(e) => this.handleFocusClick(e)} class="tds-datetime-container">
          <div class="tds-datetime-input-container">
            <input
              ref={(inputEl) => (this.textInput = inputEl as HTMLInputElement)}
              class={className}
              type={this.type}
              disabled={this.disabled}
              value={this.value}
              min={this.min}
              max={this.max}
              autofocus={this.autofocus}
              name={this.name}
              onInput={(e) => this.handleInput(e)}
              onBlur={(e) => this.handleBlur(e)}
              onChange={(e) => this.handleChange(e)}
            />

            <div class="datetime-icon icon-datetime-local">
              <tds-icon size="20px" name="calendar"></tds-icon>
            </div>

            <div class="datetime-icon icon-time">
              <tds-icon size="20px" name="clock"></tds-icon>
            </div>
          </div>
          <div class="tds-datetime-bar"></div>
        </div>

        {this.helper && (
          <div class="tds-datetime-helper">
            <div class="tds-helper">
              {this.state === 'error' && <tds-icon name="error" size="16px"></tds-icon>}
              {this.helper}
            </div>
          </div>
        )}
      </div>
    );
  }
}
