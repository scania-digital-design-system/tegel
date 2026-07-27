import {
  Component,
  Host,
  h,
  Element,
  State,
  Event,
  Listen,
  Method,
  Prop,
  Watch,
  EventEmitter,
} from '@stencil/core';
import findNextFocusableElement from '../../utils/findNextFocusableElement';
import findPreviousFocusableElement from '../../utils/findPreviousFocusableElement';
import appendHiddenInput from '../../utils/appendHiddenInput';
import { convertToString, convertArrayToStrings } from '../../utils/convertToString';
import generateUniqueId from '../../utils/generateUniqueId';

function hasValueChanged(newValue: string[], currentValue: string[]): boolean {
  if (newValue.length !== currentValue.length) return true;
  return newValue.some((val) => !currentValue.includes(val));
}

function getTypedQuery(rawValue: string, displayValue: string): string {
  if (rawValue.length <= displayValue.length + 1) {
    return rawValue;
  }

  if (rawValue.startsWith(displayValue)) {
    return rawValue.slice(displayValue.length);
  }

  if (rawValue.endsWith(displayValue)) {
    return rawValue.slice(0, rawValue.length - displayValue.length);
  }

  return rawValue;
}

const DROPDOWN_OPTION_TAG = 'TDS-DROPDOWN-OPTION';
const DROPDOWN_GROUP_SEPARATOR_TAG = 'TDS-DROPDOWN-GROUP-SEPARATOR';
const DROPDOWN_GROUP_TITLE_TAG = 'TDS-DROPDOWN-GROUP-TITLE';

const VALID_DROPDOWN_CHILD_TAGS = new Set([
  DROPDOWN_OPTION_TAG,
  DROPDOWN_GROUP_SEPARATOR_TAG,
  DROPDOWN_GROUP_TITLE_TAG,
]);

function isValidDropdownChild(tagName: string): boolean {
  return VALID_DROPDOWN_CHILD_TAGS.has(tagName);
}

function isDropdownOption(tagName: string): boolean {
  return tagName === DROPDOWN_OPTION_TAG;
}

function isDropdownGroupChild(tagName: string): boolean {
  return tagName === DROPDOWN_GROUP_SEPARATOR_TAG || tagName === DROPDOWN_GROUP_TITLE_TAG;
}

interface DropdownGroup {
  groupTitle: Element | null;
  options: HTMLTdsDropdownOptionElement[];
  leadingSeparator: Element | null;
}

interface ParsedDropdownGroups {
  groups: DropdownGroup[];
  trailingSeparator: Element | null;
}

/**
 * @slot <default> - <b>Unnamed slot.</b> For dropdown option, group title, and group separator elements.
 */
@Component({
  tag: 'tds-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class TdsDropdown {
  @Element() host!: HTMLElement;

  /** Name for the Dropdowns input element. */
  @Prop({ reflect: true }) name?: string;

  /** Sets the Dropdown in a disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Helper text for the Dropdown. */
  @Prop({ reflect: true }) helper?: string;

  /** Label text for the Dropdown. */
  @Prop({ reflect: true }) label?: string;

  /** Label text position */
  @Prop({ reflect: true }) labelPosition?: 'inside' | 'outside';

  /** Mode variant of the component, based on current mode. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' | null = null;

  /** The direction the Dropdown should open, auto if not specified. */
  @Prop({ reflect: true }) openDirection: 'up' | 'down' | 'auto' = 'auto';

  /** Placeholder text for the Dropdown. */
  @Prop({ reflect: true }) placeholder?: string;

  /** The size of the Dropdown. */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  @Prop({ reflect: true }) animation: 'none' | 'slide' = 'slide';

  /** Sets the Dropdown in an error state */
  @Prop({ reflect: true }) error: boolean = false;

  /** Enables multiselect in the Dropdown. */
  @Prop({ reflect: true }) multiselect: boolean = false;

  /** Enables filtration in the Dropdown. */
  @Prop({ reflect: true }) filter: boolean = false;

  /** Normalizes input text for fuzzier search */
  @Prop({ reflect: true }) normalizeText: boolean = true;

  /** Text that is displayed if filter is used and there are no options that matches the search.
   * Setting it to an empty string disables message from showing up. */
  @Prop({ reflect: true }) noResultText?: string = 'No result';

  /** Default value selected in the Dropdown. */
  @Prop({ reflect: true }) defaultValue?: string | number;

  /** Value of the dropdown. For multiselect, provide array of strings/numbers. For single select, provide a string/number. */
  @Prop({ mutable: true }) value: string | number | (string | number)[] | null = null;

  /** Defines aria-label attribute for input */
  @Prop({ reflect: true }) tdsAriaLabel?: string;

  @State() open: boolean = false;

  @State() internalValue: string = '';

  @State() filterResult: number | null = null;

  @State() filterFocus: boolean = false;

  @State() internalDefaultValue: string = '';

  @State() private selectedOptions: string[] = [];

  @State() filterQuery: string = '';

  private dropdownList!: HTMLDivElement;

  private inputElement!: HTMLInputElement;

  private hasFocus: boolean = false;

  private readonly pendingInvalidValues: Set<string> = new Set();

  private readonly uuid = generateUniqueId();

  @Watch('value')
  handleValueChange(newValue: string | number | (string | number)[]) {
    /** Normalize to array */
    const normalizedValue = this.normalizeValue(newValue);

    /** Only update if actually changed */
    if (hasValueChanged(normalizedValue, this.selectedOptions)) {
      this.updateDropdownStateInternal(normalizedValue);
    }
  }

  private normalizeValue(value: string | number | (string | number)[] | null): string[] {
    if (value === null || value === undefined || value === '') return [];

    /** For single select, ensure we handle both string and array inputs */
    if (!this.multiselect) {
      /** If array is passed to single select, take first value */
      if (Array.isArray(value)) {
        return [convertToString(value[0])];
      }
      return [convertToString(value)];
    }

    /** For multiselect */
    if (Array.isArray(value)) {
      return convertArrayToStrings(value);
    }

    /** Handle comma-separated string for multiselect */
    return value
      .toString()
      .split(',')
      .filter((v) => v !== '');
  }

  private updateDropdownStateInternal(values: string[]) {
    this.updateDropdownState(values, false);
  }

  private updateDropdownStateFromUser(values: string[]) {
    this.updateDropdownState(values, true);
  }

  private updateDropdownState(values: string[], emitChange: boolean = true) {
    /** Validate the values - only filter out invalid values for user-triggered changes */
    const validValues = this.validateValues(values, emitChange);

    /** Update internal state */
    this.selectedOptions = [...validValues];

    /** Update the value prop */
    this.value = this.multiselect ? this.selectedOptions : this.selectedOptions[0] || null;

    /** Update internal value for display */
    this.internalValue = this.getValue();

    /** Update DOM */
    this.updateOptionElements();

    /** Update display value */
    this.updateDisplayValue();

    /** Emit change event only if value has changed by user */
    if (emitChange) this.emitChange();

    /** Update value attribute */
    this.setValueAttribute();
  }

  private validateValues(values: string[], strict: boolean = false): string[] {
    const children = this.getChildren();
    if (!children || children.length === 0) {
      return values; /** Return original values if no children yet */
    }

    return values.filter((val) => {
      const isValid = children.some(
        (element) =>
          !element.groupParent && convertToString(element.value) === convertToString(val),
      );
      if (!isValid && strict) {
        console.warn(`TDS DROPDOWN: Option with value "${val}" does not exist`);
      }
      return isValid || !strict;
    });
  }

  private updateOptionElements() {
    this.getChildren()?.forEach((element) => {
      if (element.groupParent) {
        return;
      }

      element.setSelected(this.selectedOptions.includes(convertToString(element.value)));
    });
    this.syncAllGroupParents();
  }

  private readonly getGroupChildOptions = (group: string) =>
    this.getChildren().filter(
      (option) =>
        convertToString(option.group) === convertToString(group) &&
        !option.disabled &&
        !option.groupParent,
    );

  private readonly getGroupParentOption = (group: string) =>
    this.getChildren().find(
      (option) =>
        convertToString(option.group) === convertToString(group) && option.groupParent,
    );

  private readonly getDefinedGroups = () => {
    const groups = new Set<string>();

    this.getChildren().forEach((option) => {
      if (option.groupParent && option.group) {
        groups.add(convertToString(option.group));
      }
    });

    return Array.from(groups);
  };

  private readonly syncGroupParent = (group: string) => {
    const groupParent = this.getGroupParentOption(group);
    if (!groupParent) {
      return;
    }

    const childOptions = this.getGroupChildOptions(group);
    const childValues = childOptions.map((option) => convertToString(option.value));
    const selectedCount = childValues.filter((value) =>
      this.selectedOptions.includes(value),
    ).length;

    const allSelected = childValues.length > 0 && selectedCount === childValues.length;
    const noneSelected = selectedCount === 0;
    const indeterminate = !allSelected && !noneSelected;

    groupParent.setGroupState({
      checked: allSelected,
      indeterminate,
      disabled: childOptions.length === 0,
    });
  };

  private readonly syncAllGroupParents = () => {
    if (!this.multiselect) {
      return;
    }

    this.getDefinedGroups().forEach((group) => this.syncGroupParent(group));
  };

  private readonly handleGroupParentSelect = (group: string, selected: boolean) => {
    const childValues = this.getGroupChildOptions(group).map((option) =>
      convertToString(option.value),
    );

    if (childValues.length === 0) {
      return;
    }

    const newValues = selected
      ? [...new Set([...this.selectedOptions, ...childValues])]
      : this.selectedOptions.filter((value) => !childValues.includes(value));

    this.updateDropdownStateFromUser(newValues);
  };

  private updateDisplayValue() {
    this.internalValue = this.getSelectedChildrenLabels().join(', ');

    if (this.filter && this.inputElement) {
      this.inputElement.value = this.internalValue;
    }
  }

  private emitChange() {
    const value = this.multiselect
      ? this.selectedOptions.join(',')
      : this.selectedOptions[0] || null;

    this.tdsChange.emit({
      name: this.name,
      value: value ?? null,
    });
  }

  /** Method for setting the selected value of the Dropdown.
   *
   * Single selection example:
   *
   * <code>
   *  dropdown.setValue('option-1', 'Option 1');
   * </code>
   *
   * Multiselect example:
   *
   * <code>
   *  dropdown.setValue(['option-1', 'option-2']);
   * </code>
   */
  @Method()
  // @ts-expect-error for label: the label is optional here ONLY to not break the API. Should be removed for 2.0.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async setValue(value: string | number | string[] | number[], label?: string) {
    let normalizedValue: string[];
    if (Array.isArray(value)) {
      normalizedValue = convertArrayToStrings(value);
    } else {
      normalizedValue = [convertToString(value)];
    }
    this.updateDropdownStateFromUser(normalizedValue);
    return this.getSelectedChildren().map((element: HTMLTdsDropdownOptionElement) => ({
      value: element.value,
      label: element.textContent?.trim(),
    }));
  }

  @Method()
  async reset() {
    this.updateDropdownStateFromUser([]);
  }

  @Method()
  async removeValue(oldValue: string) {
    const newValues = this.selectedOptions.filter((v) => v !== oldValue);
    this.updateDropdownStateFromUser(newValues);
  }

  /**
   * Selects or deselects all child options in a multiselect group.
   * Called by group parent `tds-dropdown-option` elements.
   */
  @Method()
  async toggleGroupSelection(group: string, selected: boolean) {
    this.handleGroupParentSelect(group, selected);
  }

  /** Returns a unique id for this dropdown instance. */
  @Method()
  async getInstanceId(): Promise<string> {
    return this.uuid;
  }

  /** Method that forces focus on the input element. */
  @Method()
  async focusElement() {
    if (this.filter) {
      /** For filter mode, focus the input element */
      this.focusInputElement();
    } else {
      /** For non-filter mode, focus the button element */
      const button = this.host.shadowRoot?.querySelector('button');
      if (button) {
        button.focus();
      }
    }
    /** Always trigger the focus event to open the dropdown */
    this.handleFocus();
  }

  /** Method for closing the Dropdown. */
  @Method()
  async close() {
    this.open = false;
  }

  /** Method to force update the dropdown display value.
   * Use this method when you programmatically change the text content of dropdown options
   * to ensure the selected value display updates immediately.
   */
  @Method()
  async updateDisplay() {
    this.updateDisplayValue();
  }

  /** Change event for the Dropdown. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsChange!: EventEmitter<{
    name: string | undefined;
    value: string | null;
  }>;

  /** Focus event for the Dropdown. */
  @Event({
    eventName: 'tdsFocus',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsFocus!: EventEmitter<FocusEvent>;

  /** Blur event for the Dropdown. */
  @Event({
    eventName: 'tdsBlur',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsBlur!: EventEmitter<FocusEvent>;

  /** Input event for the Dropdown. */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsInput!: EventEmitter<InputEvent>;

  /** Clear event for the Dropdown. */
  @Event({
    eventName: 'tdsClear',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  tdsClear!: EventEmitter<{ clearedValue: string }>;

  @Listen('mousedown', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    if (this.open) {
      /** Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/ */

      const isClickOutside = !event.composedPath().includes(this.host as EventTarget);

      if (isClickOutside) {
        /** Emit clear event if there's a filter query when clicking outside */
        if (this.filter && this.filterQuery) {
          this.tdsClear.emit({ clearedValue: this.filterQuery });
        }
        this.open = false;
      }
    }
  }

  @Listen('focusin')
  onFocusIn(event: FocusEvent) {
    /** Check if the focus is within this dropdown component */
    if (this.host.contains(event.target as Node)) {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.tdsFocus.emit(event);
      }
    }
  }

  @Listen('focusout')
  onFocusOut(event: FocusEvent) {
    /** Only emit blur if focus is actually leaving the entire dropdown component */
    const relatedTarget = event.relatedTarget as Node;

    /** If relatedTarget is null (focus going to body/window) or outside the component, emit blur */
    if (this.hasFocus && (!relatedTarget || !this.host.contains(relatedTarget))) {
      this.hasFocus = false;
      this.handleBlur();
      this.tdsBlur.emit(event);
    }
  }

  @Listen('keydown')
  async onKeyDown(event: KeyboardEvent) {
    const { activeElement } = document;
    if (!activeElement) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        this.handleArrowDown(activeElement);
        break;
      case 'ArrowUp':
        this.handleArrowUp(activeElement);
        break;
      case 'Escape':
        this.handleEscape();
        break;
      default:
        break;
    }
  }

  private readonly getFocusedOptionIndex = (activeElement: Element) =>
    this.getChildren().findIndex(
      (option) => option === activeElement || option.contains(activeElement),
    );

  private readonly handleArrowDown = (activeElement: Element) => {
    const children = this.getChildren();
    const currentIndex = this.getFocusedOptionIndex(activeElement);
    const startingIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

    if (children.length > 0) {
      const elementIndex = findNextFocusableElement(children, startingIndex);
      const target = typeof elementIndex === 'number' ? children[elementIndex] : children[0];
      target?.focus();
    }
  };

  private readonly handleArrowUp = (activeElement: Element) => {
    const children = this.getChildren();
    const currentIndex = this.getFocusedOptionIndex(activeElement);
    const startingIndex = currentIndex >= 0 ? currentIndex - 1 : children.length - 1;

    if (children.length > 0) {
      const elementIndex = findPreviousFocusableElement(children, startingIndex);
      const target =
        typeof elementIndex === 'number' ? children[elementIndex] : children[children.length - 1];
      target?.focus();
    }
  };

  private readonly handleEscape = () => {
    this.open = false;
    /** Return focus to input/button when Escape key is used */
    if (this.filter) {
      this.inputElement?.focus();
    } else {
      const button = this.host.shadowRoot?.querySelector('button');
      button?.focus();
    }
  };

  /** If the Dropdown gets closed,
  this sets the value of the dropdown to the current selection labels or null if no selection is made. */
  @Watch('open')
  handleOpenState() {
    if (this.filter) {
      if (!this.open) {
        this.filterQuery = '';
        this.resetFilterVisibility();
        if (this.inputElement) {
          this.inputElement.value = this.selectedOptions.length ? this.getValue() : '';
        }
      }
    }

    this.updateDropdownListInertState();
  }

  @Watch('defaultValue')
  handleDefaultValueChange(newValue: string | number) {
    if (newValue !== undefined && newValue !== null) {
      this.internalDefaultValue = convertToString(newValue);
      this.setDefaultOption();
    }
  }

  componentWillLoad() {
    /** First handle the value prop if it exists */
    if (this.value !== null && this.value !== undefined) {
      const normalizedValue = this.normalizeValue(this.value);
      this.updateDropdownStateInternal(normalizedValue);
      return; /** Exit early if we handled the value prop */
    }

    /** Only use defaultValue if no value prop was provided */
    if (this.defaultValue !== null && this.defaultValue !== undefined) {
      const defaultValueStr = convertToString(this.defaultValue);
      const initialValue = this.multiselect
        ? defaultValueStr.split(',').map(convertToString)
        : [defaultValueStr];
      this.updateDropdownStateInternal(initialValue);
    }
  }

  /** Method to handle slot changes */
  private handleSlotChange() {
    this.validateSlottedChildren();

    /**
     * Warn for values that were pending from a previous slot change
     * and are still invalid now that new options have arrived.
     */
    this.warnAndClearPending();

    if (this.selectedOptions.length > 0) {
      this.updateDropdownStateInternal([...this.selectedOptions]);
    } else if (this.internalDefaultValue) {
      this.setDefaultOption();
    }

    /** Track currently unmatched values as pending for the next slot change */
    this.updatePendingInvalidValues();
    this.syncAllGroupParents();
  }

  /** Warn for pending values that are still not matched, then clear pending */
  private warnAndClearPending() {
    const children = this.getChildren();
    if (!children || children.length === 0 || this.pendingInvalidValues.size === 0) return;

    this.pendingInvalidValues.forEach((val) => {
      const isValid = children.some(
        (element) => convertToString(element.value) === convertToString(val),
      );
      if (!isValid) {
        console.warn(`TDS DROPDOWN: Option with value "${val}" does not exist`);
      }
    });
    this.pendingInvalidValues.clear();
  }

  /** Track unmatched selected values as pending for deferred warning */
  private updatePendingInvalidValues() {
    const children = this.getChildren();
    if (!children || children.length === 0) return;

    this.pendingInvalidValues.clear();
    this.selectedOptions.forEach((val) => {
      const isValid = children.some(
        (element) => convertToString(element.value) === convertToString(val),
      );
      if (!isValid) {
        this.pendingInvalidValues.add(val);
      }
    });
  }

  /** Method to check if we should normalize text */
  private normalizeString(text: string): string {
    return this.normalizeText ? text.normalize('NFD').replace(/\p{Diacritic}/gu, '') : text;
  }

  private readonly setDefaultOption = () => {
    if (this.internalDefaultValue) {
      /** Convert the internal default value to an array if it's not already */
      const defaultValues = this.multiselect
        ? this.internalDefaultValue.split(',')
        : [this.internalDefaultValue];

      this.updateDropdownStateInternal(defaultValues);
    }
  };

  private readonly getSlottedChildren = () =>
    Array.from(this.host.children).filter((element) => isValidDropdownChild(element.tagName));

  private readonly getDecorativeChildren = () =>
    Array.from(this.host.children).filter((element) => isDropdownGroupChild(element.tagName));

  private readonly getChildren = () =>
    this.getSlottedChildren().filter((element): element is HTMLTdsDropdownOptionElement =>
      isDropdownOption(element.tagName),
    );

  private readonly showDecorativeChildren = () => {
    this.getDecorativeChildren().forEach((element) => {
      element.removeAttribute('hidden');
    });
  };

  private readonly groupHasVisibleOptions = (group: DropdownGroup): boolean =>
    group.options.some((option) => !option.hasAttribute('hidden'));

  private readonly parseDropdownGroups = (): ParsedDropdownGroups => {
    const groups: DropdownGroup[] = [];
    let pendingSeparator: Element | null = null;
    let current: DropdownGroup = { groupTitle: null, options: [], leadingSeparator: null };

    const pushCurrentGroup = () => {
      if (current.groupTitle || current.options.length > 0) {
        groups.push(current);
      }
    };

    for (const child of this.getSlottedChildren()) {
      if (child.tagName === DROPDOWN_GROUP_TITLE_TAG) {
        pushCurrentGroup();
        current = {
          groupTitle: child,
          options: [],
          leadingSeparator: pendingSeparator,
        };
        pendingSeparator = null;
      } else if (isDropdownOption(child.tagName)) {
        current.options.push(child as HTMLTdsDropdownOptionElement);
      } else if (child.tagName === DROPDOWN_GROUP_SEPARATOR_TAG) {
        pendingSeparator = child;
      }
    }

    pushCurrentGroup();

    return { groups, trailingSeparator: pendingSeparator };
  };

  private readonly updateFilterDecorativeVisibility = () => {
    if (this.filterQuery === '') {
      this.showDecorativeChildren();
      return;
    }

    const { groups, trailingSeparator } = this.parseDropdownGroups();

    groups.forEach((group, index) => {
      const hasVisibleOptions = this.groupHasVisibleOptions(group);
      const previousHasVisibleOptions =
        index > 0 ? this.groupHasVisibleOptions(groups[index - 1]) : false;

      if (group.groupTitle) {
        if (hasVisibleOptions) {
          group.groupTitle.removeAttribute('hidden');
        } else {
          group.groupTitle.setAttribute('hidden', '');
        }
      }

      if (group.leadingSeparator) {
        if (hasVisibleOptions && previousHasVisibleOptions) {
          group.leadingSeparator.removeAttribute('hidden');
        } else {
          group.leadingSeparator.setAttribute('hidden', '');
        }
      }
    });

    if (trailingSeparator) {
      trailingSeparator.setAttribute('hidden', '');
    }
  };

  private readonly validateSlottedChildren = () => {
    Array.from(this.host.children).forEach((child) => {
      if (!isValidDropdownChild(child.tagName)) {
        console.warn(
          `TDS DROPDOWN: <${child.tagName.toLowerCase()}> is not a valid child of tds-dropdown.`,
        );
      }
    });
  };

  private readonly getSelectedChildren = () => {
    if (this.selectedOptions.length === 0) return [];

    return this.selectedOptions
      .map((stringValue) => {
        const matchingElement = this.getChildren()?.find(
          (element: HTMLTdsDropdownOptionElement) =>
            convertToString(element.value) === convertToString(stringValue),
        );
        return matchingElement;
      })
      .filter(Boolean);
  };

  private readonly isGroupFullySelected = (group: string): boolean => {
    const childValues = this.getGroupChildOptions(group).map((option) =>
      convertToString(option.value),
    );

    return (
      childValues.length > 0 && childValues.every((value) => this.selectedOptions.includes(value))
    );
  };

  private readonly getGroupDisplayLabel = (group: string): string => {
    const groupParent = this.getGroupParentOption(group);
    const parentLabel = groupParent?.textContent?.trim();

    if (parentLabel) {
      return parentLabel;
    }

    const { groups } = this.parseDropdownGroups();
    const matchingGroup = groups.find((parsedGroup) =>
      parsedGroup.options.some(
        (option) =>
          option.groupParent && convertToString(option.group) === convertToString(group),
      ),
    );

    return matchingGroup?.groupTitle?.textContent?.trim() ?? group;
  };

  private readonly getSelectedChildrenLabels = (): string[] => {
    const labels: string[] = [];
    const emittedCollapsedGroups = new Set<string>();

    for (const option of this.getChildren()) {
      if (option.groupParent) {
        continue;
      }

      const value = convertToString(option.value);
      if (!this.selectedOptions.includes(value)) {
        continue;
      }

      const group = option.group ? convertToString(option.group) : null;

      if (group) {
        if (emittedCollapsedGroups.has(group)) {
          continue;
        }

        if (this.isGroupFullySelected(group)) {
          labels.push(this.getGroupDisplayLabel(group));
          emittedCollapsedGroups.add(group);
          continue;
        }
      }

      labels.push(option.textContent?.trim() ?? '');
    }

    return labels;
  };

  private readonly getValue = () => {
    const labels = this.getSelectedChildrenLabels();
    if (!labels.length) {
      return '';
    }
    return labels.join(', ');
  };

  private readonly setValueAttribute = () => {
    if (this.selectedOptions.length === 0) {
      this.host.removeAttribute('value');
    } else {
      this.host.setAttribute('value', this.selectedOptions.join(','));
    }
  };

  private readonly getOpenDirection = () => {
    if (this.openDirection === 'auto' || !this.openDirection) {
      const dropdownMenuHeight = this.dropdownList?.offsetHeight ?? 0;
      const distanceToBottom = this.host.getBoundingClientRect?.().top ?? 0;
      const viewportHeight = window.innerHeight;
      if (distanceToBottom + dropdownMenuHeight + 57 > viewportHeight) {
        return 'up';
      }
      return 'down';
    }
    return this.openDirection;
  };

  private readonly handleToggleOpen = () => {
    if (!this.disabled) {
      this.open = !this.open;
      if (this.open) {
        if (this.filter) {
          this.focusInputElement();
        } else {
          const button = this.host.shadowRoot?.querySelector('button');
          if (button) {
            button.focus();
          }
        }
      }
    }
  };

  private readonly focusInputElement = () => {
    if (this.inputElement) this.inputElement.focus();
  };

  private readonly handleFilter = (event: InputEvent): void => {
    const input = event.currentTarget as HTMLInputElement;
    if (
      this.multiselect &&
      this.filterQuery.length === 0 &&
      this.selectedOptions.length > 0 &&
      this.inputElement
    ) {
      const displayValue = this.getValue();
      const rawValue: string = input.value;

      const typed = getTypedQuery(rawValue, displayValue);
      if (typed !== rawValue) {
        this.inputElement.value = typed;
      }
    }

    this.tdsInput.emit(event);
    const query = this.inputElement
      ? this.inputElement.value.toLowerCase()
      : input.value.toLowerCase();
    this.filterQuery = query;

    /** Check if the query is empty, and if so, show all options */
    const children = this.getChildren();

    if (query === '') {
      children.forEach((element) => {
        element.removeAttribute('hidden');
        return element;
      });
      this.showDecorativeChildren();
      this.filterResult = null;
      /** Hide the options that do not match the query */
    } else {
      this.filterResult = children.filter((element) => {
        if (
          !this.normalizeString(element?.textContent ?? '')
            .toLowerCase()
            .includes(this.normalizeString(query).toLowerCase())
        ) {
          element.setAttribute('hidden', '');
        } else {
          element.removeAttribute('hidden');
        }
        return !element.hasAttribute('hidden');
      }).length;
      this.syncGroupParentFilterVisibility();
      this.updateFilterDecorativeVisibility();
    }
  };

  private readonly syncGroupParentFilterVisibility = () => {
    if (this.filterQuery === '') {
      return;
    }

    this.getChildren().forEach((element) => {
      if (!element.groupParent || !element.group) {
        return;
      }

      const hasVisibleChild = this.getGroupChildOptions(convertToString(element.group)).some(
        (child) => !child.hasAttribute('hidden'),
      );

      if (hasVisibleChild) {
        element.removeAttribute('hidden');
      }
    });
  };

  private readonly focusInput = (value: string) => {
    if (this.inputElement) {
      this.inputElement.value = value;
      this.inputElement.focus();
    }
  };

  private readonly handleFilterReset = () => {
    if (this.multiselect) {
      this.handleMultiselectFilterReset();
    } else {
      this.handleSingleFilterReset();
    }
  };

  /** Multiselect + filter: two-step clear */
  private readonly handleMultiselectFilterReset = () => {
    if (this.filterQuery.length > 0) {
      const clearedValue = this.filterQuery;
      this.filterQuery = '';
      this.resetFilterVisibility();
      this.focusInput(this.getValue());
      this.tdsClear.emit({ clearedValue });
    } else if (this.selectedOptions.length > 0) {
      const clearedValue = this.selectedOptions.join(',');
      this.updateDropdownStateFromUser([]);
      this.focusInput('');
      this.tdsClear.emit({ clearedValue });
    }
  };

  /** Single select + filter: clear everything immediately */
  private readonly handleSingleFilterReset = () => {
    const clearedParts: string[] = [];
    if (this.filterQuery.length > 0) {
      clearedParts.push(this.filterQuery);
      this.filterQuery = '';
      this.resetFilterVisibility();
    }
    if (this.selectedOptions.length > 0) {
      clearedParts.push(this.selectedOptions.join(','));
      this.updateDropdownStateFromUser([]);
    }
    this.focusInput('');
    if (clearedParts.length > 0) {
      this.tdsClear.emit({ clearedValue: clearedParts.join(',') });
    }
  };

  private readonly resetFilterVisibility = () => {
    this.filterQuery = '';
    const children = this.getChildren();
    children.forEach((element) => {
      element.removeAttribute('hidden');
    });
    this.showDecorativeChildren();
    this.filterResult = null;
  };

  private readonly handleMultiselectClear = () => {
    const clearedValue = this.selectedOptions.join(',');
    this.updateDropdownStateFromUser([]);
    this.tdsClear.emit({ clearedValue });
  };

  private readonly handleFocus = () => {
    this.open = true;
    this.filterFocus = true;
    if (this.multiselect && this.filter) {
      /** For multiselect+filter, show selected labels on focus.
       *  Clearing happens on click via handleInputClick. */
      if (this.inputElement) {
        this.inputElement.value = this.getValue();
      }
    } else if (this.inputElement) {
      this.inputElement.value = '';
    }
    if (this.filter) {
      this.resetFilterVisibility();
    }
  };

  private readonly handleBlur = () => {
    this.filterFocus = false;
    this.filterQuery = '';
    if (this.inputElement) {
      this.inputElement.value = this.getValue();
    }
    /** Reset filter to show all options for next open */
    if (this.filter) {
      this.resetFilterVisibility();
    }
  };

  private readonly handleInputClick = () => {
    if (this.multiselect && this.filter) {
      this.filterQuery = '';
      if (this.inputElement) {
        this.inputElement.value = '';
      }
      this.resetFilterVisibility();
    }
  };

  /**
   * @internal
   */
  @Method()
  async appendValue(value: string) {
    /** Clear filter query when an option is selected */
    if (this.filter && this.filterQuery.length > 0) {
      this.filterQuery = '';
      /** Reset filter to show all options */
      this.resetFilterVisibility();
    }

    if (this.multiselect) {
      this.updateDropdownStateFromUser([...this.selectedOptions, value]);
    } else {
      this.updateDropdownStateFromUser([value]);
    }

    /** After selection, show all selected labels in the input */
    if (this.filter && this.multiselect && this.inputElement) {
      this.inputElement.value = this.getValue();
    }
  }

  private readonly resetInput = () => {
    const inputEl = this.host.querySelector('input');
    if (inputEl) {
      this.reset();
    }
  };

  componentDidRender() {
    const form = this.host.closest('form');
    if (form) {
      form.addEventListener('reset', this.resetInput);
    }

    /** Initialize inert state after rendering */
    this.updateDropdownListInertState();
  }

  disconnectedCallback() {
    const form = this.host.closest('form');
    if (form) {
      form.removeEventListener('reset', this.resetInput);
    }
  }

  private updateDropdownListInertState() {
    if (this.dropdownList) {
      if (this.open) {
        this.dropdownList.removeAttribute('inert');
      } else {
        this.dropdownList.setAttribute('inert', '');
      }
    }
  }

  render() {
    appendHiddenInput(this.host, this.name, this.selectedOptions.join(','), this.disabled);

    /** Generate unique IDs for associating labels and helpers with the input/button */
    const baseId = this.name || this.uuid;
    const inputId = `dropdown-input-${baseId}`;
    const labelId = this.label ? `dropdown-label-${baseId}` : undefined;
    const helperId = this.helper ? `dropdown-helper-${baseId}` : undefined;
    const hasSelection = this.selectedOptions.length > 0;
    const hasTyped = this.filterQuery.length > 0;
    const isFloated = this.filterFocus || hasSelection || hasTyped;
    const isFloatedButton = this.open || hasSelection;
    const showPlaceholderInside = this.filterFocus && !hasTyped && !hasSelection;
    const showPlaceholderButton = this.labelPosition !== 'inside' || isFloatedButton;
    const fallbackAriaLabel = this.label ? undefined : 'Dropdown';
    const ariaLabel = this.tdsAriaLabel ?? fallbackAriaLabel;
    let derivedPlaceholder = this.placeholder ?? '';
    if (this.labelPosition === 'inside') {
      derivedPlaceholder = showPlaceholderInside ? (this.placeholder ?? '') : '';
    }
    let buttonText = '';
    if (this.selectedOptions.length > 0) {
      buttonText = this.getValue();
    } else if (showPlaceholderButton) {
      buttonText = this.placeholder ?? '';
    }

    return (
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
        }}
      >
        {this.label && this.labelPosition === 'outside' && (
          <div id={labelId} class={`label-outside ${this.disabled ? 'disabled' : ''}`}>
            {this.label}
          </div>
        )}
        <div
          class={{
            'dropdown-select': true,
            [this.size]: true,
            'disabled': this.disabled,
          }}
        >
          {this.filter ? (
            <div
              class={{
                filter: true,
                focus: this.filterFocus,
                disabled: this.disabled,
                error: this.error,
              }}
            >
              <div class="value-wrapper">
                {this.label && this.labelPosition === 'inside' && (
                  <label
                    id={labelId}
                    htmlFor={inputId}
                    class={{
                      'label-inside': true,
                      [this.size]: true,
                      'floated': isFloated,
                    }}
                  >
                    {this.label}
                  </label>
                )}
                <input
                  aria-label={ariaLabel}
                  aria-labelledby={labelId}
                  aria-describedby={helperId}
                  aria-disabled={this.disabled}
                  ref={(inputEl) => {
                    this.inputElement = inputEl as HTMLInputElement;
                    if (this.inputElement && !this.filterFocus) {
                      this.inputElement.value = this.getValue();
                    }
                  }}
                  class={{
                    placeholder: this.labelPosition === 'inside',
                  }}
                  id={inputId}
                  type="text"
                  placeholder={derivedPlaceholder}
                  disabled={this.disabled}
                  onInput={(event) => this.handleFilter(event)}
                  onFocus={() => this.handleFocus()}
                  onClick={() => this.handleInputClick()}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      this.open = false;
                    }
                  }}
                />
              </div>
              <tds-icon
                tabIndex={0}
                role="button"
                aria-label={this.filterQuery.length > 0 ? 'Clear filter' : 'Clear selection'}
                svgTitle={this.filterQuery.length > 0 ? 'Clear filter' : 'Clear selection'}
                onClick={this.handleFilterReset}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    this.handleFilterReset();
                  }
                }}
                class={{
                  'clear-icon': true,
                  'hide': !(this.filterQuery.length > 0 || this.selectedOptions.length > 0),
                }}
                name="cross"
                size="16px"
              ></tds-icon>
              <tds-icon
                tdsAriaHidden
                role="button"
                aria-label="Open/Close dropdown"
                svgTitle="Open/Close dropdown"
                onClick={this.handleToggleOpen}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    this.handleToggleOpen();
                  }
                }}
                class={`menu-icon ${this.open ? 'open' : 'closed'}`}
                name="chevron_down"
                size="16px"
              ></tds-icon>
            </div>
          ) : (
            <button
              aria-label={this.tdsAriaLabel}
              aria-labelledby={labelId}
              aria-describedby={helperId}
              aria-disabled={this.disabled}
              onClick={() => this.handleToggleOpen()}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  this.open = false;
                }
              }}
              class={`
              ${this.selectedOptions.length ? 'value' : 'placeholder'}
              ${this.open ? 'open' : 'closed'}
              ${this.error ? 'error' : ''}
              `}
              disabled={this.disabled}
            >
              <div class={`value-wrapper ${this.size}`}>
                {this.label && this.labelPosition === 'inside' && (
                  <div
                    id={labelId}
                    class={{
                      'label-inside': true,
                      [this.size]: true,
                      'floated': isFloatedButton,
                    }}
                  >
                    {this.label}
                  </div>
                )}

                <div
                  aria-label={
                    this.tdsAriaLabel ? `Selected options for ${this.tdsAriaLabel}` : undefined
                  }
                  class={`placeholder ${this.size}`}
                >
                  {buttonText}
                </div>
              </div>
              <tds-icon
                tabIndex={0}
                role="button"
                aria-label="Clear selection"
                svgTitle="Clear selection"
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                  this.handleMultiselectClear();
                }}
                onKeyDown={(event: KeyboardEvent) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.stopPropagation();
                    event.preventDefault();
                    this.handleMultiselectClear();
                  }
                }}
                class={{
                  'clear-icon': true,
                  'hide': !(this.multiselect && this.selectedOptions.length > 0),
                }}
                name="cross"
                size="16px"
              ></tds-icon>
              <tds-icon
                aria-label="Open/Close dropdown"
                svgTitle="Open/Close dropdown"
                class={`menu-icon ${this.open ? 'open' : 'closed'}`}
                name="chevron_down"
                size="16px"
              ></tds-icon>
            </button>
          )}
        </div>
        {/* DROPDOWN LIST */}
        <div
          role="listbox"
          aria-label={this.tdsAriaLabel}
          inert={!this.open}
          aria-orientation="vertical"
          aria-multiselectable={this.multiselect}
          ref={(element) => {
            if (element) this.dropdownList = element;
          }}
          class={{
            'dropdown-list': true,
            [this.size]: true,
            [this.getOpenDirection()]: true,
            'label-outside': !!(this.label && this.labelPosition === 'outside'),
            'open': this.open,
            'closed': !this.open,
            [`animation-enter-${this.animation}`]: this.animation !== 'none' && this.open,
            [`animation-exit-${this.animation}`]: this.animation !== 'none' && !this.open,
          }}
        >
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
          {this.filterResult === 0 && this.noResultText !== '' && (
            <div class={`no-result ${this.size}`}>{this.noResultText}</div>
          )}
        </div>
        {/* DROPDOWN LIST */}
        {this.helper && (
          <div
            id={helperId}
            class={{
              helper: true,
              error: this.error,
              disabled: this.disabled,
            }}
          >
            {this.error && <tds-icon name="error" size="16px"></tds-icon>}
            {this.helper}
          </div>
        )}
      </Host>
    );
  }
}
