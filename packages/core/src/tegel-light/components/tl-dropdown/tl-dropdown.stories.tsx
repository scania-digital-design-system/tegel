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
const getLabel = (label: string, placement: 'Outside' | 'Inside', forId?: string) => {
  const forAttr = placement === 'Outside' && forId ? ` for="${forId}"` : '';
  return `<label class="tl-dropdown__label" id="${IDS.label}"${forAttr}>${label}</label>`;
};

const getHelper = (helper: string) => `<div class="tl-dropdown__helper">${helper}</div>`;

function getSelectMarkup(isInside: boolean, placeholder: string, disabled: boolean) {
  const ph = isInside
    ? '<option value="" hidden selected></option>'
    : placeholder
    ? `<option value="" disabled selected>${placeholder}</option>`
    : '';

  return `
    <select class="tl-dropdown__select" id="${IDS.select}" ${disabled ? 'disabled' : ''}>
      ${ph}
      ${OPTIONS.map((o) => `<option value="${o}">${o}</option>`).join('')}
      <option value="disabled" disabled>Option disabled</option>
    </select>`;
}

export function getButtonMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  listId: string,
  opts: readonly string[],
  dropUp: boolean,
) {
  const optionItems = opts
    .map(
      (o) => `
    <li class="tl-dropdown__option" role="option">${o}</li>`,
    )
    .join('');

  const disabledItem =
    '<li class="tl-dropdown__option tl-dropdown__option--disabled" role="option">Option disabled</li>';
  const items = dropUp ? `${disabledItem}${optionItems}` : `${optionItems}${disabledItem}`;

  return `
    <button type="button" class="tl-dropdown__button" ${
      disabled ? 'disabled' : ''
    } aria-expanded="false">
      <span class="tl-dropdown__text"${isInside ? '' : ` data-placeholder="${placeholder}"`}></span>
    </button>
    <ul class="tl-dropdown__list" id="${listId}" role="listbox">
      ${items}
    </ul>`;
}

export function getMultiselectMarkup(
  isInside: boolean,
  placeholder: string,
  disabled: boolean,
  opts: readonly string[],
) {
  const checkboxItem = (label: string, id: string, isDisabled = false) => `
    <li class="tl-dropdown__option${
      isDisabled ? ' tl-dropdown__option--disabled' : ''
    }" role="option">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="${id}" ${
    isDisabled ? 'disabled' : ''
  }/>
        <label class="tl-checkbox__label" for="${id}">${label}</label>
      </div>
    </li>`;

  const items = opts.map((o, i) => checkboxItem(o, `cb-${IDS.multi}-${i}`)).join('');
  const disabledItem = checkboxItem('Option disabled', `cb-${IDS.multi}-disabled`, true);

  return `
    <button type="button" class="tl-dropdown__button" ${
      disabled ? 'disabled' : ''
    } aria-expanded="false">
      <span class="tl-dropdown__text"${isInside ? '' : ` data-placeholder="${placeholder}"`}></span>
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
  opts: readonly string[],
) {
  const checkboxItem = (label: string, id: string, isDisabled = false) => `
    <li class="tl-dropdown__option${
      isDisabled ? ' tl-dropdown__option--disabled' : ''
    }" role="option">
      <div class="tl-checkbox">
        <input type="checkbox" class="tl-checkbox__input" id="${id}" ${
    isDisabled ? 'disabled' : ''
  }/>
        <label class="tl-checkbox__label" for="${id}">${label}</label>
      </div>
    </li>`;

  const baseItems = multiselect
    ? opts.map((o, i) => checkboxItem(o, `cb-${IDS.filterList}-${i}`)).join('')
    : opts.map((o) => `<li class="tl-dropdown__option" role="option">${o}</li>`).join('');

  const disabledItem = multiselect
    ? checkboxItem('Option disabled', `cb-${IDS.filterList}-disabled`, true)
    : '<li class="tl-dropdown__option tl-dropdown__option--disabled" role="option">Option disabled</li>';

  const noResult = multiselect
    ? ''
    : '<li class="tl-dropdown__option tl-dropdown__option--no-result" role="option">No result</li>';

  return `
    <div class="tl-dropdown__input-wrapper">
      <input class="tl-dropdown__input" id="${
        IDS.filterInput
      }" type="text" placeholder="${placeholder}" ${
    disabled ? 'disabled' : ''
  } aria-expanded="false" />
      <button type="button" class="tl-dropdown__input-clear" tabindex="-1"></button>
    </div>
    <ul class="tl-dropdown__list" id="${IDS.filterList}" role="listbox"${
    multiselect ? ' aria-multiselectable="true"' : ''
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
      ${getSelectMarkup(isInside, placeholder, disabled)}`;
  } else if (currentVariant === 'Button' && multiselect) {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getMultiselectMarkup(isInside, placeholder, disabled, optionOrder)}`;
  } else if (currentVariant === 'Button') {
    const listId = IDS.btnList;
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside') : ''}
      ${getButtonMarkup(isInside, placeholder, disabled, listId, optionOrder, dropUp)}`;
  } else {
    fieldMarkup = `
      ${showLabel ? getLabel(label, isInside ? 'Inside' : 'Outside', IDS.filterInput) : ''}
      ${getFilterMarkup(placeholder, disabled, multiselect, optionOrder)}`;
  }

  const classesList: string[] = ['tl-dropdown', `tl-dropdown--${sizeClass}`];

  if (isInside) {
    classesList.push('tl-dropdown--label-inside');
  } else if (showLabel) {
    classesList.push('tl-dropdown--label-outside');
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
  const stylesheets = ['@scania/tegel-light/global.css', '@scania/tegel-light/tl-dropdown.css'];
  if (multiselect || (filter && multiselect)) {
    stylesheets.push('@scania/tegel-light/tl-checkbox.css');
  }

  const stylesheetsComment = `<!-- Required stylesheets:\n  ${stylesheets
    .map((s) => `"${s}"`)
    .join(';\n  ')}\n-->`;

  return `
${stylesheetsComment}
<div class="${classes}" style="width: 208px;">
  ${fieldMarkup}
  ${showHelper && helper ? getHelper(helper) : ''}
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

  const scripts = {
    filterMulti: {
      fn: `tlDropdownFilterMultiScript('${IDS.filterList}', '${IDS.filterInput}');`,
      comment:
        '// Adds search/filter functionality and checkbox handling for selecting multiple items',
    },
    filterSingle: {
      fn: `tlDropdownFilterSingleScript('${IDS.filterList}', '${IDS.filterInput}');`,
      comment: '// Adds search/filter functionality for selecting a single option',
    },
    multi: {
      fn: `tlDropdownMultiScript('${IDS.multi}');`,
      comment: '// Adds click handlers for selecting multiple options with checkboxes',
    },
    single: {
      fn: `tlDropdownSingleScript('${IDS.btnList}');`,
      comment: '// Adds click handlers and state management for selecting a single option',
    },
  };

  const scriptType =
    filter && multiselect
      ? 'filterMulti'
      : filter
      ? 'filterSingle'
      : multiselect
      ? 'multi'
      : 'single';

  const { fn, comment } = scripts[scriptType];
  return `<script>\n  ${comment}\n  ${fn}\n</script>`;
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
  includeStories: ['Default'],
  parameters: { layout: 'centered' },
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
