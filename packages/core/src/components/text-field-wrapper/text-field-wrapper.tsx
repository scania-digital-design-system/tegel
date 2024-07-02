import { Component, h, State, Prop, Element, forceUpdate } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';
import { observeAttributes, unobserveAttributes } from '../../utils/attribute-observer';
import { hasPropValueChanged } from '../../utils/has-prop-value-changed';
import { getOnlyChildOfKindHTMLElementOrThrow } from '../../utils/validation';
import { observeProperties } from '../../utils/property-observer';

/**
 * @slot prefix - Slot for the prefix in the component.
 * @slot suffix - Slot for the suffix in the component. Suffix is hidden when the input is in readonly state.
 */
@Component({
  tag: 'tds-text-field-wrapper',
  styleUrl: 'text-field-wrapper.scss',
  shadow: false,
  scoped: true,
})
export class TdsTextFieldWrapper {
  @Element() host: HTMLElement;

  /** Which input type, text, password or similar */
  @Prop({ reflect: true }) type: 'text' | 'password' | 'number' = 'text';

  /** Position of the label for the Text Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Label text */
  @Prop() label: string = '';

  /** Helper text */
  @Prop() helper: string;

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

  /** Listen to the focus state of the input */
  @State() focusInput;

  /** Listen to input element value updates. Events and programatic changes. */
  @State() inputValue: string;

  private input: HTMLInputElement;

  private observeAttributes = (): void => {
    observeAttributes(this.input, ['disabled', 'readonly', 'required', 'maxlength'], () => {
      forceUpdate(this.host);
    });
  };

  private setInputStyles = (): void => {
    this.input.classList.add('text-field-input');
    this.input.classList.add(`text-field-input-${this.size}`);
  };

  private addInputElementEventListeners = (): void => {
    this.input.addEventListener('input', (event: any) => {
      this.inputValue = event.target.value;
    });
    this.input.addEventListener('focus', () => {
      this.focusInput = true;
    });
    this.input.addEventListener('blur', () => {
      this.focusInput = false;
    });
  };

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.input = getOnlyChildOfKindHTMLElementOrThrow(
      this.host,
      ['text', 'number', 'password'].map((v) => `input[type=${v}]`).join(),
    );
    this.observeAttributes(); // once initially
    observeProperties(this.input, ['value'], () => {
      this.inputValue = this.input.value;
    });
    this.addInputElementEventListeners();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    this.setInputStyles();
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.input);
  }

  render() {
    const { readOnly, disabled, maxLength } = this.input;
    const usesPrefixSlot = hasSlot('prefix', this.host);
    const usesSuffixSlot = hasSlot('suffix', this.host);
    return (
      <div
        class={{
          'form-text-field-nomin': this.noMinWidth,
          'form-text-field': !this.focusInput || disabled,
          'text-field-focus': this.focusInput && !disabled,
          'text-field-data': this.inputValue !== '' && this.inputValue !== undefined,
          'text-field-container-label-inside':
            this.labelPosition === 'inside' && this.size !== 'sm',
          'form-text-field-disabled': disabled,
          'form-text-field-readonly': readOnly,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
          'form-text-field-md': this.size === 'md',
          'form-text-field-sm': this.size === 'sm',
          'form-text-field-error': this.state === 'error',
          'form-text-field-success': this.state === 'success',
        }}
      >
        {this.labelPosition === 'outside' && (
          <div class="text-field-label-outside">
            <div>{this.label}</div>
          </div>
        )}
        <div onClick={() => this.input.focus()} class="text-field-container">
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
            <slot />

            {this.labelPosition === 'inside' && this.size !== 'sm' && (
              <label class="text-field-label-inside">{this.label}</label>
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
                'tds-u-display-none': readOnly,
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

        {(this.helper || maxLength > 0) && (
          <div class="text-field-helper">
            {this.state === 'error' && (
              <div class="text-field-helper-error-state">
                <tds-icon name="error" size="16px"></tds-icon>
                {this.helper}
              </div>
            )}
            {this.state !== 'error' && this.helper}

            {maxLength > 0 && (
              <div class="text-field-textcounter">
                {this.inputValue === undefined ? 0 : this.inputValue?.length}
                <span class="text-field-textcounter-divider"> / </span>
                {maxLength}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
