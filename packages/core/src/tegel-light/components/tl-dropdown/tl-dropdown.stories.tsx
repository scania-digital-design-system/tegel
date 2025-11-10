import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { initDropdownKeyboard } from './_dropdownKeyboard';
import {
  tlDropdownSingleScript as _tlDropdownSingleScript,
  tlDropdownMultiScript as _tlDropdownMultiScript,
  tlDropdownFilterSingleScript as _tlDropdownFilterSingleScript,
  tlDropdownFilterMultiScript as _tlDropdownFilterMultiScript,
} from './_dropdownScripts';

if (typeof window !== 'undefined') {
  requestAnimationFrame(() => initDropdownKeyboard());
}

// Re-export scripts for use in stories
export const tlDropdownSingleScript = _tlDropdownSingleScript;
export const tlDropdownMultiScript = _tlDropdownMultiScript;
export const tlDropdownFilterSingleScript = _tlDropdownFilterSingleScript;
export const tlDropdownFilterMultiScript = _tlDropdownFilterMultiScript;

// Make functions globally available for script tags
if (typeof window !== 'undefined') {
  (window as Window & typeof globalThis & Record<string, unknown>).tlDropdownSingleScript =
    _tlDropdownSingleScript;
  (window as Window & typeof globalThis & Record<string, unknown>).tlDropdownMultiScript =
    _tlDropdownMultiScript;
  (window as Window & typeof globalThis & Record<string, unknown>).tlDropdownFilterSingleScript =
    _tlDropdownFilterSingleScript;
  (window as Window & typeof globalThis & Record<string, unknown>).tlDropdownFilterMultiScript =
    _tlDropdownFilterMultiScript;
}

export const OPTIONS = ['Option 1', 'Option 2'] as const;

export const IDS = {
  label: 'tl-dropdown-label',
  select: 'tl-dropdown-select',
  btn: 'tl-dropdown-btn',
  btnList: 'tl-dropdown-btn-list',
  multiBtn: 'tl-dropdown-multi-btn',
  multi: 'tl-dropdown-multi',
  filterInput: 'tl-dropdown-filter-input',
  filterList: 'tl-dropdown-filter-list',
} as const;

// ============================================================================
// Markup functions
// ============================================================================
export const getLabel = (label: string, placement: 'Outside' | 'Inside', forId?: string) => {
  const cls =
    placement === 'Inside'
      ? 'tl-dropdown__label tl-dropdown__label-inside'
      : 'tl-dropdown__label tl-dropdown__label-outside';
  const forAttr = placement === 'Outside' && forId ? ` for="${forId}"` : '';
  return `<label class="${cls}" id="${IDS.label}"${forAttr}>${label}</label>`;
};

export const getHelper = (helper: string, show: boolean, error: boolean) => {
  if (!show || !helper) {
    return '';
  }
  const icon = error ? '<span class="tl-icon tl-icon--info tl-icon--16"></span>' : '';
  return `<div class="tl-dropdown__helper">${icon}${helper}</div>`;
};

export function getSelectMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
) {
  let ph = '';
  if (isInside) {
    ph = '<option value="" hidden selected></option>';
  } else if (placeholder) {
    ph = `<option value="" disabled selected>${placeholder}</option>`;
  }
  return `
    <select class="tl-dropdown__select" id="${IDS.select}" ${disabled ? 'disabled' : ''} ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  }>
      ${ph}
      ${OPTIONS.map((o) => `<option value="${o}">${o}</option>`).join('')}
      <option value="disabled" disabled>Option disabled</option>
    </select>
    <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>`;
}

export function getButtonMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
  listId: string,
  opts: readonly string[],
  dropUp: boolean,
) {
  const optionLis = opts
    .map(
      (o) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0">
      ${o}<span class="tl-icon tl-icon--tick"></span>
    </li>`,
    )
    .join('');

  const disabledLi =
    '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">Option disabled</li>';

  const items = dropUp ? `${disabledLi}${optionLis}` : `${optionLis}${disabledLi}`;

  return `
    <button type="button" class="tl-dropdown__button" ${disabled ? 'disabled' : ''} ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  } aria-expanded="false" aria-controls="${listId}">
      ${!isInside ? `<span class="tl-dropdown__button-placeholder">${placeholder}</span>` : ''}
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${listId}" role="listbox">
      ${items}
    </ul>`;
}

export function getMultiselectMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  labelled: boolean,
  opts: readonly string[],
) {
  const items = opts
    .map(
      (o, i) => `
    <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.multi}-${i}" tabindex="-1" />
        <label class="tl-checkbox__label" for="cb-${IDS.multi}-${i}">${o}</label>
      </div>
    </li>`,
    )
    .join('');

  const disabledItem = `
    <li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.multi}-disabled" tabindex="-1" disabled />
        <label class="tl-checkbox__label" for="cb-${IDS.multi}-disabled">Option disabled</label>
      </div>
    </li>`;

  return `
    <button type="button" class="tl-dropdown__button" ${disabled ? 'disabled' : ''} ${
    labelled ? `aria-labelledby="${IDS.label}"` : ''
  } aria-expanded="false" aria-controls="${IDS.multi}">
      ${!isInside ? `<span class="tl-dropdown__button-placeholder">${placeholder}</span>` : ''}
      <span class="tl-dropdown__button-value"></span>
      <span class="tl-icon tl-icon--chevron_down tl-dropdown__chevron tl-icon--16" aria-hidden="true"></span>
    </button>
    <ul class="tl-dropdown__list" id="${IDS.multi}" role="listbox" aria-multiselectable="true">
      ${items}
      ${disabledItem}
    </ul>`;
}

export function getFilterMarkup(
  placeholder: string,
  disabled: boolean,
  multiselect: boolean,
  labelled: boolean,
  opts: readonly string[],
) {
  const baseItems = multiselect
    ? opts
        .map(
          (o, i) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0">
          <div class="tl-checkbox">
            <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.filterList}-${i}" tabindex="-1" />
            <label class="tl-checkbox__label" for="cb-${IDS.filterList}-${i}">${o}</label>
          </div>
        </li>`,
        )
        .join('')
    : opts
        .map(
          (o) => `
        <li class="tl-dropdown__option tl-dropdown__option--visible" role="option" tabindex="0">
          ${o}<span class="tl-icon tl-icon--tick"></span>
        </li>`,
        )
        .join('');

  const disabledItem = multiselect
    ? `<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="cb-${IDS.filterList}-disabled" tabindex="-1" disabled />
        <label class="tl-checkbox__label" for="cb-${IDS.filterList}-disabled">Option disabled</label>
      </div>
    </li>`
    : '<li class="tl-dropdown__option tl-dropdown__option--disabled tl-dropdown__option--visible" role="option" aria-disabled="true">Option disabled<span class="tl-icon tl-icon--tick"></span></li>';

  const noResult = multiselect
    ? ''
    : '<li class="tl-dropdown__option tl-dropdown__option--no-result" role="option" aria-disabled="true" tabindex="-1">No result</li>';

  return `
    <div class="tl-dropdown__input-wrapper">
      <input class="tl-dropdown__input" id="${
        IDS.filterInput
      }" type="text" placeholder="${placeholder}" ${disabled ? 'disabled' : ''} aria-controls="${
    IDS.filterList
  }" aria-expanded="false" ${labelled ? `aria-labelledby="${IDS.label}"` : ''}/>
  <button type="button" class="tl-dropdown__input-clear" aria-label="Clear input" tabindex="-1">
        <span class="tl-icon tl-icon--cross tl-icon--16" aria-hidden="true"></span>
      </button>
      <span class="tl-dropdown__input-divider"></span>
      <span class="tl-icon tl-icon--chevron_down tl-icon--16 tl-dropdown__chevron" aria-hidden="true"></span>
    </div>
    <ul class="tl-dropdown__list" id="${IDS.filterList}" role="listbox" ${
    multiselect ? 'aria-multiselectable="true"' : ''
  }>
      ${baseItems}
      ${disabledItem}
      ${noResult}
    </ul>`;
}

// ============================================================================
// Helper functions
// ============================================================================
type TemplateProps = {
  direction: 'Down' | 'Up';
  select: boolean;
  filter: boolean;
  label: string;
  placeholder: string;
  showHelper: boolean;
  helper: string;
  disabled: boolean;
  error: boolean;
  size: 'Small' | 'Medium' | 'Large';
  labelPlacement: 'Outside' | 'Inside' | 'No label';
  multiselect: boolean;
};

function getDropdownMarkup(props: TemplateProps, optionOrder: readonly string[]): string {
  const {
    select,
    filter,
    label,
    placeholder,
    showHelper,
    helper,
    disabled,
    error,
    size,
    labelPlacement,
    multiselect,
    direction,
  } = props;

  const sizeMap = { Small: 'sm', Medium: 'md', Large: 'lg' } as const;
  const sizeClass = sizeMap[size] || 'lg';
  const isInside = labelPlacement === 'Inside';
  const showLabel = labelPlacement !== 'No label';
  const labelled = showLabel;
  const dropUp = direction === 'Up';

  let currentVariant: 'Select' | 'Filter' | 'Button' = 'Button';
  if (select) {
    currentVariant = 'Select';
  } else if (filter) {
    currentVariant = 'Filter';
  }

  let fieldMarkup = '';
  if (currentVariant === 'Select') {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.select) : ''}
      ${getSelectMarkup(isInside, placeholder, disabled, labelled)}`;
  } else if (currentVariant === 'Button' && multiselect) {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getMultiselectMarkup(isInside, placeholder, disabled, labelled, optionOrder)}`;
  } else if (currentVariant === 'Button') {
    const listId = IDS.btnList;
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getButtonMarkup(isInside, placeholder, disabled, labelled, listId, optionOrder, dropUp)}`;
  } else {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.filterInput) : ''}
      ${getFilterMarkup(placeholder, disabled, multiselect, labelled, optionOrder)}`;
  }

  const classesList: string[] = ['tl-dropdown', `tl-dropdown--${sizeClass}`];

  if (isInside) {
    classesList.push('tl-dropdown--label-inside');
  } else if (showLabel) {
    classesList.push('tl-dropdown--label-outside');
  } else {
    classesList.push('tl-dropdown--no-label');
  }

  if (error) {
    classesList.push('tl-dropdown--error');
  }
  if (disabled) {
    classesList.push('tl-dropdown--disabled');
  }
  if (direction === 'Up') {
    classesList.push('tl-dropdown--dropup');
  }
  const classes = classesList.join(' ');

  // Generate required stylesheets comment
  const stylesheets = [
    '@scania/tegel-light/global.css',
    '@scania/tegel-light/tl-dropdown.css',
    '@scania/tegel-light/tl-icon.css',
  ];

  if (multiselect || (filter && multiselect)) {
    stylesheets.push('@scania/tegel-light/tl-checkbox.css');
  }

  const stylesheetsComment = `<!-- Required stylesheets:\n  ${stylesheets
    .map((s) => `"${s}"`)
    .join(';\n  ')}\n-->`;

  return `
    ${stylesheetsComment}
    <div class="demo-wrapper" style="width:200px;height:200px;max-width:960px;">
      <div class="${classes}">
        ${fieldMarkup}
        ${showHelper ? getHelper(helper, showHelper, error) : ''}
      </div>
    </div>
  `;
}

function getDropdownScript(props: {
  select: boolean;
  filter: boolean;
  multiselect: boolean;
}): string {
  const { select, filter, multiselect } = props;

  if (select) return '';

  let script = '';
  let comment = '';

  if (filter && multiselect) {
    script = `tlDropdownFilterMultiScript('${IDS.filterList}', '${IDS.filterInput}');`;
    comment =
      '// Adds search/filter functionality and checkbox handling for selecting multiple items';
  } else if (filter) {
    script = `tlDropdownFilterSingleScript('${IDS.filterList}', '${IDS.filterInput}');`;
    comment = '// Adds search/filter functionality for selecting a single option';
  } else if (multiselect) {
    script = `tlDropdownMultiScript('${IDS.multi}');`;
    comment = '// Adds click handlers for selecting multiple options with checkboxes';
  } else {
    script = `tlDropdownSingleScript('${IDS.btnList}');`;
    comment = '// Adds click handlers and state management for selecting a single option';
  }

  return `<script>\n  ${comment}\n  ${script}\n</script>`;
}

const Template = (props: TemplateProps): string => {
  const dropUp = props.direction === 'Up';
  const optionOrder = dropUp ? [OPTIONS[1], OPTIONS[0]] : [...OPTIONS];
  const markup = getDropdownMarkup(props, optionOrder);
  const script = getDropdownScript(props);
  return formatHtmlPreview(`${markup}\n${script}`);
};

export default {
  title: 'Tegel Light (CSS)/Dropdown',
  parameters: { layout: 'centered' },
  includeStories: /^Default$/,
  argTypes: {
    select: { name: 'Select', control: { type: 'boolean' }, defaultValue: false },
    filter: {
      name: 'Filter',
      control: { type: 'boolean' },
      if: { arg: 'select', eq: false },
      defaultValue: false,
    },
    multiselect: {
      name: 'Multiselect',
      control: { type: 'boolean' },
      if: { arg: 'select', eq: false },
      defaultValue: false,
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Small', 'Medium', 'Large'],
      defaultValue: 'Large',
    },
    label: { name: 'Label', control: 'text' },
    labelPlacement: {
      name: 'Label placement',
      control: { type: 'radio' },
      options: ['Outside', 'Inside', 'No label'],
      defaultValue: 'Outside',
    },
    placeholder: { name: 'Placeholder', control: 'text' },
    showHelper: { name: 'Show helper', control: 'boolean' },
    helper: { name: 'Helper', control: 'text' },
    error: { name: 'Error', control: 'boolean' },
    disabled: { name: 'Disabled', control: 'boolean' },
    direction: {
      name: 'Open direction',
      control: { type: 'radio' },
      options: ['Down', 'Up'],
      defaultValue: 'Down',
    },
  },
  args: {
    filter: false,
    multiselect: false,
    size: 'Large',
    label: 'Label',
    labelPlacement: 'Outside',
    placeholder: 'Placeholder',
    showHelper: true,
    helper: 'Helper text',
    error: false,
    disabled: false,
    direction: 'Down',
    select: false,
  },
};

export const Default = Template;
