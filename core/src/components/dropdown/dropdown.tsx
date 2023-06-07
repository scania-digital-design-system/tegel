import {
  Component,
  h,
  Prop,
  State,
  Element,
  Listen,
  Host,
  Event,
  EventEmitter,
  Watch,
  Method,
} from '@stencil/core';

@Component({
  tag: 'tds-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class TdsDropdown {
  textInput?: HTMLInputElement;

  /** Set the variant of the Dropdown. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Placeholder text for Dropdown with no selectedLabel item */
  @Prop() placeholder: string;

  /** Add the value of the option as string to set it as default */
  @Prop() defaultOption: string;

  /** Add the value of the option as string to set it as new selected value */
  @Prop() selectedOption: string;

  /** Set to true for disabled states */
  @Prop() disabled: boolean = false;

  /** `Controls type of Dropdown. */
  @Prop() type: 'default' | 'multiselect' | 'filter' = 'default';

  /** Controls the size of the Dropdown.
   * 'sm', 'md' and 'lg' correct values and 'small', 'medium' and 'large' are deprecated */
  @Prop() size: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large' = 'lg';

  /** Set to true to make the width following the label text length */
  @Prop() inline: boolean = false;

  /** Controls position of label */
  @Prop() labelPosition: 'no-label' | 'inside' | 'outside' = 'no-label';

  /** Label text for label inside & outside */
  @Prop() label: string;

  /** Support `error` state */
  @Prop() state: boolean = false;

  /** Add helper text in the bottom of Dropdown */
  @Prop() helper: string = '';

  /** Direction that the Dropdown will open. Default is auto. */
  @Prop() openDirection: 'down' | 'up' | 'auto' = 'auto';

  @State() optionValues: Array<any> = [];

  @State() optionLabels: Array<any> = [];

  @State() open: boolean = false;

  @State() node: HTMLElement;

  @State() selectedLabel: string = '';

  @State() selectedValue: string = '';

  @State() selectedValuesArray: Array<any> = [];

  @State() selectedLabelsArray: Array<any> = [];

  @State() dropdownUniqueClass: string = '';

  @State() openUpwards: boolean = false;

  @State() dropdownMenuHeight: number = 0;

  @State() dropdownMenuSelector: HTMLElement;

  @State() listItemIndex: any = -1;

  @State() listItemArray: any;

  @State() listItemObject: any;

  @Element() host: HTMLElement;

  componentWillLoad() {
    // If a default option is set, update the default selectedLabel value
    // this.host.children is a HTMLCollection type, cannot use forEach
    this.listItemObject = this.host.children;
    this.listItemArray = Array.from(this.listItemObject);
    this.listItemArray.map((listItem) => {
      this.optionValues.push(listItem.value);
      this.optionLabels.push(listItem.innerText.trim());
    });
    this.setOptionFromOutside(this.defaultOption);

    if (this.size === 'small') {
      this.size = 'sm';
      console.warn('size="small" is deprecated, use size="sm" instead');
    }
    if (this.size === 'medium') {
      this.size = 'md';
      console.warn('size="medium" is deprecated, use size="md" instead');
    }
    if (this.size === 'large') {
      this.size = 'lg';
      console.warn('size="large" is deprecated, use size="lg" instead');
    }
  }

  setOptionFromOutside(optionValue) {
    if (optionValue) {
      this.deselectAll();
      // TODO
      // eslint-disable-next-line no-param-reassign
      optionValue = optionValue.split(',');
      for (let i = 0; i < this.host.children.length; i++) {
        // Todo - specify type
        const el: any = this.host.children[i];
        if (optionValue.includes(el.value.trim())) {
          this.selectedLabelsArray = [...this.selectedLabelsArray, el.textContent.trim()];
          this.selectedValuesArray = [...this.selectedValuesArray, el.value];
          this.selectedLabel = el.textContent;
          this.selectedValue = el.value;
          el.setAttribute('selectedLabel', 'true');
          el.setAttribute('selected', 'true');
        } else {
          el.setAttribute('selectedLabel', 'false');
          el.setAttribute('selected', 'false');
        }
      }
    }
  }

  @Watch('selectedOption')
  changeSelectedOption() {
    if (this.selectedValuesArray.includes(this.selectedOption)) {
      this.resetOption();
    }
    this.setOptionFromOutside(this.selectedOption);
    this.host.setAttribute('selected-option', '');
  }

  @Listen('click', { target: 'document' })
  handleDocClick(ev) {
    // To stop bubble click
    ev.stopPropagation();
    const target = ev ? ev.composedPath()[0] : window.event.target[0];
    if (this.node !== undefined && this.node.contains(target)) {
      if (typeof this.textInput !== 'undefined' || this.textInput === null) {
        this.textInput.focus();
      }
    } else {
      this.tabbingLabelReset();
      this.open = false;
    }
  }

  @Listen('keydown')
  keyListener(ev: KeyboardEvent) {
    if (!this.disabled) {
      switch (ev.key) {
        case 'ArrowDown':
          if (this.open) {
            ev.preventDefault();
            if (this.listItemIndex < this.listItemArray.length - 1) {
              this.listItemIndex++;
            } else {
              this.listItemIndex = 0;
            }
            (this.listItemObject[this.listItemIndex] as HTMLElement).focus();
          }
          break;
        case 'ArrowUp':
          if (this.open) {
            ev.preventDefault();
            if (this.listItemIndex > 0) {
              this.listItemIndex--;
            } else {
              this.listItemIndex = this.listItemArray.length - 1;
            }
            (this.listItemObject[this.listItemIndex] as HTMLElement).focus();
          }
          break;

        case 'Tab':
          this.open = false;
          break;

        case 'Escape':
          this.open = false;
          this.node.focus();
          break;

        default:
          break;
      }
    }
  }

  handleClick() {
    this.open = this.open === false;
    if (this.openDirection === 'auto') {
      this.dropdownMenuHeight = this.dropdownMenuSelector.offsetHeight;
      const distanceToBottom = this.host.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      this.openUpwards = distanceToBottom + this.dropdownMenuHeight + 57 > viewportHeight;
      // If summary of Dropdown menu height and its distance to the bottom is more than viewport height, open menu upwards
      // Additional 57px is added as compensation for Dropdown element own input/button height
      // It is added on handleClick due to possible dynamic injection of data when component is already rendered
    } else {
      this.openUpwards = this.openDirection === 'up';
    }
  }

  tabbingLabelReset() {
    if (typeof this.textInput !== 'undefined' || this.textInput === null) {
      if (!this.selectedLabel && this.selectedLabel.length <= 0) {
        this.textInput.value = '';
        this.internalTdsSearch.emit('');
      }
      if (this.selectedLabel !== this.textInput.value) {
        this.textInput.value = this.selectedLabel;
      }
    }
  }

  @Listen('internalTdsSelect')
  selectOptionHandler(event: CustomEvent<any>) {
    this.open = this.type === 'multiselect';
    if (this.type !== 'multiselect') {
      this.selectedLabel = event.detail.label;
      this.selectedValue = event.detail.value;
      this.tabbingLabelReset();
    } else {
      if (this.selectedValuesArray.includes(event.detail.value)) {
        const itemIndex = this.selectedValuesArray.indexOf(event.detail.value);
        this.selectedValuesArray = this.selectedValuesArray.filter(
          (_value, index) => index !== itemIndex,
        );
        this.selectedLabelsArray = this.selectedLabelsArray.filter(
          (_value, index) => index !== itemIndex,
        );
      } else {
        this.selectedValuesArray = [...this.selectedValuesArray, event.detail.value];
        this.selectedLabelsArray = [...this.selectedLabelsArray, event.detail.label.trim()];
      }
    }
  }

  /** @internal Search event that is emitted to the tds-dropdown-filter */
  @Event({
    eventName: 'internalTdsSearch',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsSearch: EventEmitter<any>;

  handleSearch(ev) {
    const searchTerm = ev.target.value;
    this.internalTdsSearch.emit(searchTerm);
    this.open = true;
  }

  deselectAll() {
    this.selectedLabel = '';
    this.selectedValue = '';
    this.selectedLabelsArray = [];
    this.selectedValuesArray = [];
    this.listItemArray = this.listItemArray.map((optionItem) => ({
      ...optionItem,
      selected: false,
    }));
  }

  @Method() async resetOption() {
    this.deselectAll();
    this.open = false;

    if (this.defaultOption) {
      this.setOptionFromOutside(this.defaultOption);
    }
  }

  render() {
    return (
      <Host
        class={`
        ${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.open && !this.disabled ? 'tds-dropdown--open' : ''}
        ${this.type === 'multiselect' ? 'tds-dropdown-multiselect' : ''}
        ${this.inline ? 'tds-dropdown-inline' : ''}
        ${
          this.selectedLabel.length > 0 || this.selectedLabel === '' ? 'tds-dropdown--selected' : ''
        }
        ${this.state ? 'tds-dropdown--error' : ''}
        ${this.openUpwards ? 'tds-dropdown--open-upwards' : ''}
        ${
          this.labelPosition === 'inside' && this.selectedLabelsArray.length > 0
            ? 'tds-dropdown--label-inside-position'
            : ''
        }
       `}
        selected-value={this.selectedValue}
        selected-text={this.selectedLabel}
        multi-selected-values={JSON.stringify(this.selectedValuesArray)}
        multi-selected-labels={JSON.stringify(this.selectedLabelsArray)}
      >
        <span class={`tds-dropdown tds-dropdown-${this.size}`}>
          {this.labelPosition === 'outside' && this.label.length > 0 ? (
            <span class="tds-dropdown-label-outside">{this.label}</span>
          ) : (
            ''
          )}
          <button
            part={this.disabled ? 'dropdown-filter-disabled' : ''}
            disabled={this.disabled}
            tabindex={this.disabled ? '-1' : null}
            class={`tds-dropdown-toggle ${this.selectedValue === 'filter' ? 'is-filter' : ''} ${
              this.selectedValue !== '' || this.selectedLabelsArray.length > 0
                ? 'tds-dropdown-toggle--selected'
                : ''
            }
                ${
                  this.labelPosition === 'inside' && this.selectedValue !== '' && this.size !== 'sm'
                    ? `tds-dropdown-toggle-label-inside-${this.size}`
                    : `tds-dropdown-toggle-${this.size}`
                }`}
            type="button"
            onClick={() => this.handleClick()}
            ref={(node) => (this.node = node)}
          >
            <span class="tds-dropdown-label">
              {this.type === 'filter' ? (
                <input
                  part={this.disabled ? 'dropdown-filter-disabled' : ''}
                  disabled={this.disabled}
                  tabindex="-1"
                  ref={(inputEl) => (this.textInput = inputEl as HTMLInputElement)}
                  class="tds-dropdown-filter"
                  type="text"
                  placeholder={this.placeholder}
                  value={this.selectedLabel}
                  autoComplete="off"
                />
              ) : (
                <span
                  class={{
                    'tds-dropdown-label-container': true,
                    'tds-dropdown-label-container--label-inside':
                      this.labelPosition === 'inside' &&
                      this.size !== 'sm' &&
                      (this.selectedLabel.length > 0 || this.selectedLabelsArray.length > 0),
                  }}
                >
                  {this.size !== 'sm' &&
                    (this.selectedLabel.length > 0 || this.selectedLabelsArray.length > 0) &&
                    this.labelPosition === 'inside' &&
                    this.label.length > 0 && (
                      <span class="tds-dropdown-label-inside">{this.label}</span>
                    )}
                  <span
                    class={`tds-dropdown-label-main ${
                      (this.selectedLabel.length === 0 ||
                        (this.labelPosition === 'inside' && this.label.length < 0)) &&
                      'tds-dropdown-placeholder'
                    }`}
                  >
                    {this.selectedLabel.length > 0 &&
                      this.type !== 'multiselect' &&
                      this.selectedLabel}

                    {this.type === 'multiselect' && (
                      <span class="tds-dropdown-multiselect-result">
                        {this.labelPosition !== 'inside' &&
                          this.selectedLabelsArray.toString().length < 1 &&
                          this.placeholder}
                        {this.selectedLabelsArray.toString().length > 0 &&
                          this.selectedLabelsArray.toString().split(',').join(', ')}
                      </span>
                    )}
                    {!this.selectedLabel &&
                      this.labelPosition === 'inside' &&
                      this.size !== 'sm' &&
                      this.label}

                    {!this.selectedLabel &&
                      this.type !== 'multiselect' &&
                      this.labelPosition !== 'inside' &&
                      this.placeholder}

                    {!this.selectedLabel &&
                      this.size === 'sm' &&
                      this.labelPosition === 'inside' &&
                      this.placeholder}
                  </span>
                </span>
              )}
            </span>
            <svg
              class="tds-dropdown-arrow"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <span
            class="tds-dropdown-menu"
            // Need to have reference in order to calc height and distance from bottom
            ref={(dropdownMenu) => (this.dropdownMenuSelector = dropdownMenu)}
          >
            <slot />
          </span>
        </span>
        <p class="tds-dropdown-helper">
          <svg
            class="tds-dropdown-error-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 4C9.37 4 3.996 9.374 3.996 16.004S9.371 28.007 16 28.007c6.63 0 12.004-5.374 12.004-12.003C28.004 9.374 22.629 4 16 4ZM2 16.004c0-7.732 6.268-14 14-14s14 6.268 14 14-6.268 14-14 14-14-6.268-14-14Z"
              fill="currentColor"
            />
            <path
              d="M14.803 14.47V10h2.376v4.47l-.352 4.295h-1.672l-.352-4.295Zm-.053 5.632h2.5v2.394h-2.5v-2.394Z"
              fill="currentColor"
            />
          </svg>
          <span>{this.helper}</span>
        </p>
      </Host>
    );
  }
}
