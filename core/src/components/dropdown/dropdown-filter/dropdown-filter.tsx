import { Component, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'sdds-dropdown-filter',
  shadow: true,
  styleUrl: './../dropdown.scss',
})
export class DropdownFilter {
  @State() dataOptions = [];

  @State() filteredContent = [];

  @State() searchTerm = '';

  @State() selectedOptionState: any;

  @State() dropdownRef?: HTMLSddsDropdownElement;

  /** Set the variant of the Dropdown. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Placeholder text for Dropdown with no selected item */
  @Prop() placeholder: string = '';

  /** Label for Dropdown with no selected item */
  @Prop() label: string;

  /** Add the value of the option to set it as default */
  @Prop() defaultOption: string;

  /** Direction that the Dropdown will open. Default is auto. */
  @Prop() openDirection: 'down' | 'up' | 'auto' = 'auto';

  /** Add the value of the option as string to set it as new selected value */
  @Prop() selectedOption: string;

  /** Add the value of the option to set it as default */
  @Prop() disabled: boolean = false;

  /** Controls the size of Dropdown. 'sm', 'md' and 'lg' correct values and 'small', 'medium' and 'large' are deprecated */
  @Prop() size: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large' = 'lg';

  /** Set to true to make the width following the label text length */
  @Prop() inline: boolean = false;

  /** Position of label */
  @Prop() labelPosition: 'no-label' | 'outside' = 'no-label';

  /** Support `error` state */
  @Prop() state: boolean = false;

  /** Add helper text in the bottom of Dropdown */
  @Prop() helper: string = '';

  /** Data is an array of objects that contains label and value
   * `data = [{label:'Option 1', value:'opt-1'},{label:'Option 2', value:'opt-2'}]`
   */
  @Prop() data: string;

  @State() selectedLabel: string = 'no-selected';

  @State() selectedValue: string = 'no-selected';

  componentWillLoad() {
    this.parseData(this.data);

    if (this.defaultOption) {
      this.selectedOptionState = this.defaultOption;
    }
  }

  @Watch('data')
  parseData(newValue: string) {
    if (newValue) this.dataOptions = JSON.parse(newValue);
    this.filteredContent = this.dataOptions;
  }

  @Listen('internalSddsSearch')
  updateOptionsContent(event: CustomEvent<any>) {
    this.searchTerm = event.detail;
    this.findData();
  }

  @Listen('internalSddsSelect')
  selectOptionHandler(event: CustomEvent<any>) {
    this.selectedOptionState = event.detail.value;
    this.selectedLabel = event.detail.label;
    this.selectedValue = event.detail.value;

    // Reset list when search is done and user have selected one option
    // To match with animation time for option list to fadeout first
    setTimeout(() => {
      this.filteredContent = this.dataOptions;
    }, 200);
  }

  findData() {
    const searchAsRegEx = new RegExp(this.searchTerm, 'gmi');
    this.filteredContent = this.dataOptions.filter((option) => {
      if (option.label) {
        const listItem = option.label.toLowerCase();
        const searchResultList = listItem.match(searchAsRegEx);
        if (searchResultList) {
          return searchResultList;
        }
        this.selectedOptionState = null;
        this.selectedLabel = 'no-result';
        this.selectedValue = 'no-result';
      }
    });
  }

  setOptionsContent() {
    const newList = this.filteredContent.map((obj) => (
      <sdds-dropdown-option
        tabindex="0"
        value={obj.value}
        class={`${this.selectedOptionState === obj.value ? 'selected' : ''}`}
      >
        {obj.label}
      </sdds-dropdown-option>
    ));
    if (newList.length > 0) {
      return newList;
    }
    return (
      <sdds-dropdown-option tabindex="-1" value="no-result" class="sdds-option--no-result">
        No result
      </sdds-dropdown-option>
    );
  }

  /** Use this method to reset the Dropdown. Then it will go back to its initial state. */
  @Method() async resetOption() {
    await this.dropdownRef?.resetOption();
  }

  render() {
    return (
      <Host
        selected-value={this.selectedValue}
        selected-text={this.selectedLabel}
        class={`
      ${this.modeVariant ? `sdds-mode-variant-${this.modeVariant}` : ''}
     `}
      >
        <sdds-dropdown
          ref={(el) => (this.dropdownRef = el)}
          exportparts="dropdown-filter-disabled"
          size={this.size}
          label={this.label}
          disabled={this.disabled}
          labelPosition={this.labelPosition}
          helper={this.helper}
          state={this.state}
          placeholder={this.placeholder}
          defaultOption={this.defaultOption}
          selectedOption={this.selectedOption}
          type="filter"
          tabindex={this.disabled ? '-1' : null}
          openDirection={this.openDirection}
        >
          {this.setOptionsContent()}
        </sdds-dropdown>
      </Host>
    );
  }
}
