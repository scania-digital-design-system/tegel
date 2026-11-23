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
  @Element() host!: HTMLElement;

  /** Value of the dropdown option */
  @Prop({ reflect: true }) value?: string | number;

  /** Internal value storage that's always a string */
  @State() internalValue: string = '';

  /** Sets the option as disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Defines aria-label attribute for the option */
  @Prop({ reflect: true }) tdsAriaLabel?: string;

  /**
   * Associates the option with a dropdown group. Use together with `group-parent`
   * on the parent option or on child options that belong to the group.
   */
  @Prop({ reflect: true }) group?: string;

  /** Marks the option as the parent checkbox for all options in the same group. */
  @Prop({ reflect: true }) groupParent: boolean = false;

  @State() selected: boolean = false;

  @State() indeterminate: boolean = false;

  @State() groupCheckboxDisabled: boolean = false;

  @State() multiselect: boolean = false;

  @State() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  private parentDropdown: HTMLTdsDropdownElement | null = null;

  // @ts-expect-error - label property is used internally for text content tracking
  // eslint-disable-next-line no-unused-vars,
  private label: string = '';

  /** Method to select/deselect an option. */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
    if (selected) {
      this.indeterminate = false;
    }
  }

  /** Updates the parent group checkbox state. */
  @Method()
  async setGroupState(state: { checked: boolean; indeterminate: boolean; disabled?: boolean }) {
    this.selected = state.checked;
    this.indeterminate = state.indeterminate;
    if (state.disabled !== undefined) {
      this.groupCheckboxDisabled = state.disabled;
    }
  }

  /** Click event for the Dropdown option. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelect!: EventEmitter<{
    selected: boolean;
    value: string;
    group?: string;
    groupParent?: boolean;
  }>;

  /** Focus event for the Dropdown option. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus!: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown option. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur!: EventEmitter<FocusEvent>;

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
    this.parentDropdown =
      this.host.parentElement?.tagName === 'TDS-DROPDOWN'
        ? (this.host.parentElement as HTMLTdsDropdownElement)
        : ((this.host.getRootNode() as ShadowRoot).host as HTMLTdsDropdownElement);

    if (this.parentDropdown) {
      this.multiselect = this.parentDropdown.multiselect ?? false;
      this.size = this.parentDropdown.size || 'lg';
    }
    this.label = this.host.textContent?.trim() || '';
  };

  handleSingleSelect = () => {
    if (!this.disabled) {
      this.selected = true;
      this.parentDropdown?.appendValue(this.internalValue);
      this.parentDropdown?.close();
      this.tdsSelect.emit({
        value: this.internalValue,
        selected: this.selected,
      });
    }
  };

  handleMultiselect = (
    event: TdsCheckboxCustomEvent<{
      checkboxId: string;
      checked: boolean;
      indeterminate: boolean;
      value?: string;
    }>,
  ) => {
    if (this.disabled || this.groupCheckboxDisabled) {
      return;
    }

    if (this.groupParent && this.group) {
      event.stopPropagation();
      this.parentDropdown?.toggleGroupSelection(this.group, event.detail.checked);
      this.tdsSelect.emit({
        value: this.internalValue,
        selected: event.detail.checked,
        group: this.group,
        groupParent: true,
      });
      return;
    }

    if (event.detail.checked) {
      this.parentDropdown?.appendValue(this.internalValue);
      this.selected = true;
      this.tdsSelect.emit({
        value: this.internalValue,
        selected: this.selected,
        group: this.group,
      });
    } else {
      this.parentDropdown?.removeValue(this.internalValue);
      this.selected = false;
      this.tdsSelect.emit({
        value: this.internalValue,
        selected: this.selected,
        group: this.group,
      });
    }
    event.stopPropagation();
  };

  handleFocus = (event) => {
    if (!this.parentDropdown) {
      this.tdsFocus.emit(event);
    }
  };

  handleBlur = (event) => {
    if (!this.parentDropdown) {
      this.tdsBlur.emit(event);
    }
  };

  render() {
    const isGroupChild = Boolean(this.group && !this.groupParent);

    return (
      <Host>
        <div
          class={{
            'dropdown-option': true,
            [this.size]: true,
            selected: this.selected,
            disabled: this.disabled,
            'group-child': isGroupChild,
            'group-parent': this.groupParent,
          }}
        >
          {this.multiselect ? (
            <div
              class="multiselect"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.parentDropdown?.close();
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
                disabled={this.disabled || this.groupCheckboxDisabled}
                checked={this.selected}
                indeterminate={this.groupParent ? this.indeterminate : false}
                tdsAriaLabel={this.tdsAriaLabel}
                value={this.internalValue}
                class={{
                  [this.size]: true,
                  'group-child': isGroupChild,
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
