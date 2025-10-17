import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  Method,
  Watch,
} from '@stencil/core';
import { TdsCheckboxCustomEvent } from '../../../components';
import { convertToString } from '../../../utils/convertToString';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the option label text.
 */
@Component({
  tag: 'tds-dropdown-option',
  styleUrl: 'dropdown-option.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class TdsDropdownOption {
  @Element() host: HTMLElement;

  /** Value of the dropdown option */
  @Prop() value: string | number;

  /** Internal value storage that's always a string */
  @State() internalValue: string;

  /** Sets the option as disabled. */
  @Prop() disabled: boolean = false;

  /** Defines aria-label attribute for the option */
  @Prop() tdsAriaLabel: string;

  @State() selected: boolean = false;

  @State() multiselect: boolean = false;

  @State() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  private parentElement: HTMLTdsDropdownElement | null = null;

  // @ts-expect-error - label property is used internally for text content tracking
  // eslint-disable-next-line no-unused-vars,
  private label: string = '';

  /** Method to select/deselect an option. */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
  }

  /** Click event for the Dropdown option. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelect: EventEmitter<{
    selected: boolean;
    value: string;
  }>;

  /** Focus event for the Dropdown option. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown option. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur: EventEmitter<FocusEvent>;

  @Watch('value')
  valueWatcher(newValue: string | number) {
    this.internalValue = convertToString(newValue);
  }

  componentWillLoad() {
    this.internalValue = convertToString(this.value);
  }

  componentWillRender = () => {
    if (!this.host.parentElement) {
      return;
    }
    this.parentElement =
      this.host.parentElement?.tagName === 'TDS-DROPDOWN'
        ? (this.host.parentElement as unknown as HTMLTdsDropdownElement)
        : ((this.host.getRootNode() as ShadowRoot).host as unknown as HTMLTdsDropdownElement);

    if (this.parentElement) {
      this.multiselect = this.parentElement.multiselect ?? false;
      this.size = this.parentElement.size || 'lg';
    }
    this.label = this.host.textContent?.trim() || '';
  };

  handleSingleSelect = () => {
    if (!this.disabled) {
      this.selected = true;
      this.parentElement.appendValue(this.internalValue);
      this.parentElement.close();
      this.tdsSelect.emit({
        value: this.internalValue,
        selected: this.selected,
      });
    }
  };

  handleMultiselect = (
    event: TdsCheckboxCustomEvent<{ checkboxId: string; checked: boolean; value?: string }>,
  ) => {
    if (!this.disabled) {
      if (event.detail.checked) {
        this.parentElement.appendValue(this.internalValue);
        this.selected = true;
        this.tdsSelect.emit({
          value: this.internalValue,
          selected: this.selected,
        });
      } else {
        this.parentElement.removeValue(this.internalValue);
        this.selected = false;
        this.tdsSelect.emit({
          value: this.internalValue,
          selected: this.selected,
        });
      }
      event.stopPropagation();
    }
  };

  handleFocus = (event) => {
    // Focus events are now handled by the parent dropdown component
    // Only emit if this is a standalone option (not within a dropdown)
    if (!this.parentElement) {
      this.tdsFocus.emit(event);
    }
  };

  handleBlur = (event) => {
    // Blur events are now handled by the parent dropdown component
    // Only emit if this is a standalone option (not within a dropdown)
    if (!this.parentElement) {
      this.tdsBlur.emit(event);
    }
  };

  render() {
    return (
      <Host>
        <div
          class={`dropdown-option
          ${this.size}
          ${this.selected ? 'selected' : ''}
          ${this.disabled ? 'disabled' : ''}
          `}
        >
          {this.multiselect ? (
            <div
              class="multiselect"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.parentElement.close();
                }
              }}
            >
              <tds-checkbox
                onTdsChange={(event) => {
                  this.handleMultiselect(event);
                }}
                onTdsBlur={(event) => {
                  event.stopPropagation();
                }}
                disabled={this.disabled}
                checked={this.selected}
                tdsAriaLabel={this.tdsAriaLabel}
                class={{
                  [this.size]: true,
                }}
              >
                <div slot="label">
                  <slot></slot>
                </div>
              </tds-checkbox>
            </div>
          ) : (
            <button
              role="option"
              aria-disabled={this.disabled}
              aria-selected={this.selected}
              aria-label={this.tdsAriaLabel}
              onClick={() => {
                this.handleSingleSelect();
              }}
              onFocus={(event) => this.handleFocus(event)}
              onBlur={(event) => this.handleBlur(event)}
              disabled={this.disabled}
              class={this.size}
            >
              <div class="single-select">
                <slot></slot>
                {this.selected && <tds-icon name="tick" size="16px"></tds-icon>}
              </div>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
