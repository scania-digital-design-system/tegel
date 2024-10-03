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
} from '@stencil/core';
import { TdsCheckboxCustomEvent } from '../../../components';

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

  /** Value for the Dropdown option. */
  @Prop() value: string;

  /** Sets the option as disabled. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  @State() multiselect: boolean;

  @State() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  private parentElement: HTMLTdsDropdownElement;

  // @ts-ignore
  // eslint-disable-next-line no-unused-vars,
  private label: string;

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

  componentWillRender = () => {
    this.parentElement =
      this.host.parentElement.tagName === 'TDS-DROPDOWN'
        ? (this.host.parentElement as HTMLTdsDropdownElement)
        : ((this.host.getRootNode() as ShadowRoot).host as HTMLTdsDropdownElement);
    this.multiselect = this.parentElement.multiselect;
    this.size = this.parentElement.size;
    this.label = this.host.textContent.trim();
  };

  handleSingleSelect = () => {
    if (!this.disabled) {
      this.selected = true;
      this.parentElement.appendValue(this.value);
      this.parentElement.close();
      this.tdsSelect.emit({
        value: this.value,
        selected: this.selected,
      });
    }
  };

  handleMultiselect = (
    event: TdsCheckboxCustomEvent<{ checkboxId: string; checked: boolean; value?: string }>,
  ) => {
    if (!this.disabled) {
      if (event.detail.checked) {
        this.parentElement.appendValue(this.value);
        this.selected = true;
        this.tdsSelect.emit({
          value: this.value,
          selected: this.selected,
        });
      } else {
        this.parentElement.removeValue(this.value);
        this.selected = false;
        this.tdsSelect.emit({
          value: this.value,
          selected: this.selected,
        });
      }
      event.stopPropagation();
    }
  };

  handleFocus = (event) => {
    this.tdsFocus.emit(event);
  };

  handleBlur = (event) => {
    this.tdsBlur.emit(event);
  };

  render() {
    return (
      <Host role="option" aria-disabled={this.disabled} aria-selected={this.selected}>
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
                disabled={this.disabled}
                checked={this.selected}
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
